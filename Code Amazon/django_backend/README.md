# Fashion ML Backend

This is a Django backend with machine learning capabilities for the Fashion Portfolio application.

## Features

- Fashion item analysis with TensorFlow
- Style classification
- Color palette extraction
- Similar item recommendations
- RESTful API for integration with the React frontend

## Setup Instructions

### Option 1: Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed
2. Navigate to the django_backend directory:
   ```
   cd django_backend
   ```
3. Build and start the Docker container:
   ```
   docker-compose up --build
   ```
4. The API will be available at http://localhost:8000/api/

### Option 2: Manual Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```
2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```
6. Start the development server:
   ```
   python manage.py runserver
   ```
7. The API will be available at http://localhost:8000/api/

## API Endpoints

- `GET /api/fashion-items/` - List all fashion items
- `POST /api/fashion-items/` - Create a new fashion item with ML analysis
- `GET /api/fashion-items/{id}/` - Get a specific fashion item
- `POST /api/fashion-items/{id}/analyze/` - Analyze an existing fashion item
- `GET /api/fashion-items/{id}/similar_items/` - Get similar items
- `GET /api/recommendations/` - List all recommendations
- `GET /api/recommendations/?source_id={id}` - Get recommendations for a specific item

## Machine Learning Features

- **Style Classification**: Identifies the style category of fashion items
- **Color Palette Extraction**: Extracts the dominant colors from images
- **Similar Item Recommendations**: Suggests similar fashion items based on style and appearance

## Integration with React Frontend

The React frontend communicates with this backend through the API endpoints. The `mlApi.js` file in the frontend handles these API calls.