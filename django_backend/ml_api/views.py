from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import FashionItem, StyleRecommendation
from .serializers import FashionItemSerializer, StyleRecommendationSerializer
from .ml_service import FashionMLService
import json

class FashionItemViewSet(viewsets.ModelViewSet):
    queryset = FashionItem.objects.all()
    serializer_class = FashionItemSerializer
    parser_classes = (MultiPartParser, FormParser)
    ml_service = FashionMLService()
    
    def create(self, request, *args, **kwargs):
        """Override create to add ML analysis"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the instance first
        instance = serializer.save()
        
        # Analyze with ML
        if instance.image:
            # Classify style
            style_results = self.ml_service.classify_style(instance.image)
            if 'error' not in style_results:
                instance.style_category = style_results.get('style_category', '')
            
            # Extract color palette
            instance.image.seek(0)  # Reset file pointer
            color_results = self.ml_service.extract_color_palette(instance.image)
            if 'error' not in color_results:
                instance.color_palette = color_results
            
            # Save the updated instance
            instance.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=True, methods=['post'])
    def analyze(self, request, pk=None):
        """Analyze an existing fashion item with ML"""
        instance = self.get_object()
        
        if not instance.image:
            return Response({"error": "No image available"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Classify style
        style_results = self.ml_service.classify_style(instance.image)
        if 'error' in style_results:
            return Response(style_results, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Extract color palette
        instance.image.seek(0)  # Reset file pointer
        color_results = self.ml_service.extract_color_palette(instance.image)
        
        # Update the instance
        instance.style_category = style_results.get('style_category', '')
        if 'error' not in color_results:
            instance.color_palette = color_results
        instance.save()
        
        # Return the combined results
        return Response({
            "item": FashionItemSerializer(instance).data,
            "style_analysis": style_results,
            "color_analysis": color_results
        })
    
    @action(detail=True, methods=['get'])
    def similar_items(self, request, pk=None):
        """Find items similar to this one"""
        instance = self.get_object()
        all_items = FashionItem.objects.exclude(id=instance.id)
        
        # Find similar items
        similar_results = self.ml_service.find_similar_items(instance.id, all_items)
        if 'error' in similar_results:
            return Response(similar_results, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Create recommendation records
        for item_data in similar_results.get('similar_items', []):
            recommended_item = FashionItem.objects.get(id=item_data['item_id'])
            StyleRecommendation.objects.update_or_create(
                source_item=instance,
                recommended_item=recommended_item,
                defaults={
                    'similarity_score': item_data['similarity'],
                    'recommendation_reason': item_data['reason']
                }
            )
        
        # Get all recommendations for this item
        recommendations = StyleRecommendation.objects.filter(source_item=instance)
        serializer = StyleRecommendationSerializer(recommendations, many=True)
        
        return Response(serializer.data)


class StyleRecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StyleRecommendation.objects.all()
    serializer_class = StyleRecommendationSerializer
    
    def get_queryset(self):
        queryset = StyleRecommendation.objects.all()
        source_id = self.request.query_params.get('source_id', None)
        
        if source_id is not None:
            queryset = queryset.filter(source_item_id=source_id)
        
        return queryset