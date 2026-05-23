import { Leaf } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function LoginPage() {
  const { login } = useProfile();

  return (
    <div className="h-screen overflow-y-auto bg-[#edf5ee] flex items-center justify-center p-6">
      <div className="bg-white border border-[#dbe7dc] rounded-3xl shadow-lg max-w-md w-full px-8 py-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#2fd57f] flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#8bd9b0]/40">
          <Leaf size={32} className="text-[#113b2a]" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-[#0f4732] mb-2">
          TRASH<span className="text-[#0f7b53]">FORM</span>
        </h1>
        <p className="text-[13px] text-[#60766a] mb-8 leading-relaxed">
          Platform komunitas upcycling & daur ulang. Masuk untuk berbagi karya dan scan sampah.
        </p>
        <button
          type="button"
          onClick={login}
          className="w-full py-3 rounded-2xl bg-[#2fd57f] text-[#113b2a] text-[14px] font-semibold hover:bg-[#29c572] transition-colors shadow-md shadow-[#8bd9b0]/50"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}
