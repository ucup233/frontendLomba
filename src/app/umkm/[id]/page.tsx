import UMKMDetailClient from "./UMKMDetailClient";
import { umkmData } from "../../lib/data";

export default function UMKMDetailPage({ params }: { params: { id: string } }) {
  const id = String(params?.id);
  const umkm = umkmData.find((item) => item.id === id);

  if (!umkm) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="text-center">
          <h1 className="text-2xl font-mono font-bold mb-4" style={{ color: "#fff" }}>
            UMKM tidak ditemukan
          </h1>
        </div>
      </main>
    );
  }

  return <UMKMDetailClient umkm={umkm} />;
}
