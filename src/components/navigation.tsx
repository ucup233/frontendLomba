"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#10B981] font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Direktori UMKM</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari UMKM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden">
            <Search className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </nav>
  )
}
