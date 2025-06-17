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
import AnimatedAdminDashboard from './components/AnimatedAdminDashboard'

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
  const [aboutContent, setAboutContent] = useState({
    paragraphs: [
      'With a passion for sustainable fashion and innovative design, I create collections that bridge the gap between contemporary aesthetics and timeless appeal. My work focuses on clean silhouettes, quality materials, and versatile pieces that empower the modern individual.',

  const handleAdminClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">{t('TANIA ATELIER')}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleAdminClick}>
                {t('common.adminPanel')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with RobinxTania Image */}
      {activeSection === 'home' && (
        <div className="relative h-[80vh] mb-12">
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
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20">
        {/* Admin Dashboard */}
        {isOpen && (
          <EnhancedAdminDashboard onClose={handleClose} />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
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
                            src={optimizeImageUrl(collection.moodBoard, 800)} 
                            alt={`${collection.title} mood board`}
                            className="w-full rounded-lg shadow-md"
                            loading="lazy"
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
                  {/* Admin buttons removed */}
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>
      </div>
    </ErrorBoundary>
  )
}

export default App