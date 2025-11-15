"use client"

import { useMemo } from "react"
import Link from "next/link"
import { MapPin, Star } from 'lucide-react'
import { umkmData } from "./lib/data"
import { useState } from "react"
import { useSearch } from "./search-context"

export default function Home() {
  const { searchQuery } = useSearch()
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const categories = [
    { name: "Semua", icon: "🏪" },
    { name: "Makanan", icon: "🍜" },
    { name: "Minuman", icon: "☕" },
    { name: "Jasa", icon: "🔧" },
    { name: "Retail", icon: "🛍️" },
  ]

  const filteredUMKM = useMemo(() => {
    return umkmData.filter((umkm) => {
      const matchesSearch =
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero Section */}
      <section
        className="border-b py-20 md:py-24"
        style={{ backgroundColor: "rgb(15, 15, 15)", borderColor: "rgba(0, 255, 65, 0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-mono font-bold mb-4 text-balance" style={{ color: "#00FF41" }}>
              Direktori UMKM
            </h1>
            <p className="text-lg md:text-xl text-balance font-light" style={{ color: "#b0b0b0" }}>
              Temukan bisnis lokal terbaik dan dukung ekonomi komunitas Anda
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section with Category Icons */}
      <section
        className="sticky top-16 z-40 backdrop-blur-sm py-8 border-b"
        style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(0, 255, 65, 0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`relative overflow-hidden rounded-lg transition-smooth h-20 group ${
                  selectedCategory === category.name
                    ? "shadow-[0_0_20px_#00FF4180,_0_0_40px_#00FF4160] scale-105"
                    : "shadow-md hover:shadow-[0_0_15px_#00FF4150] border hover:border-opacity-40"
                }`}
                style={
                  selectedCategory === category.name
                    ? { borderColor: "#00FF41", borderWidth: "2px" }
                    : { borderColor: "rgba(0, 255, 65, 0.1)", borderWidth: "1px" }
                }
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={
                    selectedCategory === category.name
                      ? {
                          backgroundImage:
                            "linear-gradient(to bottom right, rgba(0, 255, 65, 0.2), rgba(0, 221, 56, 0.1))",
                        }
                      : { backgroundImage: "linear-gradient(to bottom right, #1a1a1a, #0f0f0f)" }
                  }
                />

                {/* Icon */}
                <div
                  className={`absolute inset-0 flex items-center justify-center text-3xl transition-all duration-300 ${
                    selectedCategory === category.name ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  {category.icon}
                </div>

                {/* Text */}
                <div className="relative h-full flex items-end justify-center pb-2">
                  <span
                    className="font-mono font-semibold text-[11px] transition-all duration-300 text-center"
                    style={{
                      color: selectedCategory === category.name ? "#00FF41" : "#b0b0b0",
                      textShadow: selectedCategory === category.name ? "0 0 8px rgba(0, 255, 65, 0.5)" : "none",
                    }}
                  >
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredUMKM.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="font-light" style={{ color: "#b0b0b0" }}>
                Menampilkan{" "}
                <span className="font-mono font-semibold" style={{ color: "#00FF41" }}>
                  {filteredUMKM.length}
                </span>{" "}
                UMKM
              </p>
            </div>
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
                    <div
                      className="relative w-full h-48 overflow-hidden"
                      style={{ backgroundImage: "linear-gradient(to bottom right, #1a1a1a, #0f0f0f)" }}
                    >
                      <img
                        src={umkm.image || "/placeholder.svg"}
                        alt={umkm.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
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
                      <div
                        className="flex items-start gap-2 text-xs font-light line-clamp-2"
                        style={{ color: "#b0b0b0" }}
                      >
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
              Tidak ada UMKM yang sesuai dengan pencarian {searchQuery} di kategori {selectedCategory}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Semua")
              }}
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
                Email: info@direktoriumkm.id
              </p>
              <p className="text-sm font-light" style={{ color: "#b0b0b0" }}>
                Telepon: +62-21-1234567
              </p>
            </div>
          </div>
          <div
            className="pt-8 text-center text-sm font-light border-t"
            style={{ color: "#b0b0b0", borderColor: "rgba(0, 255, 65, 0.2)" }}
          >
            <p>&copy; 2025 Direktori UMKM. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
