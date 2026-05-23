import { useEffect, useRef, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(profile.name);
      setUsername(profile.username);
      setLocation(profile.location);
      setBio(profile.bio);
      setAvatarPreview(profile.avatar);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Pilih file gambar (JPG, PNG, dll.)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran foto maksimal 2 MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert('Nama tidak boleh kosong');
      return;
    }
    updateProfile({
      name: trimmedName,
      username,
      location,
      bio: bio.trim(),
      avatar: avatarPreview,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3ece4]">
          <h2 className="text-lg font-semibold text-[#123b2a]">Edit Profil</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tutup"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Foto profil */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Foto profil"
                  className="w-24 h-24 rounded-full object-cover border-[3px] border-[#dbe7dc]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#66e09a] border-[3px] border-[#dbe7dc] flex items-center justify-center text-2xl font-bold text-[#0e4c33]">
                  {name.trim() ? name.trim().slice(0, 2).toUpperCase() : '??'}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1b5c43] text-white flex items-center justify-center shadow-md hover:bg-[#0e4c33] transition-colors"
                aria-label="Ubah foto"
              >
                <Camera size={14} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[12px] font-semibold text-[#1b5c43] hover:underline"
              >
                Unggah foto
              </button>
              {avatarPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-[12px] font-semibold text-red-600 hover:underline"
                >
                  Hapus foto
                </button>
              )}
            </div>
          </div>

          {/* Nama */}
          <div>
            <label htmlFor="profile-name" className="block text-[12px] font-semibold text-[#395447] mb-1.5">
              Nama
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama tampilan"
              maxLength={50}
              className="w-full text-[13px] border border-[#dbe7dc] rounded-xl px-3 py-2.5 outline-none focus:border-[#66e09a] transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="profile-username" className="block text-[12px] font-semibold text-[#395447] mb-1.5">
              Username
            </label>
            <input
              id="profile-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              maxLength={30}
              className="w-full text-[13px] border border-[#dbe7dc] rounded-xl px-3 py-2.5 outline-none focus:border-[#66e09a] transition-colors"
            />
          </div>

          {/* Lokasi */}
          <div>
            <label htmlFor="profile-location" className="block text-[12px] font-semibold text-[#395447] mb-1.5">
              Lokasi
            </label>
            <input
              id="profile-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kota, negara"
              maxLength={60}
              className="w-full text-[13px] border border-[#dbe7dc] rounded-xl px-3 py-2.5 outline-none focus:border-[#66e09a] transition-colors"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="profile-bio" className="block text-[12px] font-semibold text-[#395447] mb-1.5">
              Deskripsi
            </label>
            <textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan tentang dirimu..."
              rows={4}
              maxLength={300}
              className="w-full text-[13px] border border-[#dbe7dc] rounded-xl px-3 py-2.5 outline-none focus:border-[#66e09a] resize-none transition-colors"
            />
            <p className="text-[10px] text-[#8a9e92] mt-1 text-right">{bio.length}/300</p>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[#e3ece4]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#dbe7dc] text-[13px] font-semibold text-[#395447] hover:bg-[#f3f7f4] transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-full bg-[#1b5c43] text-white text-[13px] font-semibold hover:bg-[#0e4c33] transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
