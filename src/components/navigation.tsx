"use client"
import { Search } from 'lucide-react'
import { useSearch } from "@/app/search-context"
import Link from "next/link"

export function Navigation() {
  const { searchQuery, setSearchQuery } = useSearch()

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(0, 255, 65, 0.2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-smooth"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #00FF41, #00DD38)",
                boxShadow: "var(--tw-shadow)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 0.5rem rgba(0, 255, 65, 0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--tw-shadow)")}
            >
              <span className="font-mono font-bold text-lg" style={{ color: "#000000" }}>
                D
              </span>
            </div>
            <span
              className="font-mono font-bold text-lg hidden sm:inline"
              style={{
                backgroundImage: "linear-gradient(to right, #00FF41, #00DD38)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              UMKM
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#00FF41" }}
              />
              <input
                type="text"
                placeholder="Cari UMKM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 transition-smooth"
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  borderColor: "rgba(0, 255, 65, 0.2)",
                  borderWidth: "1px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.6)"
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 255, 65, 0.25)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 255, 65, 0.2)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              />
            </div>
          </div>

          {/* Mobile search icon */}
          <div className="md:hidden">
            <Search className="w-6 h-6" style={{ color: "#00FF41" }} />
          </div>
        </div>
      </div>
    </nav>
  )
}
