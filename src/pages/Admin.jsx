import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { useTranslation } from 'react-i18next'
import api from '../services/api.js'
import { mlApi } from '../services/mlApi.js'

export default function Admin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [collections, setCollections] = useState([])
  const [newCollection, setNewCollection] = useState({
    title: '',
    description: '',
    moodBoard: '',
    sketch: '',
    tags: []
  })

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const response = await api.get('/collections')
      setCollections(response.data)
    } catch (error) {
      console.error('Error fetching collections:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleCreateCollection = async () => {
    try {
      await api.post('/collections', newCollection)
      setNewCollection({
        title: '',
        description: '',
        moodBoard: '',
        sketch: '',
        tags: []
      })
      fetchCollections()
    } catch (error) {
      console.error('Error creating collection:', error)
    }
  }

  const handleGenerateContent = async () => {
    try {
      const response = await mlApi.post('/generate', {
        prompt: `Create a fashion collection with ${newCollection.title} theme`
      })
      setNewCollection({
        ...newCollection,
        description: response.data.generatedContent
      })
    } catch (error) {
      console.error('Error generating content:', error)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('Admin Dashboard')}</h1>
        <Button variant="destructive" onClick={handleLogout}>
          {t('Logout')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Collection Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Create New Collection')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>{t('Title')}</Label>
                <Input
                  value={newCollection.title}
                  onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
                />
              </div>
              <div>
                <Label>{t('Description')}</Label>
                <Textarea
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                />
              </div>
              <div>
                <Label>{t('Mood Board Image')}</Label>
                <Input
                  type="file"
                  onChange={(e) => setNewCollection({ ...newCollection, moodBoard: e.target.files[0] })}
                />
              </div>
              <div>
                <Label>{t('Design Sketch')}</Label>
                <Input
                  type="file"
                  onChange={(e) => setNewCollection({ ...newCollection, sketch: e.target.files[0] })}
                />
              </div>
              <div>
                <Label>{t('Tags')}</Label>
                <Input
                  value={newCollection.tags.join(', ')}
                  onChange={(e) => 
                    setNewCollection({ 
                      ...newCollection, 
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })
                  }
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleGenerateContent}>
                  {t('Generate Content')}
                </Button>
                <Button onClick={handleCreateCollection}>
                  {t('Create Collection')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collections List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Collections')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collections.map((collection) => (
                <div key={collection.id} className="p-4 border rounded-md">
                  <h3 className="font-semibold">{collection.title}</h3>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
