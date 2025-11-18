# Video Recording Demo

A complete video recording web application built with React 19 and Vite, supporting real-time video/audio capture, playback, and download functionality.

## Overview

This project demonstrates a modern approach to implementing video recording in web applications using React and the MediaRecorder API. The application provides an intuitive interface for capturing screen recordings with adjustable quality settings.

## Features

### VideoRecorder Component
- **MediaRecorder API Integration**
  - Camera/microphone access via getUserMedia
  - Screen recording with configurable bitrate
  - Record, pause, resume, and stop controls
  - Live preview during recording with visual indicator
  - Recorded video playback and WebM download
  - Real-time duration counter
  - Permission and error state management

### UI/UX
- Responsive layout for mobile and desktop
- Animated recording indicator with pulsing dot
- Turkish localization for all UI text
- Dark/light mode compatible styling
- Quality presets: Low (1 Mbps), Medium (2.5 Mbps), High (5 Mbps)

### Project Configuration
- Vite build configuration for fast development
- ESLint setup for code quality
- Production build optimization
- TypeScript for type safety

## Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ferahfeza/Video-Recording.git
   cd Video-Recording
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```sh
npm run preview
```

## Browser Support

This application requires modern browsers with MediaRecorder API support:
- Chrome/Edge (recommended)
- Firefox
- Safari 14.3+

**Important:** HTTPS is required in production for camera/screen access due to browser security policies.

## Technologies Used

- **React 18.2** - UI library
- **TypeScript 5.0** - Type safety
- **Vite 7.2** - Build tool and development server
- **react-media-recorder 1.7** - MediaRecorder wrapper library

## Project Structure

```
Video-Recording/
├── src/
│   ├── App.tsx          # Main application component
│   ├── RecordView.tsx   # Video recording component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Usage

1. Select your desired video quality from the dropdown menu
2. Click "Start Recording" to begin screen capture
3. Select the screen/window you want to record
4. Click "Stop Recording" when finished
5. The recorded video will appear below with playback controls
6. Use the video controls to review or download your recording

## Development

This project uses:
- **Vite** for fast development and hot module replacement
- **TypeScript** for type checking and better developer experience
- **ESLint** for code quality and consistency

## License

This project is open source and available for use and extension as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and Vite
