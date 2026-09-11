INSTRUCTION: Save the uploaded Image 1 as hero-main.jpg

1. Right-click the image you sent in chat -> Save as -> save to:
   C:\Users\A2_B2_Nishanth\Documents\WEBSITE\public\hero-main.jpg

2. Or copy the image file manually to public/hero-main.jpg

The site now loads /hero-main.jpg as main hero at http://localhost:1000
If the file is missing, it will fallback to the latest Drive photo automatically.

Current code: src/app/page.tsx:54 src="/hero-main.jpg" with onError fallback to latestPhotos[0].

Image description: Student leaning over desk with dual monitors (top shows Drive grid, bottom shows Photoshop group photo 'ME AND MY ROOMMATES' on pink background), SONY headphones, BOAT soundbar.
