# 📷 G-Arts Student Photo Gallery — Swaminarayan Gurukul

A modern, institutional, responsive photography gallery website built for **G-Arts, Swaminarayan Gurukul**. It connects directly to Google Drive to automatically stream and organize photos into albums, categories, and lightboxes with zero manual website uploads.

---

## 🌟 Key Features

- 🔄 **Google Drive Automatic Synchronization**: Drop photos into your Google Drive folder, and they immediately appear in the gallery.
- 📁 **Automated Albums**: Subfolders created in Google Drive are automatically detected and converted into organized albums.
- 🔍 **Instant Search & Category Filtering**: Search across photos, events, and albums with instant auto-suggestions (`Ctrl+K` shortcut).
- 🏷️ **Smart Categorization**: Photos & albums are categorized into *Events, Celebrations, Sports & Athletics, Competitions, Spiritual Assemblies, Student Activities,* and *Classroom Labs*.
- 🖼️ **Full-Screen Lightbox Viewer**:
  - Full-resolution photo preview
  - Keyboard navigation (Arrow keys, Escape, +/- for zoom)
  - Direct 1-click photo downloads
  - Web Share API and link copying
  - Aspect-ratio preservation and zoom controls
- 📱 **Mobile-First Responsive Layout**:
  - 2 columns on mobile devices
  - 3–4 columns on tablets
  - 4–6 columns on desktop displays
  - Touch-friendly navigation
- 🔒 **Zero Exposure of Secrets**: All Google Drive API communication runs through secure server-side API routes.
- ⚡ **High-Speed In-Memory Cache**: Automatic 10-minute caching with on-demand manual sync button in the Admin portal.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory (already pre-configured with the default Drive Folder ID):

```env
GOOGLE_DRIVE_FOLDER_ID="1pjCwzDixq-erdAEKaV439aqrpLLxe7IU"
GOOGLE_DRIVE_API_KEY="YOUR_GOOGLE_DRIVE_API_KEY"
```

> **Note**: Even without an API key, the website runs out-of-the-box in **Showcase Mode** with high-quality sample Gurukul photography.

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Google Drive API Setup Guide (6 Steps)

### Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top and select **New Project**.
3. Name it `Gurukul-GArts-Gallery` and click **Create**.

### Step 2: Enable Google Drive API
1. In the sidebar, go to **APIs & Services → Library**.
2. Search for **Google Drive API**.
3. Click **Enable**.

### Step 3: Generate an API Key
1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → API Key**.
3. Copy the generated API Key (e.g., `AIzaSy...`).
4. *(Recommended)* Click **Edit API key** and restrict its usage to the *Google Drive API*.

### Step 4: Ensure Drive Folder Sharing Permissions
1. Open your Google Drive folder (`1pjCwzDixq-erdAEKaV439aqrpLLxe7IU`).
2. Click **Share** and set General Access to **"Anyone with the link can view"**.

### Step 5: Save Credentials in `.env.local`
Paste your API Key into `.env.local`:
```env
GOOGLE_DRIVE_FOLDER_ID="1pjCwzDixq-erdAEKaV439aqrpLLxe7IU"
GOOGLE_DRIVE_API_KEY="AIzaSyYourGeneratedKeyHere"
```

### Step 6: Deploy
- **Vercel**: Import your Git repository and add `GOOGLE_DRIVE_FOLDER_ID` & `GOOGLE_DRIVE_API_KEY` in Project Settings → Environment Variables.
- **Node Server**: Run `npm run build && npm run start`.

---

## 🛠️ Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/            # Server-side API endpoints
│   │   │   ├── albums/     # Album listing & single album queries
│   │   │   ├── drive/      # Sync & status endpoints
│   │   │   └── photos/     # Photo search, filter & pagination
│   │   ├── about/          # G-Arts story & philosophy
│   │   ├── admin/          # Drive sync dashboard & setup guide
│   │   ├── albums/         # Albums catalog & single album page
│   │   ├── events/         # Chronological events timeline
│   │   ├── photos/         # Dedicated full photo gallery
│   │   ├── globals.css     # Tailwind styling & animations
│   │   ├── layout.tsx      # Root layout with fonts & status banner
│   │   └── page.tsx        # Homepage with hero & stats
│   ├── components/
│   │   ├── albums/         # AlbumCard & AlbumGrid components
│   │   ├── gallery/        # PhotoCard, PhotoGrid, Lightbox, FilterBar, SearchModal
│   │   ├── layout/         # Header, Footer, DriveStatusBanner
│   │   └── ui/             # LoadingSpinner, EmptyState, Badges
│   ├── lib/
│   │   ├── drive.ts        # Google Drive API client & caching engine
│   │   └── mockData.ts     # Gurukul sample showcase dataset
│   └── types/              # TypeScript interfaces
├── .env.example            # Environment variables template
├── package.json
└── tailwind.config.ts
```

---

## 🏛️ G-Arts — Swaminarayan Gurukul
*Preserving memories, celebrating moments.*
