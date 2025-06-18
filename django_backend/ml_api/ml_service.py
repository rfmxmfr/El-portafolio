import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from collections import Counter

class FashionMLService:
    """Service for fashion-related machine learning tasks"""
    
    def __init__(self):
        # Initialize any models or resources here
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the pre-trained model or initialize a new one"""
        try:
            # For demonstration, we'll use a pre-trained MobileNetV2 model
            # In a real application, you might use a custom trained model
            self.model = tf.keras.applications.MobileNetV2(
                input_shape=(224, 224, 3),
                include_top=True,
                weights='imagenet'
            )
            print("Model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {e}")
    
    def preprocess_image(self, image_file):
        """Preprocess an image for model input"""
        try:
            # Open and resize image
            img = Image.open(image_file)
            img = img.resize((224, 224))
            img_array = tf.keras.preprocessing.image.img_to_array(img)
            img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
            img_array = np.expand_dims(img_array, axis=0)
            return img_array
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            return None
    
    def classify_style(self, image_file):
        """Classify the style of a fashion item"""
        if self.model is None:
            return {"error": "Model not loaded"}
        
        try:
            # Preprocess image
            img_array = self.preprocess_image(image_file)
            if img_array is None:
                return {"error": "Failed to preprocess image"}
            
            # Make prediction
            predictions = self.model.predict(img_array)
            decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
            
            # Format results
            results = []
            for _, label, score in decoded_predictions:
                results.append({
                    "label": label.replace("_", " ").title(),
                    "confidence": float(score)
                })
            
            # Determine style category based on predictions
            style_category = self._determine_style_category(results)
            
            return {
                "predictions": results,
                "style_category": style_category
            }
        except Exception as e:
            print(f"Error classifying style: {e}")
            return {"error": str(e)}
    
    def _determine_style_category(self, predictions):
        """Map predictions to fashion style categories"""
        # This is a simplified mapping - in a real app, you'd have a more sophisticated approach
        style_keywords = {
            "casual": ["t-shirt", "jeans", "hoodie", "sneaker", "casual"],
            "formal": ["suit", "tie", "dress", "formal", "business"],
            "sporty": ["athletic", "sport", "running", "fitness", "active"],
            "vintage": ["vintage", "retro", "classic", "old", "antique"],
            "bohemian": ["bohemian", "boho", "hippie", "ethnic", "tribal"],
            "minimalist": ["minimal", "simple", "clean", "basic", "monochrome"]
        }
        
        # Count matches for each style
        style_scores = {style: 0 for style in style_keywords}
        
        for pred in predictions:
            label = pred["label"].lower()
            confidence = pred["confidence"]
            
            for style, keywords in style_keywords.items():
                for keyword in keywords:
                    if keyword in label:
                        style_scores[style] += confidence
        
        # Return the style with the highest score, or "other" if none match
        best_style = max(style_scores.items(), key=lambda x: x[1])
        return best_style[0] if best_style[1] > 0 else "other"
    
    def extract_color_palette(self, image_file, n_colors=5):
        """Extract the dominant color palette from an image"""
        try:
            # Open image
            img = Image.open(image_file)
            img = img.resize((100, 100))  # Resize for faster processing
            img_array = np.array(img)
            
            # Reshape the array for KMeans
            pixels = img_array.reshape(-1, 3)
            
            # Apply KMeans clustering
            kmeans = KMeans(n_clusters=n_colors)
            kmeans.fit(pixels)
            
            # Get the colors
            colors = kmeans.cluster_centers_
            
            # Convert to hex format
            hex_colors = ['#%02x%02x%02x' % (int(r), int(g), int(b)) 
                         for r, g, b in colors]
            
            # Count pixel percentages
            labels = kmeans.labels_
            count = Counter(labels)
            
            # Calculate percentages
            total = sum(count.values())
            percentages = {hex_colors[i]: count[i]/total for i in range(n_colors)}
            
            # Sort by percentage
            sorted_colors = sorted(percentages.items(), key=lambda x: x[1], reverse=True)
            
            return {
                "palette": [{"color": color, "percentage": float(pct)} 
                           for color, pct in sorted_colors]
            }
        except Exception as e:
            print(f"Error extracting color palette: {e}")
            return {"error": str(e)}
    
    def find_similar_items(self, source_item_id, all_items):
        """Find items similar to the source item"""
        # In a real application, this would use embeddings or feature vectors
        # For this example, we'll use a simplified approach
        try:
            # Get the source item
            source_item = next((item for item in all_items if item.id == source_item_id), None)
            if not source_item:
                return {"error": "Source item not found"}
            
            # Calculate similarity scores (simplified)
            similar_items = []
            for item in all_items:
                if item.id == source_item_id:
                    continue
                    
                # Calculate a simple similarity score
                # In a real app, this would use embeddings or feature vectors
                if source_item.style_category == item.style_category:
                    similarity = 0.7 + np.random.random() * 0.3  # Random score between 0.7-1.0
                else:
                    similarity = np.random.random() * 0.7  # Random score between 0-0.7
                
                similar_items.append({
                    "item_id": item.id,
                    "similarity": similarity,
                    "reason": f"Similar {source_item.style_category} style"
                })
            
            # Sort by similarity
            similar_items.sort(key=lambda x: x["similarity"], reverse=True)
            
            return {"similar_items": similar_items[:5]}  # Return top 5
        except Exception as e:
            print(f"Error finding similar items: {e}")
            return {"error": str(e)}