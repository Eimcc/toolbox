import { useState } from 'react';
import { ImageConverter } from './ImageConverter';
import { VideoConverter } from './VideoConverter';

interface DesktopProps {
  onToolOpen: (tool: string) => void;
}

export const Desktop: React.FC<DesktopProps> = ({ onToolOpen }) => {
  const [imageConverterOpen, setImageConverterOpen] = useState(false);
  const [videoConverterOpen, setVideoConverterOpen] = useState(false);
  const [imageConverterPosition, setImageConverterPosition] = useState({ x: 100, y: 100 });
  const [videoConverterPosition, setVideoConverterPosition] = useState({ x: 300, y: 100 });

  const handleImageConverterOpen = () => {
    setImageConverterOpen(true);
    onToolOpen('image-converter');
  };

  const handleVideoConverterOpen = () => {
    setVideoConverterOpen(true);
    onToolOpen('video-converter');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-800">
        {/* Windows XP Style Grass and Hills */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-600"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-1/6 bg-green-700 rounded-t-full"></div>
        <div className="absolute bottom-1/2 left-0 right-0 h-1/8 bg-blue-900 rounded-t-full"></div>
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
          <span className="text-white text-xs mt-2 text-center">图片转换</span>
        </div>

        {/* Video Converter Icon */}
        <div
          onClick={handleVideoConverterOpen}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <div className="w-16 h-16 bg-green-400 rounded flex items-center justify-center border-2 border-gray-400 shadow-md">
            <div className="w-10 h-10 bg-red-600 rounded"></div>
          </div>
          <span className="text-white text-xs mt-2 text-center">视频转换</span>
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
          {/* Taskbar Item Placeholder */}
        </div>

        {/* System Tray */}
        <div className="mr-4 flex items-center space-x-2">
          <div className="text-xs">12:00</div>
        </div>
      </div>

      {/* Image Converter Window */}
      <ImageConverter
        isOpen={imageConverterOpen}
        onClose={() => setImageConverterOpen(false)}
        position={imageConverterPosition}
      />

      {/* Video Converter Window */}
      <VideoConverter
        isOpen={videoConverterOpen}
        onClose={() => setVideoConverterOpen(false)}
        position={videoConverterPosition}
      />
    </div>
  );
};