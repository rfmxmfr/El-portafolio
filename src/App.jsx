import { useState, useEffect } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Separator } from './components/ui/separator.jsx'
import { Mail, Phone, Instagram, Linkedin, Eye, Palette, Scissors, Sparkles, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { editableContentStorage } from './lib/utils'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import CanvaFeaturesPage from './components/CanvaFeaturesPage.jsx'

// Import assets
import moodBoard1 from './assets/mood_board_1.png'
import moodBoard2 from './assets/mood_board_2.png'
import fashionSketch1 from './assets/fashion_sketch_1.png'
import fashionSketch2 from './assets/fashion_sketch_2.png'
import technicalDrawing1 from './assets/technical_drawing_1.png'
import technicalDrawing2 from './assets/technical_drawing_2.png'
import robinxTania from './assets/robinxTania.jpg'

function App() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleAdminClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">{t('TANIA ATELIER')}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleAdminClick}>
                Admin
              </Button>
              <Button variant="outline" onClick={toggleDarkMode}>
                {isDark ? 'Light' : 'Dark'}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <ErrorBoundary>
        <main className="pt-20">
          {/* Hero Section with RobinxTania Image */}
          {activeSection === 'home' && (
            <div className="relative h-[80vh] mb-12">
              <div className="relative max-w-6xl mx-auto h-full flex items-center px-6">
                <div className="text-white z-10">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">{t('home.welcome')}</h1>
                  <p className="text-2xl md:text-3xl mb-8">{t('home.tagline')}</p>
                  <Button size="lg" className="bg-white text-black hover:bg-neutral-100">
                    {t('home.explore')}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Admin Dashboard */}
          {isOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                  <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Collections</h3>
                    <div className="space-y-4">
                      {collections.map((collection) => (
                        <div key={collection.id} className="p-4 border rounded-md">
                          <h4 className="font-semibold">{collection.title}</h4>
                          <p className="text-sm text-gray-500">{collection.description}</p>
                          <div className="mt-2 flex gap-2">
                            {collection.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {activeSection === 'home' && (
            <section className="relative h-[80vh] mb-12">
              <div className="absolute inset-0">
                <img
                  src={robinxTania}
                  alt="RobinxTania"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-transparent" />
              </div>
              <div className="relative max-w-6xl mx-auto h-full flex items-center px-6">
                <div className="text-white z-10">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">{t('home.welcome')}</h1>
                  <p className="text-2xl md:text-3xl mb-8">{t('home.tagline')}</p>
                  <Button size="lg" className="bg-white text-black hover:bg-neutral-100">
                    {t('home.explore')}
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <section className="py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('About')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    {aboutContent.paragraphs.map((paragraph, index) => (
                      <div key={index} className="space-y-6">
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
                        <p className="text-lg text-neutral-700 leading-relaxed">
                          {paragraph}
                        </p>
                        
                        {/* Media items positioned at this paragraph */}
                        {aboutContent.media && aboutContent.media.filter(item => item.position === index).length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {aboutContent.media
                              .filter(item => item.position === index)
                              .map((item) => (
                                <div key={item.id} className="rounded-lg overflow-hidden shadow-md">
                                  {item.type === 'image' ? (
                                    <img 
                                      src={item.url} 
                                      alt={item.title || 'Designer image'}
                                      className="w-full h-auto"
                                    />
                                  ) : (
                                    <video 
                                      src={item.url}
                                      className="w-full h-auto"
                                      controls
                                    />
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={fashionSketch1}
                      alt="Designer sketch"
                      className="w-full max-w-md rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Collections Section */}
          {activeSection === 'collections' && (
            <section className="py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('Collections')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collections.map((collection) => (
                    <Card key={collection.id}>
                      <div className="relative aspect-square">
                        <img
                          src={collection.moodBoard}
                          alt={`${collection.title} mood board`}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardContent>
                        <h3 className="font-semibold mb-2">{collection.title}</h3>
                        <p className="text-neutral-600 mb-4">{collection.description}</p>
                        <div className="flex gap-2">
                          {collection.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
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
            <section className="py-20 bg-neutral-50">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('Contact')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">{t('Get in Touch')}</h3>
                    <p className="text-neutral-600 mb-8">{t('contact.description')}</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Mail className="mt-1 text-neutral-400" />
                        <div>
                          <h4 className="font-medium">{t('Email')}</h4>
                          <p className="text-neutral-600">info@taniaatelier.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="mt-1 text-neutral-400" />
                        <div>
                          <h4 className="font-medium">{t('Phone')}</h4>
                          <p className="text-neutral-600">+1 234 567 890</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Instagram className="mt-1 text-neutral-400" />
                        <div>
                          <h4 className="font-medium">{t('Instagram')}</h4>
                          <p className="text-neutral-600">@taniaatelier</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name">{t('Name')}</Label>
                        <Input id="name" type="text" placeholder={t('Enter your name')} />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('Email')}</Label>
                        <Input id="email" type="email" placeholder={t('Enter your email')} />
                      </div>
                      <div>
                        <Label htmlFor="message">{t('Message')}</Label>
                        <Textarea id="message" placeholder={t('Enter your message')} />
                      </div>
                      <Button type="submit" className="w-full">
                        {t('Send Message')}
                      </Button>
                    </form>
                  </div>
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
          {/* Features Section */}
          {activeSection === 'features' && (
            <CanvaFeaturesPage />
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
                    <div className="mt-8">
                      <Button 
                        onClick={() => window.location.href = '/admin'} 
                        className="bg-neutral-900 hover:bg-neutral-800 text-white"
                      >
                        {t('Admin Dashboard')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}
        </main>
      </ErrorBoundary>
    </div>
  )
}

export default App