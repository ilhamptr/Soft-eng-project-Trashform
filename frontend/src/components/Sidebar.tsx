import { useEffect, useRef, useState } from 'react';
import { Home, User, Bookmark, Camera, MoreVertical, PlusCircle, LogOut } from 'lucide-react';
import type { PageId } from '../App';
import { useProfile, usernameDisplay } from '../context/ProfileContext';

interface SidebarProps {
  onScanClick: () => void;
  onNavigate: (page: PageId) => void;
  currentPage: PageId;
}

export default function Sidebar({ onScanClick, onNavigate, currentPage }: SidebarProps) {
  const { profile, logout } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home' as const, label: 'Beranda', icon: Home, enabled: true },
    { id: 'profile' as const, label: 'Profil', icon: User, enabled: true },
    { id: 'create' as const, label: 'Post', icon: PlusCircle, enabled: true },
    { id: 'saved' as const, label: 'Tersimpan', icon: Bookmark, enabled: true },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    if (window.confirm('Yakin ingin keluar? Data sesi akan direset.')) {
      logout();
      setMenuOpen(false);
    }
  };

  return (
    <aside className="w-[230px] border-r border-[#dbe7dc] flex flex-col px-5 py-6 flex-shrink-0 bg-[#f5f8f5] h-screen sticky top-0">
      <div className="text-[17px] font-bold px-1 mb-8 tracking-tight text-[#0f4732] leading-none">
        TRASH<span className="text-[#0f7b53]">FORM</span>
      </div>

      <button
        onClick={onScanClick}
        className="flex items-center justify-center gap-2 bg-[#2fd57f] text-[#113b2a] rounded-2xl px-3 py-3 text-[13px] font-semibold mb-6 hover:bg-[#29c572] transition-colors w-full shadow-md shadow-[#8bd9b0]/50"
      >
        <Camera size={16} aria-hidden />
        Scan Sampah
      </button>

      <nav className="flex flex-col gap-1 mt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id !== null && currentPage === item.id;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => item.id && onNavigate(item.id as PageId)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] transition-colors text-left ${
                isActive
                  ? 'bg-[#e2ebe3] text-[#1b6647] font-semibold'
                  : 'text-[#42564b] hover:bg-[#e9efea]'
              }`}
              disabled={!item.enabled}
            >
              <Icon size={20} aria-hidden />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-[#dbe7dc] hover:bg-[#edf3ee] transition-colors text-left"
        >
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#66e09a] flex items-center justify-center text-sm font-semibold text-[#1b6647] flex-shrink-0">
              {profile.av}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#173928] truncate">{usernameDisplay(profile.username)}</p>
            <p className="text-xs text-[#60776a] truncate">{profile.name}</p>
          </div>
          <MoreVertical size={16} className="text-[#8aa194] flex-shrink-0" aria-hidden />
        </button>

        {menuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#dbe7dc] rounded-xl shadow-lg overflow-hidden z-20">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onNavigate('profile');
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#395447] hover:bg-[#f3f7f4] transition-colors"
            >
              <User size={16} />
              Lihat profil
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors border-t border-[#e3ece4]"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
