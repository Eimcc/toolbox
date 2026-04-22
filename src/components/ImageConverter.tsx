import { useState, useRef } from 'react';

interface ImageConverterProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

export const ImageConverter: React.FC<ImageConverterProps> = ({
  isOpen,
  onClose,
  position,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setConvertedFile(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setConvertedFile(null);
    }
  };

  const handleConvert = () => {
    if (!file) return;

    setIsConverting(true);
    
    // 模拟转换过程
    setTimeout(() => {
      // 在实际应用中，这里会使用 Canvas 或其他库进行格式转换
      setConvertedFile(file);
      setIsConverting(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed z-50 w-96 bg-white border-2 border-gray-400 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Window Header */}
      <div className="bg-blue-800 text-white p-1 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-sm font-bold">图片格式转换</span>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black w-6 h-6 flex items-center justify-center rounded hover:bg-gray-400"
        >
          ×
        </button>
      </div>

      {/* Window Content */}
      <div className="p-4">
        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-gray-400 rounded p-6 text-center mb-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          {file ? (
            <p className="text-sm">已选择: {file.name}</p>
          ) : (
            <p className="text-sm">点击或拖拽图片到此处</p>
          )}
        </div>

        {/* Format Selection */}
        <div className="mb-4">
          <label className="block text-sm mb-2">输出格式:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-white"
          >
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="w-full bg-gray-300 border-2 border-gray-500 p-2 font-bold mb-4 hover:bg-gray-400 active:translate-y-1 active:border-b-0"
        >
          {isConverting ? '转换中...' : '转换'}
        </button>

        {/* Download Button */}
        {convertedFile && (
          <button
            onClick={handleDownload}
            className="w-full bg-gray-300 border-2 border-gray-500 p-2 font-bold hover:bg-gray-400 active:translate-y-1 active:border-b-0"
          >
            下载
          </button>
        )}
      </div>
    </div>
  );
};