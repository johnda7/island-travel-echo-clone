#!/bin/bash

# Create directory for avatar tour photos in src/assets
mkdir -p /home/runner/work/island-travel-echo-clone/island-travel-echo-clone/src/assets/avatar-plus

# Change to the directory
cd /home/runner/work/island-travel-echo-clone/island-travel-echo-clone/src/assets/avatar-plus

echo "🔄 Downloading Avatar Plus tour images..."

# Download the main image and other images from the correct source
# Based on the user's instruction, using avatar-pljus (not avatar-plus)

# Try various image names that might exist on their server
wget -O main.jpg "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/the-hotspring-beach-resort-spa-1.jpeg" || echo "❌ Failed to download main image"

# Try common avatar-related image names from their server structure
wget -O avatar-water-cave.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-water-cave.webp" || echo "❌ Failed to download avatar-water-cave"
wget -O avatar-cave.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-cave.webp" || echo "❌ Failed to download avatar-cave"
wget -O avatar-jump.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-jump.webp" || echo "❌ Failed to download avatar-jump"
wget -O avatar-monkey.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-monkey.webp" || echo "❌ Failed to download avatar-monkey"
wget -O avatar-jungle.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-jungle.webp" || echo "❌ Failed to download avatar-jungle"
wget -O avatar-view.webp "https://phuketgo.aaddaa.com/img/excursion/avatar-pljus/avatar-view.webp" || echo "❌ Failed to download avatar-view"

# Also try downloading from the image shown in the original HTML
wget -O benyaran-museum.jpg "https://phuketgo.aaddaa.com/wp-content/uploads/2025/05/benyaran-museum-1-1.jpg" || echo "❌ Failed to download benyaran-museum"

echo "✅ Avatar Plus images download completed"

# List downloaded files
echo "📂 Downloaded files:"
ls -la
