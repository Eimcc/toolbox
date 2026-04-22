import { useState } from 'react';
import { ImageConverter } from './ImageConverter';
import { VideoConverter } from './VideoConverter';

interface DesktopProps {
  onToolOpen: (tool: string) => void;
}

export const Desktop: React.FC<DesktopProps> = ({ onToolOpen }) => {
  const [imageConverterOpen, setImageConverterOpen] = useState(false);
  const [videoConverterOpen, setVideoConverterOpen] = useState(false);
  const [imageConverterMinimized, setImageConverterMinimized] = useState(false);
  const [videoConverterMinimized, setVideoConverterMinimized] = useState(false);

  const handleImageConverterOpen = () => {
    setImageConverterOpen(true);
    setImageConverterMinimized(false);
    onToolOpen('image-converter');
  };

  const handleVideoConverterOpen = () => {
    setVideoConverterOpen(true);
    setVideoConverterMinimized(false);
    onToolOpen('video-converter');
  };

  const handleImageConverterToggle = () => {
    if (imageConverterMinimized) {
      setImageConverterOpen(true);
      setImageConverterMinimized(false);
    } else {
      setImageConverterOpen(false);
      setImageConverterMinimized(true);
    }
  };

  const handleVideoConverterToggle = () => {
    if (videoConverterMinimized) {
      setVideoConverterOpen(true);
      setVideoConverterMinimized(false);
    } else {
      setVideoConverterOpen(false);
      setVideoConverterMinimized(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-yellow-50"
      >
        {/* Background Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">心态好 情绪好 身体好 运气就好</h1>
            <p className="text-gray-600 mb-8">Good Mindset Good Mood Good Health Good Luck</p>
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">🐟</div>
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">🐠</div>
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">🐡</div>
              <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center">🦈</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-10 left-10 flex flex-col space-y-8 z-10">
        {/* Image Converter Icon */}
        <div
          onClick={handleImageConverterOpen}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <div className="w-16 h-16 bg-yellow-400 rounded flex items-center justify-center border-2 border-gray-400 shadow-md">
            <div className="w-10 h-10 bg-blue-600 rounded"></div>
          </div>
          <span className="text-black text-xs mt-2 text-center">图片转换</span>
        </div>

        {/* Video Converter Icon */}
        <div
          onClick={handleVideoConverterOpen}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <div className="w-16 h-16 bg-green-400 rounded flex items-center justify-center border-2 border-gray-400 shadow-md">
            <div className="w-10 h-10 bg-red-600 rounded"></div>
          </div>
          <span className="text-black text-xs mt-2 text-center">视频转换</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-300 border-t-2 border-gray-400 flex items-center z-20">
        {/* Start Button */}
        <button className="bg-blue-800 text-white px-4 py-2 mr-4 flex items-center border-2 border-gray-400 rounded hover:bg-blue-700 active:translate-y-1 active:border-b-0">
          <span className="font-bold mr-2">开始</span>
          <span className="text-xs">▼</span>
        </button>

        {/* Taskbar Items */}
        <div className="flex-1 flex space-x-2">
          {/* Image Converter Taskbar Item */}
          {(imageConverterOpen || imageConverterMinimized) && (
            <button
              onClick={handleImageConverterToggle}
              className={`px-3 py-1 border-2 border-gray-400 rounded flex items-center ${imageConverterOpen ? 'bg-blue-200' : 'bg-gray-200'}`}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-xs">图片转换</span>
            </button>
          )}

          {/* Video Converter Taskbar Item */}
          {(videoConverterOpen || videoConverterMinimized) && (
            <button
              onClick={handleVideoConverterToggle}
              className={`px-3 py-1 border-2 border-gray-400 rounded flex items-center ${videoConverterOpen ? 'bg-blue-200' : 'bg-gray-200'}`}
            >
              <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs">视频转换</span>
            </button>
          )}
        </div>

        {/* System Tray */}
        <div className="mr-4 flex items-center space-x-2">
          <div className="text-xs">12:00</div>
        </div>
      </div>

      {/* Image Converter Window */}
      <ImageConverter
        isOpen={imageConverterOpen}
        onClose={() => {
          setImageConverterOpen(false);
          setImageConverterMinimized(true);
        }}
      />

      {/* Video Converter Window */}
      <VideoConverter
        isOpen={videoConverterOpen}
        onClose={() => {
          setVideoConverterOpen(false);
          setVideoConverterMinimized(true);
        }}
      />
    </div>
  );
};