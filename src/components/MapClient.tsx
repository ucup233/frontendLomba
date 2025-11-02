"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function MapClient({ address, coords: initialCoords, className = "w-full h-80" }: { address: string; coords?: { lat: number; lng: number } | null; className?: string }) {
  const [coords, setCoords] = useState<[number, number] | null>(initialCoords ? [initialCoords.lat, initialCoords.lng] : null);
  const [loading, setLoading] = useState(!coords);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coords) {
      setLoading(false);
      return;
    }
    if (!address) {
      setError("Alamat tidak tersedia");
      setLoading(false);
      return;
    }

    let mounted = true;
    async function geocode() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (mounted && Array.isArray(data) && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else if (mounted) {
          setError("Lokasi tidak ditemukan");
        }
      } catch (err) {
        if (mounted) setError("Gagal memuat peta");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    geocode();
    return () => {
      mounted = false;
    };
  }, [address, coords]);

  if (loading) return <div className="flex items-center justify-center text-sm text-gray-400">Memuat peta…</div>;
  if (error) return <div className="text-sm text-gray-400">{error}</div>;
  if (!coords) return <div className="text-sm text-gray-400">Lokasi tidak tersedia</div>;

  return (
    <div className={className}>
      <MapContainer center={coords} zoom={15} scrollWheelZoom={false} className="w-full h-full rounded-lg">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coords}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
