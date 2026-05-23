import type { TrashAnalysisResult } from '../App';

interface ResultPageProps {
  result: TrashAnalysisResult | null;
  imageUrl: string | null;
  onBackHome: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Organik: 'bg-green-100 text-green-700',
  Anorganik: 'bg-blue-100 text-blue-700',
  B3: 'bg-red-100 text-red-700',
};

export default function ResultPage({ result, imageUrl, onBackHome }: ResultPageProps) {
  if (!result) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Belum ada hasil analisis.</p>
          <button
            type="button"
            onClick={onBackHome}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex overflow-hidden">
      <div className="w-80 border-r border-gray-100 overflow-y-auto flex-shrink-0 p-5 flex flex-col gap-4">
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 relative flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Foto sampah" className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl" aria-hidden>{result.emoji}</span>
          )}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
            Terdeteksi
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-800">Klasifikasi Sampah</span>
            <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[result.trash_type] ?? CATEGORY_COLORS.Anorganik}`}>
              {result.trash_type}
            </span>
          </div>
          <div className="px-3.5 py-2">
            {[
              ['Nama objek', result.name],
              ['Kategori', result.trash_type],
              ['Kode material', result.recyclable_code],
              ['Confidence', `${result.confidence}%`],
            ].map(([key, val]) => (
              <div key={key} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-400">{key}</span>
                <span className="text-xs font-medium text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 p-3.5">
          <p className="text-xs font-medium text-gray-700 mb-1.5">Deskripsi singkat</p>
          <p className="text-xs text-gray-500 leading-relaxed">{result.short_desc}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
        <section className="rounded-xl border border-gray-100 p-4">
          <h2 className="text-[14px] font-medium text-gray-900 mb-2">Penjelasan AI</h2>
          <p className="text-xs text-gray-600 leading-relaxed">{result.full_desc}</p>
        </section>

        <section className="rounded-xl border border-gray-100 p-4">
          <h2 className="text-[14px] font-medium text-gray-900 mb-3">Peringatan</h2>
          <div className="flex flex-col gap-2">
            {result.warnings.map((warning, idx) => (
              <div key={`${warning.icon}-${idx}`} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                {warning.text}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 p-4">
          <h2 className="text-[14px] font-medium text-gray-900 mb-3">Dampak Lingkungan</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-gray-400">CO2 dihemat</p>
              <p className="text-xs font-medium text-gray-800">{result.env_impact.co2_saved}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-gray-400">Waktu terurai</p>
              <p className="text-xs font-medium text-gray-800">{result.env_impact.decompose}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-gray-400">Bisa didaur ulang</p>
              <p className="text-xs font-medium text-gray-800">{result.env_impact.recyclable ? 'Ya' : 'Tidak'}</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 p-4">
          <h2 className="text-[14px] font-medium text-gray-900 mb-3">Ide Kerajinan</h2>
          <div className="grid grid-cols-2 gap-2">
            {result.ideas.map((idea, idx) => (
              <div key={`${idea.title}-${idx}`} className="border border-gray-100 rounded-lg p-3">
                <p className="text-sm mb-1">{idea.emoji} <span className="font-medium text-xs text-gray-900">{idea.title}</span></p>
                <p className="text-[10px] text-gray-500">{idea.difficulty} · {idea.time} · ⭐ {idea.rating.toFixed(1)}</p>
                <p className="text-[11px] text-gray-600 mt-1.5">{idea.steps}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 p-4">
          <h2 className="text-[14px] font-medium text-gray-900 mb-3">Referensi YouTube</h2>
          <div className="flex flex-col gap-2">
            {result.youtube_refs.map((video, idx) => (
              <a
                key={`${video.title}-${idx}`}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-700 hover:bg-gray-50 rounded-lg px-2 py-2 border border-gray-100"
              >
                <p className="font-medium">{video.title}</p>
                <p className="text-[10px] text-gray-500">{video.channel} · {video.duration}</p>
              </a>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={onBackHome}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          Kembali ke Beranda
        </button>
      </div>
    </main>
  );
}
