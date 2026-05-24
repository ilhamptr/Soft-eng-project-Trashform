export const MOCK_STORIES = [
  { id: 1, user: 'Gojo Sitorus', av: 'GS', img: '/assets/potmini.jpg', isViewed: false },
  { id: 2, user: 'Windah Barusadar', av: 'WB', img: '/assets/botol.jpg', isViewed: false },
  { id: 3, user: 'Green ninja', av: 'GN', img: '/assets/dinding.jpg', isViewed: true },
];

export const MOCK_POSTS = [
  {
    id: 1,
    author: 'Gojo Sitorus',
    av: 'GS',
    time: '2 jam yang lalu',
    type: 'Anorganik' as const,
    title: 'Pot Mini dari Botol Bekas',
    content: 'Dibuat dari botol plastik dengan teknik gunting dan lipat. Hasilnya cantik banget!',
    img: '/assets/potmini.jpg',
    likes: 67,
    commentList: [],
    shares: 5,
    liked: false,
  },
  {
    id: 2,
    author: 'Windah Barusadar',
    av: 'WB',
    time: '5 jam yang lalu',
    type: 'Anorganik' as const,
    title: 'Robot Botol Kreatif',
    content: 'Ide kreatif membuat robot dari botol bekas dan barang daur ulang lainnya',
    img: '/assets/botol.jpg',
    likes: 88,
    commentList: [],
    shares: 15,
    liked: false,
  },
  {
    id: 3,
    author: 'Green ninja',
    av: 'GN',
    time: '1 jam yang lalu',
    type: 'Anorganik' as const,
    title: 'Rak Dinding dari Kardus',
    content: 'Rak dinding yang minimalis dan ramah lingkungan dari kardus bekas',
    img: '/assets/dinding.jpg',
    likes: 888,
    commentList: [],
    shares: 89,
    liked: false,
  },
];

export const TRENDING = [
  { tag: '#trashform', posts: '2.4k' },
  { tag: '#upcycle', posts: '1.8k' },
  { tag: '#daurrulang', posts: '1.1k' },
  { tag: '#zerowaste', posts: '934' },
  { tag: '#plastikPET', posts: '712' },
];

export const SUGGESTIONS = [
  { initials: 'MC', name: 'maya.craft', desc: 'Kerajinan kardus', bg: 'bg-green-100', text: 'text-green-700' },
  { initials: 'DR', name: 'dian_recycle', desc: 'Upcycle kaleng', bg: 'bg-amber-100', text: 'text-amber-700' },
  { initials: 'BT', name: 'budi.taman', desc: 'Pot dari botol', bg: 'bg-purple-100', text: 'text-purple-700' },
];
