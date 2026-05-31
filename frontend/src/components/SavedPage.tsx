// import { useMemo, useState } from 'react';
// import { BookmarkCheck, PlayCircle, X, Youtube, BookmarkX, ListOrdered, Sparkles } from 'lucide-react';
// import type { Post } from '../context/PostsContext';   
// type SavedType = 'scan' | 'community';
// type SavedFilter = 'all' | 'scan' | 'community';

// interface SavedItem {
//   id: number;
//   title: string;
//   image: string;
//   category: string;
//   type: SavedType;
//   description: string;
//   steps: string[];
//   youtubeUrl: string;
// }

// const FILTERS: { id: SavedFilter; label: string }[] = [
//   { id: 'all', label: 'Semua' },
//   { id: 'scan', label: 'Hasil Scan' },
//   { id: 'community', label: 'Inspirasi Komunitas' },
// ];

// const INITIAL_ITEMS: SavedItem[] = [
//   {
//     id: 1,
//     title: 'Lampu Meja Futuristik',
//     image: '/assets/potmini.jpg',
//     category: 'Anorganik',
//     type: 'scan',
//     description:
//       'Material utama teridentifikasi sebagai High-Density Polyethylene (HDPE) dari kemasan pembersih. Struktur bahan kokoh dan tahan panas moderat, ideal untuk rangka pencahayaan LED.',
//     steps: [
//       'Bersihkan wadah plastik dari residu kimia secara menyeluruh.',
//       'Gunakan cutter panas untuk memotong bagian atas sesuai pola desain.',
//       'Pasang modul LED 5V dengan perekat silikon di bagian dalam alas.',
//       'Tambahkan aksen kayu sisa pada bagian kaki untuk stabilitas.',
//     ],
//     youtubeUrl: 'https://www.youtube.com/results?search_query=DIY+lampu+meja+dari+plastik+HDPE',
//   },
//   {
//     id: 2,
//     title: 'Organizer Meja Modular',
//     image: '/assets/dinding.jpg',
//     category: 'Kardus',
//     type: 'community',
//     description: 'Inspirasi organizer dari kardus bekas kemasan dengan teknik lipat bertingkat.',
//     steps: ['Potong panel sesuai ukuran.', 'Rakit layer bertingkat.', 'Lapisi dengan kertas kraft.'],
//     youtubeUrl: 'https://www.youtube.com/results?search_query=DIY+organizer+meja+dari+kardus',
//   },
//   {
//     id: 3,
//     title: 'Pot Gantung Botol PET',
//     image: '/assets/botol.jpg',
//     category: 'Plastik',
//     type: 'scan',
//     description: 'Botol PET transparan cocok untuk pot gantung ringan dan tahan air.',
//     steps: ['Potong badan botol.', 'Buat lubang tali.', 'Tambahkan media tanam.', 'Gantung di area terang.'],
//     youtubeUrl: 'https://www.youtube.com/results?search_query=pot+gantung+botol+PET',
//   },
// ];

// export default function SavedPage() {
//   const [activeFilter, setActiveFilter] = useState<SavedFilter>('all');
//   const [items, setItems] = useState<SavedItem[]>(INITIAL_ITEMS);
//   const [selected, setSelected] = useState<SavedItem | null>(null);
//    const [savedPosts, setSavedPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

// // get this done!!!!
  

//   const filtered = useMemo(
//     () => items.filter((item) => (activeFilter === 'all' ? true : item.type === activeFilter)),
//     [items, activeFilter],
//   );

//   const removeItem = (id: number) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//     setSelected((prev) => (prev?.id === id ? null : prev));
//   };

//   useEffect(() => {
//     const fetchSaved = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:8000/saved', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('Failed');
//         const data = await res.json();
//         setSavedPosts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSaved();
//   }, []);

//   return (
//     <div className="relative flex-1 overflow-y-auto bg-[#eef5ef]">
//       <div className="px-7 pt-7 pb-6">
//         <h1 className="text-3xl font-semibold text-[#173928]">Koleksi Saya</h1>
//         <p className="text-sm text-[#5a7165] mt-1">Kumpulan ide daur ulang dan upcycle pilihanmu.</p>

//         <div className="flex gap-2 mt-5">
//           {FILTERS.map((filter) => (
//             <button
//               key={filter.id}
//               type="button"
//               onClick={() => setActiveFilter(filter.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 activeFilter === filter.id
//                   ? 'bg-[#0e8a4f] text-white'
//                   : 'bg-white text-[#4a6357] border border-[#d6e4d9] hover:bg-[#e9f2eb]'
//               }`}
//             >
//               {filter.label}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-6 pr-1">
//           {filtered.map((item) => (
//             <article
//               key={item.id}
//               className="bg-white border border-[#d5e3d8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
//             >
//               <button type="button" className="w-full text-left" onClick={() => setSelected(item)}>
//                 <div className="relative">
//                   <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
//                   <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e5f3e9] text-[#1e724d]">
//                     {item.category}
//                   </span>
//                 </div>
//                 <div className="px-4 py-3">
//                   <h3 className="text-[15px] font-semibold text-[#173928]">{item.title}</h3>
//                 </div>
//               </button>

//               <div className="px-4 pb-4 flex items-center justify-between">
//                 <a
//                   href={item.youtubeUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center gap-1.5 text-xs font-medium text-[#146944] hover:text-[#0e8a4f]"
//                 >
//                   <Youtube size={16} />
//                   Tutorial
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => removeItem(item.id)}
//                   className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8b5a5a] hover:text-[#a33e3e]"
//                 >
//                   <BookmarkX size={16} />
//                   Unsave
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>

//       {selected && (
//         <>
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setSelected(null)} />
//           <aside className="fixed right-0 top-0 h-full w-full max-w-[460px] bg-white border-l border-[#d8e6dc] shadow-2xl z-20 overflow-y-auto">
//             <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2ece4]">
//               <h2 className="text-[34px] font-semibold leading-none text-[#132f23]">Detail Proyek</h2>
//               <button type="button" onClick={() => setSelected(null)} className="text-[#52675c] hover:text-[#1e3a2e]">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="px-5 py-5 space-y-5">
//               <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover rounded-xl border border-[#dce8df]" />

//               <section className="bg-[#edf6ef] rounded-2xl border border-[#d9e8dd] p-4">
//                 <p className="text-sm font-semibold text-[#1a6a47] flex items-center gap-2">
//                   <Sparkles size={16} />
//                   Deskripsi Sampah (Gemini AI)
//                 </p>
//                 <p className="text-sm text-[#2f4a3f] mt-2 leading-relaxed">{selected.description}</p>
//               </section>

//               <section>
//                 <p className="text-[24px] font-semibold text-[#173928] flex items-center gap-2 mb-2">
//                   <ListOrdered size={18} />
//                   Langkah Pembuatan
//                 </p>
//                 <ol className="space-y-2 text-sm text-[#364f44] list-decimal pl-5">
//                   {selected.steps.map((step, index) => (
//                     <li key={`${selected.id}-step-${index}`}>{step}</li>
//                   ))}
//                 </ol>
//               </section>

//               <section>
//                 <p className="text-[24px] font-semibold text-[#173928] mb-2">Tutorial</p>
//                 <a
//                   href={selected.youtubeUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium bg-[#0d7a41] text-white hover:bg-[#0b6737] transition-colors"
//                 >
//                   <PlayCircle size={18} />
//                   Tonton Tutorial di YouTube
//                 </a>
//               </section>
//             </div>
//           </aside>
//         </>
//       )}

//       {!filtered.length && (
//         <div className="mx-7 mb-7 bg-white border border-[#d5e3d8] rounded-2xl p-10 text-center text-[#556d61]">
//           <BookmarkCheck size={30} className="mx-auto mb-3 text-[#5f7d6d]" />
//           Belum ada item di koleksi ini.
//         </div>
//       )}
//     </div>
//   );
// }


import { useMemo, useState, useEffect } from 'react';
import { BookmarkCheck, X, BookmarkX } from 'lucide-react';
import type { Post } from '../context/PostsContext';
import PostCard from './PostCard';
import {useProfile } from '../context/ProfileContext';


const API_BASE = import.meta.env.VITE_API_URL ?? 'https://soft-eng-project-trashform.vercel.app';

type SavedFilter = 'all' | 'community';

const FILTERS: { id: SavedFilter; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'community', label: 'Inspirasi Komunitas' },
];

export default function SavedPage() {
  const [activeFilter, setActiveFilter] = useState<SavedFilter>('all');
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useProfile();
  
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await authFetch(`${API_BASE}/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setSavedPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const filtered = useMemo(
    () => savedPosts,
    [savedPosts, activeFilter]
  );

  const handleUnsave = async (postId: string) => {
    const token = localStorage.getItem('token');
    try {
      await authFetch(`${API_BASE}/posts/${postId}/save`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#eef5ef]">
        <p className="text-[13px] text-[#8a9e92]">Memuat koleksi...</p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-y-auto bg-[#eef5ef]">
      <div className="px-7 pt-7 pb-6">
        <h1 className="text-3xl font-semibold text-[#173928]">Koleksi Saya</h1>
        <p className="text-sm text-[#5a7165] mt-1">
          Postingan komunitas yang kamu simpan.
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 bg-white border border-[#d5e3d8] rounded-2xl p-10 text-center text-[#556d61]">
            <BookmarkCheck size={30} className="mx-auto mb-3 text-[#5f7d6d]" />
            <p className="text-[14px] font-semibold text-[#395447]">Belum ada postingan tersimpan</p>
            <p className="text-[12px] text-[#8a9e92] mt-1">
              Tekan tombol Simpan pada postingan untuk menyimpannya di sini.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 mt-6">
            {filtered.map((post) => (
              <div key={post.id} className="w-full max-w-[520px] relative">
                <PostCard post={post} />
                <button
                  type="button"
                  onClick={() => handleUnsave(post.id)}
                  className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-medium text-[#8b5a5a] hover:text-[#a33e3e] bg-white border border-[#e3ece4] rounded-full px-3 py-1.5 shadow-sm z-10"
                >
                  <BookmarkX size={14} />
                  Unsave
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}