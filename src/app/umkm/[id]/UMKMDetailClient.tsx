"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, Share2 } from "lucide-react";
import MapClient from "@/components/MapClient";

type Umkm = {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  image: string;
  gallery: string[];
  hours: string;
  // support both object and tuple to be tolerant with existing data
  coords?: { lat: number; lng: number } | [number, number] | null;
};

export default function UMKMDetailClient({ umkm }: { umkm: Umkm }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextImage = () => setSelectedImageIndex((p) => (p + 1) % umkm.gallery.length);
  const prevImage = () => setSelectedImageIndex((p) => (p - 1 + umkm.gallery.length) % umkm.gallery.length);

  const handleShare = () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/umkm/${umkm.id}`;
    if (navigator?.clipboard) navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // convert tuple coords -> {lat, lng} if needed
  const mapCoords = Array.isArray(umkm.coords) && umkm.coords.length === 2 ? { lat: umkm.coords[0], lng: umkm.coords[1] } : (umkm.coords as { lat: number; lng: number } | null | undefined) ?? null;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(0,255,65,0.2)" }}>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-4 border" style={{ borderColor: "rgba(0,255,65,0.2)" }}>
              <Image src={umkm.gallery[selectedImageIndex] || umkm.image || "/placeholder.svg"} alt={umkm.name} fill className="object-cover" priority />
              {umkm.gallery.length > 1 && (
                <>
                  <button onClick={prevImage} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2" style={{ background: "rgba(10,10,10,0.7)" }}>
                    <ChevronLeft className="w-6 h-6" style={{ color: "#00FF41" }} />
                  </button>
                  <button onClick={nextImage} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2" style={{ background: "rgba(10,10,10,0.7)" }}>
                    <ChevronRight className="w-6 h-6" style={{ color: "#00FF41" }} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md text-xs font-mono font-semibold" style={{ background: "rgba(10,10,10,0.8)", color: "#00FF41" }}>
                {selectedImageIndex + 1} / {umkm.gallery.length}
              </div>
            </div>

            {umkm.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {umkm.gallery.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImageIndex(i)} className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === i ? "border-[#00FF41]" : "border-[#1a1a1a]"}`}>
                    <Image src={img || "/placeholder.svg"} alt={`thumb ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-lg p-6 border" style={{ borderColor: "rgba(0,255,65,0.2)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#00FF41" }}>
                Tentang
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "#b0b0b0" }}>
                {umkm.description}
              </p>
            </div>

            <div className="mt-8 rounded-lg p-6 border" style={{ borderColor: "rgba(0,255,65,0.2)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#00FF41" }}>
                Lokasi
              </h2>
              <MapClient address={umkm.address} coords={mapCoords} className="w-full h-80 rounded-lg overflow-hidden" />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-lg p-6 border sticky top-24" style={{ borderColor: "rgba(0,255,65,0.2)" }}>
              <h1 className="text-2xl font-bold mb-3">{umkm.name}</h1>
              <div className="inline-block bg-[#00FF41] text-black px-3 py-1 rounded-full text-sm font-medium mb-4">{umkm.category}</div>

              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ color: i < Math.floor(umkm.rating) ? "#00FF41" : "#2a2a2a" }} />
                    ))}
                  </div>
                  <span className="font-semibold">{umkm.rating}</span>
                </div>
                <p className="text-sm" style={{ color: "#b0b0b0" }}>
                  ({umkm.reviews} ulasan)
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5" style={{ color: "#00FF41" }} />
                  <div>
                    <p className="text-sm" style={{ color: "#b0b0b0" }}>
                      Jam Operasional
                    </p>
                    <p className="font-medium">{umkm.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5" style={{ color: "#00FF41" }} />
                  <div>
                    <p className="text-sm" style={{ color: "#b0b0b0" }}>
                      Alamat
                    </p>
                    <p className="font-medium text-sm">{umkm.address}</p>
                  </div>
                </div>
              </div>

              <button onClick={handleShare} className={`w-full py-3 rounded-lg font-medium ${copied ? "bg-green-100 text-green-700" : "bg-gray-100 text-black"}`}>
                <Share2 className="w-4 h-4 inline-block mr-2" />
                {copied ? "Disalin!" : "Bagikan"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
