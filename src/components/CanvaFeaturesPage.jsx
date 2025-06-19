import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Sparkles, Palette, Scissors } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function CanvaFeaturesPage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: t('AI-Powered Design'),
      description: t('Leverage AI algorithms to generate innovative fashion designs tailored to your brand.')
    },
    {
      icon: <Palette className="w-6 h-6 text-blue-500" />,
      title: t('Color Intelligence'),
      description: t('Smart color palette generation based on seasonal trends and brand identity.')
    },
    {
      icon: <Scissors className="w-6 h-6 text-green-500" />,
      title: t('Pattern Generation'),
      description: t('Automated pattern creation with precision and efficiency.')
    }
  ]

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-neutral-900 mb-12 text-center">{t('CANVA Features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-neutral-200">
              <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b">
                {feature.icon}
                <CardTitle className="text-xl font-light text-neutral-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CanvaFeaturesPage
