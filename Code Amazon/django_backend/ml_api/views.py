from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .ml_service import ml_service

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_ideas(request):
    """
    Generate fashion design ideas based on a text prompt.
    """
    prompt = request.data.get('prompt')
    
    if not prompt:
        return Response(
            {'error': 'Prompt is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        result = ml_service.generate_ideas(prompt)
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_image(request):
    """
    Generate a fashion design image based on a text prompt.
    """
    prompt = request.data.get('prompt')
    
    if not prompt:
        return Response(
            {'error': 'Prompt is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        result = ml_service.generate_image(prompt)
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_style(request):
    """
    Analyze the style of a fashion design from an image URL.
    """
    image_url = request.data.get('imageUrl')
    
    if not image_url:
        return Response(
            {'error': 'Image URL is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        result = ml_service.analyze_style(image_url)
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def model_status(request):
    """
    Get the status of all ML models.
    """
    try:
        result = ml_service.get_model_status()
        return Response(result, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Public endpoint for health check
@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint for the ML API.
    """
    return Response(
        {'status': 'healthy', 'service': 'fashion-ml-api'}, 
        status=status.HTTP_200_OK
    )