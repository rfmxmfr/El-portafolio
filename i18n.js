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
  'Design Illustration': 'Design Illustration'
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