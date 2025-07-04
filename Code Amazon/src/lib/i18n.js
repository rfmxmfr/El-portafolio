import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  'ATELIER': 'ATELIER',
  'Home': 'Home',
  'About': 'About',
  'Collections': 'Collections',
  'Technical': 'Technical',
  'Contact': 'Contact',
  'Fashion Design': 'Fashion Design',
  'Portfolio': 'Portfolio',
  'Crafting contemporary fashion with a focus on sustainable materials, innovative silhouettes, and timeless elegance. Each piece tells a story of modern sophistication and conscious design.': 'Crafting contemporary fashion with a focus on sustainable materials, innovative silhouettes, and timeless elegance. Each piece tells a story of modern sophistication and conscious design.',
  'Explore Collections': 'Explore Collections',
  'About the Designer': 'About the Designer',
  'Creative Vision': 'Creative Vision',
  'Innovative designs that push boundaries': 'Innovative designs that push boundaries',
  'Sustainability': 'Sustainability',
  'Conscious choices for a better future': 'Conscious choices for a better future',
  'Craftsmanship': 'Craftsmanship',
  'Attention to detail in every piece': 'Attention to detail in every piece',
  'Minimalist Essentials': 'Minimalist Essentials',
  'Clean lines, neutral tones, and timeless silhouettes for the modern professional.': 'Clean lines, neutral tones, and timeless silhouettes for the modern professional.',
  'Vibrant Expression': 'Vibrant Expression',
  'Bold colors, dramatic textures, and statement pieces for the confident individual.': 'Bold colors, dramatic textures, and statement pieces for the confident individual.',
  'Minimalist': 'Minimalist',
  'Professional': 'Professional',
  'Sustainable': 'Sustainable',
  'Bold': 'Bold',
  'Luxury': 'Luxury',
  'Statement': 'Statement',
  'Technical Drawings': 'Technical Drawings',
  'Oversized Linen Blazer': 'Oversized Linen Blazer',
  'Technical specifications for a relaxed-fit blazer with notched lapels and single-button closure.': 'Technical specifications for a relaxed-fit blazer with notched lapels and single-button closure.',
  'Ruffled Silk Blouse': 'Ruffled Silk Blouse',
  'Technical specifications for a dramatic blouse with V-neck and ruffled details.': 'Technical specifications for a dramatic blouse with V-neck and ruffled details.',
  'Key Features:': 'Key Features:',
  'Notched lapels': 'Notched lapels',
  'Single button closure': 'Single button closure',
  'Flap pockets': 'Flap pockets',
  'Relaxed fit': 'Relaxed fit',
  'V-neck design': 'V-neck design',
  'Ruffled sleeves': 'Ruffled sleeves',
  'Loose fit': 'Loose fit',
  'Silk construction': 'Silk construction',
  'Let\'s Collaborate': 'Let\'s Collaborate',
  'Ready to bring your vision to life? I\'m always excited to work on new projects, whether it\'s custom designs, brand collaborations, or consulting opportunities.': 'Ready to bring your vision to life? I\'m always excited to work on new projects, whether it\'s custom designs, brand collaborations, or consulting opportunities.',
  'Mood Board': 'Mood Board',
  'Design Illustration': 'Design Illustration',
  'Admin Dashboard': 'Admin Dashboard',
  'ATELIER ADMIN': 'ATELIER ADMIN',
  'Dashboard': 'Dashboard',
  'Collections': 'Collections',
  'Designs': 'Designs',
  'Users': 'Users',
  'Settings': 'Settings',
  'Logout': 'Logout',
  'Collections Management': 'Collections Management',
  'Dashboard Overview': 'Dashboard Overview',
  'Design Library': 'Design Library',
  'User Management': 'User Management',
  'System Settings': 'System Settings',
  'Search...': 'Search...',
  'All Collections': 'All Collections',
  'New Collection': 'New Collection',
  'Last updated': 'Last updated',
  'Published': 'Published',
  'Draft': 'Draft',
  'items': 'items',
  'View & Edit': 'View & Edit',
  'Publish': 'Publish',
  'Unpublish': 'Unpublish',
  'Total Collections': 'Total Collections',
  'published': 'published',
  'Total Designs': 'Total Designs',
  'Across all collections': 'Across all collections',
  'Website Visits': 'Website Visits',
  'from last month': 'from last month',
  'Design management coming soon': 'Design management coming soon',
  'User management coming soon': 'User management coming soon',
  'Settings coming soon': 'Settings coming soon',
  'Create New Collection': 'Create New Collection',
  'Collection Title': 'Collection Title',
  'Description': 'Description',
  'Tags': 'Tags',
  'Enter collection title': 'Enter collection title',
  'Enter collection description': 'Enter collection description',
  'Add a tag': 'Add a tag',
  'Add': 'Add',
  'Cancel': 'Cancel',
  'Create Collection': 'Create Collection',
  'Add New Design': 'Add New Design',
  'Design Title': 'Design Title',
  'Design Image': 'Design Image',
  'Key Features': 'Key Features',
  'Add a feature': 'Add a feature',
  'Add Design': 'Add Design',
  'Edit Collection': 'Edit Collection',
  'comma separated': 'comma separated',
  'Save Changes': 'Save Changes',
  'No mood board uploaded': 'No mood board uploaded',
  'No sketch uploaded': 'No sketch uploaded',
  'Designs': 'Designs',
  'Add Design': 'Add Design',
  'Remove': 'Remove',
  'No designs added yet': 'No designs added yet',
  'Add Your First Design': 'Add Your First Design',
  'Loading collections...': 'Loading collections...',
  'No collections found': 'No collections found',
  'Create Your First Collection': 'Create Your First Collection',
  'Are you sure you want to delete this collection?': 'Are you sure you want to delete this collection?',
  'Are you sure you want to remove this design?': 'Are you sure you want to remove this design?',
  'Loading collection...': 'Loading collection...',
  'Collection not found': 'Collection not found',
  'Back to Collections': 'Back to Collections',
  'Cancel Edit': 'Cancel Edit',
  'Failed to load collections. Please try again.': 'Failed to load collections. Please try again.',
  'Failed to create collection. Please try again.': 'Failed to create collection. Please try again.',
  'Failed to delete collection. Please try again.': 'Failed to delete collection. Please try again.',
  'Failed to publish collection. Please try again.': 'Failed to publish collection. Please try again.',
  'Failed to unpublish collection. Please try again.': 'Failed to unpublish collection. Please try again.',
  'Change History': 'Change History',
  'Refresh': 'Refresh',
  'Clear': 'Clear',
  'No changes recorded yet': 'No changes recorded yet',
  'Collection Created': 'Collection Created',
  'Collection Updated': 'Collection Updated',
  'Collection Deleted': 'Collection Deleted',
  'Design Added': 'Design Added',
  'Design Removed': 'Design Removed',
  'Change': 'Change',
  'Created collection "{{title}}"': 'Created collection "{{title}}"',
  'Updated collection "{{title}}" (changed: {{fields}})': 'Updated collection "{{title}}" (changed: {{fields}})',
  'Deleted collection "{{title}}"': 'Deleted collection "{{title}}"',
  'Added design "{{designTitle}}" to collection "{{collectionTitle}}"': 'Added design "{{designTitle}}" to collection "{{collectionTitle}}"',
  'Removed design "{{designTitle}}" from collection "{{collectionTitle}}"': 'Removed design "{{designTitle}}" from collection "{{collectionTitle}}"',
  'Unknown change': 'Unknown change',
  'Are you sure you want to clear the change history?': 'Are you sure you want to clear the change history?',
  'Activity': 'Activity',
  'Failed to update collection description.': 'Failed to update collection description.',
  'Failed to update collection title.': 'Failed to update collection title.',
  'Content Updated': 'Content Updated',
  'Updated content in {{section}} section: "{{content}}"': 'Updated content in {{section}} section: "{{content}}"',
  'About Page Updated': 'About Page Updated',
  'Updated content in About page: {{content}}': 'Updated content in About page: {{content}}',
  'Add Paragraph': 'Add Paragraph',
  'Add Image': 'Add Image',
  'Add Video': 'Add Video',
  'Enter paragraph text...': 'Enter paragraph text...',
  'Media': 'Media',
  'Content': 'Content',
  'Design Board': 'Design Board',
  'Design Gallery': 'Design Gallery',
  'Add List': 'Add List',
  'Add Card': 'Add Card',
  'Add Month': 'Add Month',
  'Edit Title': 'Edit Title',
  'Delete List': 'Delete List',
  'Are you sure you want to delete this list?': 'Are you sure you want to delete this list?',
  'Are you sure you want to delete this card?': 'Are you sure you want to delete this card?',
  'Enter card title...': 'Enter card title...',
  'Add a description...': 'Add a description...',
  'Attach': 'Attach',
  'Attachments': 'Attachments',
  'Hide': 'Hide',
  'Show': 'Show',
  'Tag Library': 'Tag Library',
  'Manage Tags': 'Manage Tags',
  'Done': 'Done',
  'Enter tag name...': 'Enter tag name...',
  'Image Gallery': 'Image Gallery',
  'Add Images': 'Add Images',
  'No images uploaded yet': 'No images uploaded yet',
  'Upload images to get started': 'Upload images to get started',
  'Selected': 'Selected',
  'Select': 'Select',
  'Delete': 'Delete',
  'Collection Images': 'Collection Images',
  'Feature Library': 'Feature Library',
  'Manage Features': 'Manage Features',
  'Enter feature name...': 'Enter feature name...',
  'Update': 'Update',
  'Drag and drop an image here, or click to select': 'Drag and drop an image here, or click to select',
  'Supports: JPG, PNG, GIF': 'Supports: JPG, PNG, GIF',
  'Image uploaded': 'Image uploaded',
  'Click or drag to replace': 'Click or drag to replace',
  'Add a custom feature': 'Add a custom feature',
  'Selected Features:': 'Selected Features:',
  'Admin Login': 'Admin Login',
  'Email': 'Email',
  'Password': 'Password',
  'Login': 'Login',
  'Logging in...': 'Logging in...',
  'Default credentials:': 'Default credentials:',
  'Paragraph': 'Paragraph',
  'Select for Media': 'Select for Media',
  'Selected': 'Selected',
  'Media attached to this paragraph:': 'Media attached to this paragraph:',
  'No media added yet': 'No media added yet',
  'All Media': 'All Media'
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;