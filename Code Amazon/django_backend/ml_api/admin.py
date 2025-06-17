from django.contrib import admin
from .models import FashionItem, StyleRecommendation

@admin.register(FashionItem)
class FashionItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'style_category', 'created_at')
    search_fields = ('title', 'description', 'style_category')
    list_filter = ('style_category', 'created_at')

@admin.register(StyleRecommendation)
class StyleRecommendationAdmin(admin.ModelAdmin):
    list_display = ('source_item', 'recommended_item', 'similarity_score', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('source_item__title', 'recommended_item__title', 'recommendation_reason')