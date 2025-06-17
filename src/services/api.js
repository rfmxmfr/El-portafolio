// Mock API service for collections management
// In a real application, this would connect to a backend server

// Initial collections data
const collectionsData = [
  {
    id: 'minimalist',
    title: 'Minimalist Essentials',
    description: 'Clean lines, neutral tones, and timeless silhouettes for the modern professional.',
    status: 'published',
    lastUpdated: '2025-06-15',
    items: 12,
    tags: ['Minimalist', 'Professional', 'Sustainable'],
    moodBoardUrl: '/src/assets/mood_board_1.png',
    sketchUrl: '/src/assets/fashion_sketch_1.png',
    designs: [
      {
        id: 'design-1',
        title: 'Oversized Linen Blazer',
        description: 'Relaxed-fit blazer with notched lapels and single-button closure.',
        imageUrl: '/src/assets/technical_drawing_1.png',
        details: ['Notched lapels', 'Single button closure', 'Flap pockets', 'Relaxed fit']
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
    moodBoardUrl: '/src/assets/mood_board_2.png',
    sketchUrl: '/src/assets/fashion_sketch_2.png',
    designs: [
      {
        id: 'design-2',
        title: 'Ruffled Silk Blouse',
        description: 'Dramatic blouse with V-neck and ruffled details.',
        imageUrl: '/src/assets/technical_drawing_2.png',
        details: ['V-neck design', 'Ruffled sleeves', 'Loose fit', 'Silk construction']
      }
    ]
  }
];

// In-memory storage
let collections = [...collectionsData];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API service
export const api = {
  // Collections
  getCollections: async () => {
    await delay(300);
    return [...collections];
  },
  
  getCollectionById: async (id) => {
    await delay(200);
    const collection = collections.find(c => c.id === id);
    if (!collection) throw new Error('Collection not found');
    return { ...collection };
  },
  
  createCollection: async (collectionData) => {
    await delay(500);
    const newCollection = {
      ...collectionData,
      id: collectionData.title.toLowerCase().replace(/\\s+/g, '-'),
      status: 'draft',
      lastUpdated: new Date().toISOString().split('T')[0],
      items: 0,
      designs: []
    };
    collections = [...collections, newCollection];
    return newCollection;
  },
  
  updateCollection: async (id, updates) => {
    await delay(400);
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Collection not found');
    
    const updatedCollection = {
      ...collections[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    collections = [
      ...collections.slice(0, index),
      updatedCollection,
      ...collections.slice(index + 1)
    ];
    
    return updatedCollection;
  },
  
  deleteCollection: async (id) => {
    await delay(300);
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Collection not found');
    
    collections = [
      ...collections.slice(0, index),
      ...collections.slice(index + 1)
    ];
    
    return { success: true };
  },
  
  publishCollection: async (id) => {
    await delay(300);
    return api.updateCollection(id, { status: 'published' });
  },
  
  unpublishCollection: async (id) => {
    await delay(300);
    return api.updateCollection(id, { status: 'draft' });
  },
  
  // Designs
  addDesignToCollection: async (collectionId, designData) => {
    await delay(400);
    const collection = await api.getCollectionById(collectionId);
    
    const newDesign = {
      ...designData,
      id: `design-${Date.now()}`,
    };
    
    const updatedCollection = {
      ...collection,
      designs: [...collection.designs, newDesign],
      items: collection.items + 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    return api.updateCollection(collectionId, updatedCollection);
  },
  
  updateDesign: async (collectionId, designId, updates) => {
    await delay(400);
    const collection = await api.getCollectionById(collectionId);
    
    const designIndex = collection.designs.findIndex(d => d.id === designId);
    if (designIndex === -1) throw new Error('Design not found');
    
    const updatedDesigns = [
      ...collection.designs.slice(0, designIndex),
      { ...collection.designs[designIndex], ...updates },
      ...collection.designs.slice(designIndex + 1)
    ];
    
    return api.updateCollection(collectionId, { 
      designs: updatedDesigns,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  },
  
  removeDesignFromCollection: async (collectionId, designId) => {
    await delay(300);
    const collection = await api.getCollectionById(collectionId);
    
    const updatedDesigns = collection.designs.filter(d => d.id !== designId);
    
    return api.updateCollection(collectionId, { 
      designs: updatedDesigns,
      items: collection.items - 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  }
};

export default api;