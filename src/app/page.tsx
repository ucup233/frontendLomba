"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { umkmData } from "./lib/data";
import Image from "next/image";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah item per halaman

  const categories = [
    { name: "Semua", icon: "🏪" },
    { name: "Makanan", icon: "🍜" },
    { name: "Minuman", icon: "☕" },
    { name: "Jasa", icon: "🔧" },
    { name: "Retail", icon: "🛍️" },
  ];

  const filteredUMKM = useMemo(() => {
    return umkmData.filter((umkm) => {
      const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) || umkm.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);

  // Get current items
  const currentItems = filteredUMKM.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset ke halaman 1 ketika kategori atau pencarian berubah
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#F0FDF4] to-[#ECFDF5]">
      {/* Hero Section - tambah padding & ukuran text responsif */}
      <section className="bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-balance">Direktori UMKM Indonesia</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-balance">Temukan bisnis lokal terbaik dan dukung ekonomi komunitas Anda</p>
          </div>
        </div>
      </section>

      {/* Filter Section - Perbaiki layout mobile */}
      <section className="bg-white/90 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Ubah layout kategori */}
          <div className="grid grid-cols-5 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full rounded-xl transition-all duration-300 h-20 sm:h-24 relative flex flex-col items-center justify-center px-2 sm:px-3 ${
                  selectedCategory === category.name ? "ring-4 ring-[#10B981] shadow-lg scale-105 bg-gradient-to-br from-[#10B981] to-[#059669] text-white" : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <span className={`font-semibold text-[10px] sm:text-sm text-center ${selectedCategory === category.name ? "text-white" : "text-gray-700"}`}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-16 sm:mt-24">
        {filteredUMKM.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentItems.map((umkm) => (
                <Link key={umkm.id} href={`/umkm/${umkm.id}`}>
                  <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-102 transform">
                    {/* Image */}
                    <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] overflow-hidden">
                      <Image src={umkm.image || "/placeholder.svg"} alt={umkm.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" width={600} height={360} priority />
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md">{umkm.category}</div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#10B981] transition-colors">{umkm.name}</h3>

                      <div className="flex items-center gap-1 mb-2 sm:mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(umkm.rating) ? "fill-[#FACC15] text-[#FACC15]" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 ml-1">
                          {umkm.rating} ({umkm.reviews})
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-1">{umkm.description}</p>

                      <div className="flex items-start gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                        <span className="line-clamp-2">{umkm.address}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg transition-all ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                >
                  Sebelumnya
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-8 h-8 rounded-lg transition-all ${currentPage === index + 1 ? "bg-[#10B981] text-white" : "bg-white text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="flex sm:hidden items-center">
                  <span className="text-sm text-gray-600">
                    {currentPage} / {totalPages}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg transition-all ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="mb-4 text-4xl sm:text-6xl">🔍</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tidak ada hasil</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Tidak ada UMKM yang sesuai dengan pencarian &quot;{searchQuery}&quot; di kategori {selectedCategory}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Lihat Semua UMKM
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#065F46] to-[#047857] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Direktori UMKM</h3>
              <p className="text-white/70">Platform untuk menemukan dan mendukung bisnis lokal terbaik di Indonesia.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => setSelectedCategory("Makanan")} className="hover:text-white transition-colors">
                    Makanan
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory("Minuman")} className="hover:text-white transition-colors">
                    Minuman
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory("Jasa")} className="hover:text-white transition-colors">
                    Jasa
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <p className="text-white/70">Email: ykall1219@gmail.com</p>
              <p className="text-white/70">Telepon: +6281352372899</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70">
            <p>&copy; 2025 Direktori UMKM. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
