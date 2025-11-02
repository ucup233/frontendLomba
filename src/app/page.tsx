"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { umkmData } from "./lib/data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Simplify filtering to only use category
  const filteredUMKM = useMemo(() => {
    return umkmData.filter((umkm) => {
      return selectedCategory === "Semua" || umkm.category === selectedCategory;
    });
  }, [selectedCategory]);

  const categories = [
    { name: "Semua", icon: "🏪" },
    { name: "Makanan", icon: "🍜" },
    { name: "Minuman", icon: "☕" },
    { name: "Jasa", icon: "🔧" },
    { name: "Retail", icon: "🛍" },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero Section */}
      <section className="border-b py-20 md:py-24" style={{ backgroundColor: "rgb(15, 15, 15)", borderColor: "rgba(0, 255, 65, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-mono font-bold mb-4 text-balance" style={{ color: "#00FF41" }}>
              Direktori UMKM
            </h1>
          </div>
        </div>
      </section>

      {/* Category Section - removed search input */}
      <section className="sticky top-0 z-50 bg-[#0a0a0a] border-b backdrop-blur-sm" style={{ borderColor: "rgba(0, 255, 65, 0.12)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Mobile categories */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedCategory === category.name ? "bg-[#00FF41] text-black" : "bg-[#1a1a1a] text-[#b0b0b0] hover:bg-[#2a2a2a]"}`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop categories */}
          <div className="hidden md:grid md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all ${
                  selectedCategory === category.name ? "bg-gradient-to-r from-[#00FF41]/20 to-[#00DD38]/10 ring-1 ring-[#00FF41] text-[#00FF41]" : "bg-[#1a1a1a] text-[#b0b0b0] hover:bg-[#2a2a2a]"
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - tambahkan top padding agar tidak tertutup sticky */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {filteredUMKM.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUMKM.map((umkm) => (
                <Link key={umkm.id} href={`/umkm/${umkm.id}`}>
                  <div
                    className="rounded-lg overflow-hidden transition-smooth h-full flex flex-col hover:scale-105 cursor-pointer group border"
                    style={{ backgroundColor: "#1a1a1a", borderColor: "rgba(0, 255, 65, 0.1)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.5)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.1)")}
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom right, #1a1a1a, #0f0f0f)" }}>
                      <Image src={umkm.image || "/placeholder.svg"} alt={umkm.name} fill className="object-cover group-hover:scale-110 transition-smooth" />
                      <div
                        className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-mono font-semibold"
                        style={{
                          backgroundImage: "linear-gradient(to right, #00FF41, #00DD38)",
                          color: "#000000",
                          boxShadow: "0 0 10px rgba(0, 255, 65, 0.5)",
                        }}
                      >
                        {umkm.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3
                        className="text-lg font-mono font-semibold mb-2 line-clamp-2 transition-smooth"
                        style={{ color: "#ffffff" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#00FF41")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                      >
                        {umkm.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={{
                                fill: i < Math.floor(umkm.rating) ? "#00FF41" : "none",
                                color: i < Math.floor(umkm.rating) ? "#00FF41" : "#2a2a2a",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs ml-1 font-light" style={{ color: "#b0b0b0" }}>
                          {umkm.rating} ({umkm.reviews})
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm mb-3 line-clamp-2 flex-1 font-light" style={{ color: "#b0b0b0" }}>
                        {umkm.description}
                      </p>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-xs font-light line-clamp-2" style={{ color: "#b0b0b0" }}>
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#00FF41" }} />
                        <span>{umkm.address}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-7xl">🔍</div>
            <h2 className="text-3xl font-mono font-bold mb-2" style={{ color: "#ffffff" }}>
              Tidak ada hasil
            </h2>
            <p className="mb-8 font-light" style={{ color: "#b0b0b0" }}>
              Tidak ada UMKM di kategori {selectedCategory}
            </p>
            <button
              onClick={() => setSelectedCategory("Semua")}
              className="px-8 py-3 rounded-lg font-mono font-semibold transition-smooth"
              style={{
                backgroundImage: "linear-gradient(to right, #00FF41, #00DD38)",
                color: "#000000",
                boxShadow: "0 0 25px rgba(0, 255, 65, 0.5)",
              }}
            >
              Lihat Semua UMKM
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-20" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(0, 255, 65, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-mono font-bold text-lg mb-4" style={{ color: "#00FF41" }}>
                Direktori UMKM
              </h3>
              <p className="text-sm font-light" style={{ color: "#b0b0b0" }}>
                Platform untuk menemukan dan mendukung bisnis lokal terbaik di Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-semibold mb-4" style={{ color: "#00FF41" }}>
                Kategori
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#b0b0b0" }}>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Makanan")}
                    className="transition-smooth font-light hover:opacity-70"
                    style={{ color: "#b0b0b0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00FF41")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                  >
                    Makanan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Minuman")}
                    className="transition-smooth font-light hover:opacity-70"
                    style={{ color: "#b0b0b0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00FF41")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                  >
                    Minuman
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Jasa")}
                    className="transition-smooth font-light hover:opacity-70"
                    style={{ color: "#b0b0b0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00FF41")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b0b0b0")}
                  >
                    Jasa
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-semibold mb-4" style={{ color: "#00FF41" }}>
                Kontak
              </h4>
              <p className="text-sm font-light" style={{ color: "#b0b0b0" }}>
                Email: ykall1219@gmail.com
              </p>
              <p className="text-sm font-light" style={{ color: "#b0b0b0" }}>
                Telepon: +6281352372899
              </p>
            </div>
          </div>
          <div className="pt-8 text-center text-sm font-light border-t" style={{ color: "#b0b0b0", borderColor: "rgba(0, 255, 65, 0.2)" }}>
            <p>&copy; 2025 Direktori UMKM. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
