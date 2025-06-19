from rest_framework import serializers
from .models import FashionItem, StyleRecommendation


class FashionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FashionItem
        fields = '__all__'


class StyleRecommendationSerializer(serializers.ModelSerializer):
    recommended_item_details = FashionItemSerializer(source='recommended_item', read_only=True)
    
    class Meta:
        model = StyleRecommendation
        fields = ['id', 'source_item', 'recommended_item', 'recommended_item_details', 
                  'similarity_score', 'recommendation_reason', 'created_at']