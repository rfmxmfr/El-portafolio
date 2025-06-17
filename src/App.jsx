import { useState } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Separator } from './components/ui/separator.jsx'
import { Mail, Phone, Instagram, Linkedin, Eye, Palette, Scissors, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './App.css'

// Import assets
import moodBoard1 from './assets/mood_board_1.png'
import moodBoard2 from './assets/mood_board_2.png'
import fashionSketch1 from './assets/fashion_sketch_1.png'
import fashionSketch2 from './assets/fashion_sketch_2.png'
import technicalDrawing1 from './assets/technical_drawing_1.png'
import technicalDrawing2 from './assets/technical_drawing_2.png'

function App() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', label: 'Home', icon: Eye },
    { id: 'about', label: 'About', icon: Sparkles },
    { id: 'collections', label: 'Collections', icon: Palette },
    { id: 'technical', label: 'Technical', icon: Scissors },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  const collections = [
    {
      id: 'minimalist',
      title: 'Minimalist Essentials',
      description: 'Clean lines, neutral tones, and timeless silhouettes for the modern professional.',
      moodBoard: moodBoard1,
      sketch: fashionSketch1,
      tags: ['Minimalist', 'Professional', 'Sustainable']
    },
    {
      id: 'maximalist',
      title: 'Vibrant Expression',
      description: 'Bold colors, dramatic textures, and statement pieces for the confident individual.',
      moodBoard: moodBoard2,
      sketch: fashionSketch2,
      tags: ['Bold', 'Luxury', 'Statement']
    }
  ]

  const technicalDrawings = [
    {
      id: 'blazer',
      title: 'Oversized Linen Blazer',
      description: 'Technical specifications for a relaxed-fit blazer with notched lapels and single-button closure.',
      image: technicalDrawing1,
      details: ['Notched lapels', 'Single button closure', 'Flap pockets', 'Relaxed fit']
    },
    {
      id: 'blouse',
      title: 'Ruffled Silk Blouse',
      description: 'Technical specifications for a dramatic blouse with V-neck and ruffled details.',
      image: technicalDrawing2,
      details: ['V-neck design', 'Ruffled sleeves', 'Loose fit', 'Silk construction']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">{t('ATELIER')}</h1>
            <div className="flex space-x-6">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden md:inline">{t(section.label)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-light text-neutral-900 mb-6">
                {t('Fashion Design')}
              </h1>
              <h2 className="text-2xl md:text-3xl text-neutral-600 mb-8">
                {t('Portfolio')}
              </h2>
              <p className="text-lg text-neutral-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t('Crafting contemporary fashion with a focus on sustainable materials, innovative silhouettes, and timeless elegance. Each piece tells a story of modern sophistication and conscious design.')}
              </p>
              <Button 
                onClick={() => setActiveSection('collections')}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 text-lg"
              >
                {t('Explore Collections')}
              </Button>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('About the Designer')}</h2>
              <Card className="bg-white/60 backdrop-blur-sm border-neutral-200">
                <CardContent className="p-8">
                  <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                    With a passion for sustainable fashion and innovative design, I create collections 
                    that bridge the gap between contemporary aesthetics and timeless appeal. My work 
                    focuses on clean silhouettes, quality materials, and versatile pieces that 
                    empower the modern individual.
                  </p>
                  <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                    Drawing inspiration from minimalist architecture, natural textures, and cultural 
                    diversity, each design reflects a commitment to both style and substance. I believe 
                    fashion should be both beautiful and responsible, creating pieces that last beyond 
                    seasonal trends.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Palette className="mx-auto mb-3 text-neutral-600" size={32} />
                      <h3 className="font-semibold text-neutral-900 mb-2">{t('Creative Vision')}</h3>
                      <p className="text-neutral-600">{t('Innovative designs that push boundaries')}</p>
                    </div>
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 text-neutral-600" size={32} />
                      <h3 className="font-semibold text-neutral-900 mb-2">{t('Sustainability')}</h3>
                      <p className="text-neutral-600">{t('Conscious choices for a better future')}</p>
                    </div>
                    <div className="text-center">
                      <Scissors className="mx-auto mb-3 text-neutral-600" size={32} />
                      <h3 className="font-semibold text-neutral-900 mb-2">{t('Craftsmanship')}</h3>
                      <p className="text-neutral-600">{t('Attention to detail in every piece')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Collections Section */}
        {activeSection === 'collections' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('Collections')}</h2>
              <div className="space-y-16">
                {collections.map((collection) => (
                  <Card key={collection.id} className="bg-white/60 backdrop-blur-sm border-neutral-200 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-8">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="text-2xl font-light text-neutral-900 mb-2">
                            {t(collection.title)}
                          </CardTitle>
                          <CardDescription className="text-lg text-neutral-600">
                            {t(collection.description)}
                          </CardDescription>
                        </CardHeader>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {collection.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-700">
                              {t(tag)}
                            </Badge>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">{t('Mood Board')}</h4>
                          <img 
                            src={collection.moodBoard} 
                            alt={`${collection.title} mood board`}
                            className="w-full rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                      <div className="p-8 bg-neutral-50/50">
                        <h4 className="font-semibold text-neutral-900 mb-4">{t('Design Illustration')}</h4>
                        <img 
                          src={collection.sketch} 
                          alt={`${collection.title} design`}
                          className="w-full max-w-md mx-auto rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technical Section */}
        {activeSection === 'technical' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('Technical Drawings')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {technicalDrawings.map((drawing) => (
                  <Card key={drawing.id} className="bg-white/60 backdrop-blur-sm border-neutral-200">
                    <CardHeader>
                      <CardTitle className="text-xl font-light text-neutral-900">
                        {t(drawing.title)}
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        {t(drawing.description)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img 
                        src={drawing.image} 
                        alt={drawing.title}
                        className="w-full mb-6 rounded-lg shadow-md bg-white p-4"
                      />
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3">{t('Key Features:')}</h4>
                        <ul className="space-y-2">
                          {drawing.details.map((detail, index) => (
                            <li key={index} className="flex items-center text-neutral-700">
                              <div className="w-2 h-2 bg-neutral-400 rounded-full mr-3"></div>
                              {t(detail)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('Let\'s Collaborate')}</h2>
              <Card className="bg-white/60 backdrop-blur-sm border-neutral-200">
                <CardContent className="p-8 text-center">
                  <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                    {t('Ready to bring your vision to life? I\'m always excited to work on new projects, whether it\'s custom designs, brand collaborations, or consulting opportunities.')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex items-center justify-center space-x-3">
                      <Mail className="text-neutral-600" size={24} />
                      <span className="text-lg text-neutral-700">hello@atelierdesign.com</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <Phone className="text-neutral-600" size={24} />
                      <span className="text-lg text-neutral-700">+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <Separator className="my-8" />
                  <div className="flex justify-center space-x-6">
                    <button className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                      <Instagram size={24} />
                      <span>@atelierdesign</span>
                    </button>
                    <button className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                      <Linkedin size={24} />
                      <span>Atelier Design</span>
                    </button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <a 
                      href="/admin" 
                      className="flex items-center justify-center px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors"
                    >
                      {t('Admin Dashboard')}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

