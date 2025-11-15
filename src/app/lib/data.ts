export type Umkm = {
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
  coords?: { lat: number; lng: number }; 
};

export const umkmData = [
  {
    id: "1",
    name: "Kedai Aduhai",
    category: "Makanan",
    description: "Kedai Aduhai adalah tempat makan yang menyajikan prasmanan dengan berbagai pilihan hidangan lezat dan bergizi.",
    address: "Jl. Abimanyu No.3, Ngebel, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55183",
    hours: "07:00 - 15:00",
    rating: 4.6,
    reviews: 19,
    image: "/Foto kedai aduhai.jpg",
    gallery: ["/Foto kedai aduhai 1.jpg",
              "/Foto kedai aduhai 2.jpg",
              "/Foto kedai aduhai 3.jpg",
    ],
    coords: {lat: -7.8146301374773115, lng: 110.32088289722063}
              
  },
  {
    id: "2",
    name: "DNA Cell",
    category: "Retail",
    description: "Toko yang menyediakan berbagai kebutuhan gadget dan aksesoris ponsel dengan kualitas terjamin. Kami menawarkan berbagai produk mulai dari case, charger, hingga earphone dengan harga yang terjangkau",
    address: "Jl. Anggrek Tegalrejo, Geblagan, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "07:00 - 22:00",
    rating: 3.8,
    reviews: 14,
    image: "/Foto celular.jpg",
    gallery: ["/Foto celular 1.jpg", 
              "/Foto celular 2.jpg",
            ],
    coords: {lat: -7.806806366691774, lng: 110.32273246838965}
  },
  {
    id: "3",
    name: "WASHPRO LAUNDRY EXPRESS UMY 2",
    category: "Jasa",
    description: "layanan laundry cepat dan profesional yang siap membantu menjaga pakaian Anda tetap bersih dan wangi. Kami melayani cuci, setrika, dan paket express dengan kualitas terbaik, sehingga pakaian Anda siap digunakan tepat waktu.",
    address: "Jl. Puntadewa, Ngebel, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "08:00 - 21:00",
    rating: 4.8,
    reviews: 55,
    image: "/Foto laundry.jpg",
    gallery: ["/Foto laundry 1.jpg",
              "/Foto laundry 2.jpg", 
              "/Foto laundry 3.jpg",
            ],
    coords: {lat: -7.817299097018003, lng: 110.32157260876296}
  },
  {
    id: "4",
    name: "Warteg Kharisma Bahari Ngebel - UMY",
    category: "Makanan",
    description: "Warteg (Warung Tegal) adalah tempat makan khas Indonesia yang menyajikan berbagai masakan rumahan sederhana namun menggugah selera. Dikenal dengan porsi melimpah dan harga terjangkau.",
    address: "Jl. Ngebel, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "06:30 - 00:00",
    rating: 3.3,
    reviews: 16,
    image: "/Foto warteg.jpg",
    gallery: ["/Foto warteg 1.jpg",
              "/Foto warteg 2.jpg", 
              "/Foto warteg 3.jpg",
            ],
    coords: {lat:  -7.814266131812539, lng: 110.32303811976293}
  },
  {
    id: "5",
    name: "Sate Taichan Langgeng",
    category: "Makanan",
    description: "Sate Taichan Langgeng adalah tempat makan yang menyajikan sate ayam tanpa bumbu kacang khas Taichan dengan cita rasa gurih pedas yang menggugah selera.",
    address: "Jl. Patriot Bangsa, Geblagan, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "11:00 - 22:00",
    rating: 4.8,
    reviews: 496,
    image: "/Foto sate taichan.jpg",
    gallery: ["/Foto sate taichan 1.jpg", 
              "/Foto sate taichan 2.jpg", 
              "/Foto sate taichan 3.jpg",
            ],
    coords: {lat:  -7.8119520916168, lng: 110.31714540692089}
  },
  {
    id: "6",
    name: "Dingo Coffee-UMY",
    category: "Minuman",
    description: "Cafe modern yang menawarkan berbagai pilihan kopi spesial, minuman non-kopi, dan camilan lezat. Terletak strategis di lingkungan kampus.",
    address: "Jl. Brawijaya, Geblagan, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "08:00 - 23:00",
    rating: 4.8,
    reviews: 236,
    image: "/Foto cafe dingo.jpg",
    gallery: ["/Foto cafe dingo 1.jpg",
              "/Foto cafe dingo 2.jpg",
              "/Foto cafe dingo 3.jpg",
            ],
    coords: {lat:  -7.808217388200129, lng: 110.32453323904062}
  },
  {
    id: "7",
    name: "Karib Kafe",
    category: "Minuman",
    description: "Tempat nongkrong modern yang menawarkan kopi berkualitas, minuman segar, dan berbagai camilan lezat. Suasana kafe yang hangat dan nyaman membuatnya cocok untuk bersantai, belajar, bekerja, atau berkumpul bersama teman..",
    address: "Jl. Bunga, Geblagan, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "09:00 - 23:00",
    rating: 4.7,
    reviews: 93,
    image: "/Foto karib cafe.jpg",
    gallery: ["/Foto karib cafe 1.jpg",
              "/Foto karib cafe 2.jpg",
              "/Foto karib cafe 3.jpg",
            ],
    coords: {lat:  -7.805838746383035, lng: 110.31807865247504}
  },
  {
    id: "8",
    name: "Koat Kopi Tamantirto",
    category: "Minuman",
    description: "Cafe hangat yang menyajikan kopi berkualitas tinggi dan minuman kreatif untuk dinikmati kapan saja. Terletak strategis, kafe ini menjadi tempat favorit bagi pengunjung yang ingin bersantai, belajar, bekerja, atau berkumpul bersama teman.",
    address: "Jl. Brajan Lor No.108, Brajan, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "09:00 - 00.30:",
    rating: 4.6,
    reviews: 712,
    image: "/Foto koat kopi.jpg",
    gallery: ["/Foto koat kopi 1.jpg",
              "/Foto koat kopi 2.jpg",
              "/Foto koat kopi 3.jpg",
            ],
    coords: {lat: -7.815872800735719, lng: 110.32717670491901}
  },
  {
    id: "9",
    name: " BARBERSHOP SIMPLY HAIRCUT",
    category: "Jasa",
    description: "barbershop modern yang menghadirkan layanan potong rambut berkualitas dengan sentuhan profesional. Kami menyediakan berbagai gaya rambut terkini untuk pria dan anak-anak, lengkap dengan layanan cukur, styling, dan perawatan rambut. Dengan suasana nyaman dan staf yang ramah.",
    address: "Rukeman Jl. Sunan Kudus No.5a, Gatak, Tamantirto, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184",
    hours: "09:30 - 22:00",
    rating: 4.8,
    reviews: 344,
    image: "/Foto barbershop.jpg",
    gallery: ["/Foto barbershop 1.jpg",
              "/Foto barbershop 2.jpg",
              "/Foto barbershop 3.jpg",
            ],
    coords: {lat: -7.813226361734934, lng: 110.32808940964973}
  },
  {
    id: "10",
    name: "Utama Sembako dan Sayuran",
    category: "Retail",
    description: "Toko Sembako adalah tempat belanja kebutuhan pokok sehari-hari yang menyediakan berbagai produk mulai dari beras, minyak, gula, mie instan, susu, hingga bahan kebutuhan rumah tangga lainnya.",
    address: "Jl. Rajawali, Ngebel, Ambarketawang, Kec. Gamping, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55294",
    hours: "05:50 - 22:00",
    rating: 4.6,
    reviews: 145,
    image: "/Foto sembako.jpg",
    gallery: [
      "/Foto sembako 1.jpg",
      "/Foto sembako 2.jpg",
      "/Foto sembako 3.jpg",
    ],
    coords: {lat: -7.813613128174531, lng: 110.31713553735756}
  },
]

