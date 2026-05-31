// import { useState } from 'react';
// import { ArrowLeft, ImageIcon } from 'lucide-react';
// import { usePosts } from '../context/PostsContext';
// import type { Post } from '../context/PostsContext';
// import { useProfile } from '../context/ProfileContext';
// import { useUserStats } from '../context/UserStatsContext';
// import { useFollow } from '../context/FollowContext';
// import { buildAchievements } from '../lib/achievements';
// import { getUserById, getPostsForUser } from '../lib/users';
// import EditProfileModal from './EditProfileModal';
// import PostDetailModal from './PostDetailModal';

// const TABS = ['Postingan'];

// interface ProfilePageProps {
//   userId?: string;
//   onBack?: () => void;
//   onViewProfile?: (userId: string) => void;
// }

// export default function ProfilePage({ userId = 'me', onBack, onViewProfile }: ProfilePageProps) {
//   const isOwnProfile = userId === 'me';
//   const otherUser = !isOwnProfile ? getUserById(userId) : null;

//   const [activeTab, setActiveTab] = useState('Postingan');
//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
//   const { posts } = usePosts();
//   const { profile, isOwnPost } = useProfile();
//   const { stats } = useUserStats();
//   const { isFollowing, toggleFollow, followingCount, getFollowerCount } = useFollow();

//   if (!isOwnProfile && !otherUser) {
//     return (
//       <div className="flex-1 flex items-center justify-center p-8">
//         <p className="text-[#395447]">Pengguna tidak ditemukan.</p>
//       </div>
//     );
//   }

//   const displayName = isOwnProfile ? profile.name : otherUser!.name;
//   const displayAv = isOwnProfile ? profile.av : otherUser!.av;
//   const displayUsername = isOwnProfile ? profile.username : otherUser!.username;
//   const displayLocation = isOwnProfile ? profile.location : otherUser!.location;
//   const displayBio = isOwnProfile ? profile.bio || 'Belum ada deskripsi.' : otherUser!.bio;
//   const displayAvatar = isOwnProfile ? profile.avatar : otherUser!.avatar;

//   const userPosts = getPostsForUser(posts, userId, profile.name, isOwnPost);
//   const totalLikes = userPosts.reduce((sum, p) => sum + p.likes, 0);
//   const totalComments = userPosts.reduce((sum, p) => sum + p.commentList.length, 0);
//   const achievements = buildAchievements(stats, userPosts.length, totalLikes, totalComments);
//   const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;

//   const following = !isOwnProfile && isFollowing(userId);
//   const followerCount = isOwnProfile ? 67 : getFollowerCount(userId, otherUser!.baseFollowers);

//   const PROF_STATS = isOwnProfile
//     ? [
//         { num: userPosts.length.toString(), label: 'Postingan' },
//         { num: followerCount.toString(), label: 'Pengikut' },
//         { num: followingCount.toString(), label: 'Mengikuti' },
//         { num: stats.scanCount.toString(), label: 'Scan AI' },
//       ]
//     : [
//         { num: userPosts.length.toString(), label: 'Postingan' },
//         { num: followerCount.toString(), label: 'Pengikut' },
//         { num: otherUser!.baseFollowing.toString(), label: 'Mengikuti' },
//       ];

//   const openPostDetail = (post: Post) => setSelectedPostId(post.id);
//   const closePostDetail = () => setSelectedPostId(null);

//   return (
//     <main className="flex-1 flex overflow-hidden">
//       <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} />
//       {selectedPost && (
//         <PostDetailModal
//           post={selectedPost}
//           isOpen={selectedPostId !== null}
//           onClose={closePostDetail}
//           onViewProfile={onViewProfile}
//         />
//       )}

//       <div className="flex-1 overflow-y-auto flex flex-col min-h-full bg-white">
//         {!isOwnProfile && onBack && (
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold text-[#1b5c43] hover:bg-[#f3f7f4] transition-colors border-b border-[#e3ece4] w-full text-left"
//           >
//             <ArrowLeft size={18} />
//             Kembali
//           </button>
//         )}

//         <div className="h-32 bg-gradient-to-r from-green-100 to-green-300 relative">
//           <div className="absolute -bottom-8 left-6">
//             {displayAvatar ? (
//               <img
//                 src={displayAvatar}
//                 alt={displayName}
//                 className="w-16 h-16 rounded-full object-cover border-[3px] border-white bg-green-100"
//               />
//             ) : (
//               <div className="w-16 h-16 rounded-full bg-[#66e09a] border-[3px] border-white flex items-center justify-center text-xl font-bold text-[#0e4c33]">
//                 {displayAv}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="px-6 pt-11 pb-4 border-b border-gray-100">
//           <div className="flex items-start justify-between gap-3">
//             <div className="min-w-0">
//               <h2 className="text-[16px] font-medium text-gray-900">{displayName}</h2>
//               <p className="text-[13px] text-gray-400 mb-1.5">
//                 {displayUsername} · {displayLocation}
//               </p>
//               <p className="text-[13px] text-gray-600 leading-relaxed max-w-md">{displayBio}</p>
//             </div>
//             {isOwnProfile ? (
//               <button
//                 type="button"
//                 onClick={() => setEditOpen(true)}
//                 className="border border-gray-200 rounded-lg px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
//               >
//                 Edit profil
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => toggleFollow(userId)}
//                 className={`rounded-lg px-5 py-2 text-xs font-semibold transition-colors flex-shrink-0 ${
//                   following
//                     ? 'border border-[#dbe7dc] text-[#395447] bg-white hover:bg-[#f3f7f4]'
//                     : 'bg-[#1b5c43] text-white hover:bg-[#0e4c33]'
//                 }`}
//               >
//                 {following ? 'Mengikuti' : 'Ikuti'}
//               </button>
//             )}
//           </div>

//           <div className="flex gap-6 mt-4">
//             {PROF_STATS.map((s) => (
//               <div key={s.label} className="text-center">
//                 <p className="text-[17px] font-medium text-gray-900">{s.num}</p>
//                 <p className="text-[10px] text-gray-400">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <section className="border-t border-[#dbe7dc] flex flex-col flex-1">
//           <div className="flex border-b border-[#dbe7dc] px-6 bg-[#F8FAF5]">
//             {TABS.map((tab) => (
//               <button
//                 key={tab}
//                 type="button"
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${
//                   activeTab === tab
//                     ? 'text-green-600 border-green-600 font-medium'
//                     : 'text-gray-400 border-transparent hover:text-gray-600'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {userPosts.length > 0 ? (
//             <div className="bg-white flex-1 min-h-[calc(100vh-17rem)] p-2">
//               <div className="grid grid-cols-3 gap-2">
//                 {userPosts.map((post) => (
//                   <button
//                     key={post.id}
//                     type="button"
//                     onClick={() => openPostDetail(post)}
//                     className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity bg-[#f3f7f4]"
//                   >
//                     <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white flex-1 min-h-[calc(100vh-17rem)] flex flex-col items-center justify-center py-16 px-6 text-center">
//               <div className="w-12 h-12 rounded-full bg-[#F8FAF5] border border-[#dbe7dc] flex items-center justify-center mb-3">
//                 <ImageIcon size={22} className="text-[#1b5c43]" aria-hidden />
//               </div>
//               <p className="text-[14px] font-semibold text-[#395447]">Belum ada Postingan</p>
//               <p className="text-[12px] text-[#8a9e92] mt-1">
//                 {isOwnProfile
//                   ? 'Postingan yang kamu buat akan muncul di sini.'
//                   : `${displayName} belum membagikan postingan.`}
//               </p>
//             </div>
//           )}
//         </section>
//       </div>

//       {isOwnProfile && (
//         <aside className="w-[320px] flex-shrink-0 hidden xl:block border-l border-[#dbe7dc] bg-[#F8FAF5] sticky top-0 h-screen overflow-y-auto">
//           <div className="bg-[#F8FAF5] border border-[#dbe7dc] p-5 m-0">
//             <p className="text-[12px] tracking-[0.12em] font-semibold text-[#1b5c43] mb-4 uppercase">Pencapaian</p>
//             <div className="flex flex-col gap-3">
//               {achievements.map((a) => (
//                 <div key={a.id} className="bg-white rounded-2xl px-4 py-3 border border-[#e6efdf]">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xl leading-none" aria-hidden>
//                       {a.icon}
//                     </span>
//                     <p className="text-[12px] leading-tight font-semibold text-[#1b5c43]">{a.name}</p>
//                   </div>
//                   <p className="text-[11px] text-[#436d58] uppercase tracking-wide">{a.desc}</p>
//                   <div className="mt-2.5 w-full h-1.5 bg-[#e6efdf] rounded-full overflow-hidden">
//                     <div
//                       className="h-full rounded-full bg-[#1b5c43] transition-all duration-300"
//                       style={{ width: `${a.progress}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>
//       )}
//     </main>
//   );
// }


import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import type { Post } from '../context/PostsContext';
import { useProfile } from '../context/ProfileContext';
import { useUserStats } from '../context/UserStatsContext';
import { buildAchievements } from '../lib/achievements';
import EditProfileModal from './EditProfileModal';
import PostDetailModal from './PostDetailModal';

const TABS = ['Postingan'];

interface ProfileData {
  userId: string;
  name: string;
  username: string;
  av: string;
  avatar?: string | null;
  bio?: string | null;
  postCount: number;
  posts: Post[];
}

interface ProfilePageProps {
  onViewProfile?: (userId: string) => void;
}

export default function ProfilePage({ onViewProfile }: ProfilePageProps) {
  const { stats } = useUserStats();

  const [activeTab, setActiveTab] = useState('Postingan');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { authFetch } = useProfile();
  const [refreshKey, setRefreshKey] = useState(0);


  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await authFetch('http://localhost:8000/profile/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [refreshKey]);

  if (loading || !profileData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[13px] text-[#8a9e92]">Memuat profil...</p>
      </div>
    );
  }

  const totalLikes = profileData.posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = profileData.posts.reduce((sum, p) => sum + p.commentList.length, 0);
  const achievements = buildAchievements(stats, profileData.postCount, totalLikes, totalComments);

  const PROF_STATS = [
    { num: profileData.postCount.toString(), label: 'Postingan' },
    { num: stats.scanCount.toString(), label: 'Scan AI' },
  ];

  return (
    <main className="flex-1 flex overflow-hidden">
     <EditProfileModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setRefreshKey((k) => k + 1); // ← trigger refetch
        }}
      />
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          isOpen={selectedPost !== null}
          onClose={() => setSelectedPost(null)}
          onViewProfile={onViewProfile}
        />
      )}

      <div className="flex-1 overflow-y-auto flex flex-col min-h-full bg-white">

        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-green-100 to-green-300 relative">
          <div className="absolute -bottom-8 left-6">
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-16 h-16 rounded-full object-cover border-[3px] border-white bg-green-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#66e09a] border-[3px] border-white flex items-center justify-center text-xl font-bold text-[#0e4c33]">
                {profileData.av}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pt-11 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px] font-medium text-gray-900">{profileData.name}</h2>
              <p className="text-[13px] text-gray-400 mb-1.5">{profileData.username}</p>
              <p className="text-[13px] text-gray-600 leading-relaxed max-w-md">
                {profileData.bio || 'Belum ada deskripsi.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              Edit profil
            </button>
          </div>

          <div className="flex gap-6 mt-4">
            {PROF_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[17px] font-medium text-gray-900">{s.num}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs + Posts */}
        <section className="border-t border-[#dbe7dc] flex flex-col flex-1">
          <div className="flex border-b border-[#dbe7dc] px-6 bg-[#F8FAF5]">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-[13px] border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'text-green-600 border-green-600 font-medium'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {profileData.posts.length > 0 ? (
            <div className="bg-white flex-1 min-h-[calc(100vh-17rem)] p-2">
              <div className="grid grid-cols-3 gap-2">
                {profileData.posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity bg-[#f3f7f4]"
                  >
                    <img
                      src={post.img}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white flex-1 min-h-[calc(100vh-17rem)] flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F8FAF5] border border-[#dbe7dc] flex items-center justify-center mb-3">
                <ImageIcon size={22} className="text-[#1b5c43]" aria-hidden />
              </div>
              <p className="text-[14px] font-semibold text-[#395447]">Belum ada Postingan</p>
              <p className="text-[12px] text-[#8a9e92] mt-1">
                Postingan yang kamu buat akan muncul di sini.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Panel Pencapaian */}
      <aside className="w-[320px] flex-shrink-0 hidden xl:block border-l border-[#dbe7dc] bg-[#F8FAF5] sticky top-0 h-screen overflow-y-auto">
        <div className="bg-[#F8FAF5] border border-[#dbe7dc] p-5 m-0">
          <p className="text-[12px] tracking-[0.12em] font-semibold text-[#1b5c43] mb-4 uppercase">
            Pencapaian
          </p>
          <div className="flex flex-col gap-3">
            {achievements.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl px-4 py-3 border border-[#e6efdf]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl leading-none" aria-hidden>{a.icon}</span>
                  <p className="text-[12px] leading-tight font-semibold text-[#1b5c43]">{a.name}</p>
                </div>
                <p className="text-[11px] text-[#436d58] uppercase tracking-wide">{a.desc}</p>
                <div className="mt-2.5 w-full h-1.5 bg-[#e6efdf] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1b5c43] transition-all duration-300"
                    style={{ width: `${a.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}