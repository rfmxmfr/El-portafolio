// Mock data for when MongoDB is not available

const collections = [
  {
    id: 'minimalist',
    title: 'Minimalist Essentials',
    description: 'Clean lines, neutral tones, and timeless silhouettes for the modern professional.',
    status: 'published',
    lastUpdated: '2025-06-15',
    items: 12,
    tags: ['Minimalist', 'Professional', 'Sustainable'],
    createdAt: new Date('2025-01-15'),
    images: [
      {
        url: '/uploads/minimalist-1.jpg',
        name: 'Minimalist Collection 1',
        type: 'image/jpeg'
      }
    ]
  },
  {
    id: 'maximalist',
    title: 'Vibrant Expression',
    description: 'Bold colors, dramatic textures, and statement pieces for the confident individual.',
    status: 'published',
    lastUpdated: '2025-06-10',
    items: 8,
    tags: ['Bold', 'Luxury', 'Statement'],
    createdAt: new Date('2025-02-10'),
    images: [
      {
        url: '/uploads/maximalist-1.jpg',
        name: 'Vibrant Collection 1',
        type: 'image/jpeg'
      }
    ]
  }
];

const designs = [
  {
    id: 'design-1',
    title: 'Oversized Linen Blazer',
    description: 'Technical specifications for a relaxed-fit blazer with notched lapels and single-button closure.',
    imageUrl: '/uploads/design-1.jpg',
    details: ['Notched lapels', 'Single button closure', 'Flap pockets', 'Relaxed fit'],
    collectionId: 'minimalist',
    createdAt: new Date('2025-03-15')
  },
  {
    id: 'design-2',
    title: 'Ruffled Silk Blouse',
    description: 'Technical specifications for a dramatic blouse with V-neck and ruffled details.',
    imageUrl: '/uploads/design-2.jpg',
    details: ['V-neck design', 'Ruffled sleeves', 'Loose fit', 'Silk construction'],
    collectionId: 'maximalist',
    createdAt: new Date('2025-03-20')
  }
];

const tags = [
  { id: 'tag-1', name: 'Minimalist', color: 'bg-neutral-100 text-neutral-700' },
  { id: 'tag-2', name: 'Professional', color: 'bg-blue-100 text-blue-700' },
  { id: 'tag-3', name: 'Sustainable', color: 'bg-green-100 text-green-700' },
  { id: 'tag-4', name: 'Bold', color: 'bg-purple-100 text-purple-700' },
  { id: 'tag-5', name: 'Luxury', color: 'bg-amber-100 text-amber-700' },
  { id: 'tag-6', name: 'Statement', color: 'bg-red-100 text-red-700' }
];

const features = [
  { id: 'feature-1', name: 'Notched lapels' },
  { id: 'feature-2', name: 'Single button closure' },
  { id: 'feature-3', name: 'Flap pockets' },
  { id: 'feature-4', name: 'Relaxed fit' },
  { id: 'feature-5', name: 'V-neck design' },
  { id: 'feature-6', name: 'Ruffled sleeves' }
];

const about = {
  paragraphs: [
    'With a passion for sustainable fashion and innovative design, I create collections that bridge the gap between contemporary aesthetics and timeless appeal. My work focuses on clean silhouettes, quality materials, and versatile pieces that empower the modern individual.',
    'Drawing inspiration from minimalist architecture, natural textures, and cultural diversity, each design reflects a commitment to both style and substance. I believe fashion should be both beautiful and responsible, creating pieces that last beyond seasonal trends.'
  ],
  media: []
};

const users = [
  {
    _id: 'user-1',
    username: 'rmonteiro',
    email: 'rmonteiro',
    password: '$2a$10$XQvMDQGRgNBjXgktpvYgqOJVMbL5Yz5K6Z6z3Q5X5X5X5X5X5X5X5X', // hashed 'Junkie88'
    role: 'admin'
  }
];

module.exports = {
  collections,
  designs,
  tags,
  features,
  about,
  users
};