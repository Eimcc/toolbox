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
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('png');
  const [convertedFiles, setConvertedFiles] = useState<Blob[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles([...files, ...Array.from(selectedFiles)]);
      setConvertedFiles([]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setFiles([...files, ...Array.from(droppedFiles)]);
      setConvertedFiles([]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (convertedFiles.length > 0) {
      const newConvertedFiles = [...convertedFiles];
      newConvertedFiles.splice(index, 1);
      setConvertedFiles(newConvertedFiles);
    }
  };

  const handleConvert = () => {
    if (files.length === 0) return;

    setIsConverting(true);
    
    // 模拟转换过程
    setTimeout(() => {
      // 在实际应用中，这里会使用 Canvas 或其他库进行格式转换
      setConvertedFiles(files);
      setIsConverting(false);
    }, 1500 * files.length);
  };

  const handleDownload = (index: number) => {
    if (convertedFiles.length === 0 || !convertedFiles[index]) return;

    const file = convertedFiles[index];
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${index + 1}.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBatchDownload = () => {
    if (convertedFiles.length === 0) return;

    // 模拟批量下载，实际应用中可以使用 zip 库打包
    convertedFiles.forEach((file, index) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted_${index + 1}.${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 100);
    });
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
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          {files.length > 0 ? (
            <p className="text-sm">已选择: {files.length} 个文件</p>
          ) : (
            <p className="text-sm">点击或拖拽图片到此处（支持批量上传）</p>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mb-4 max-h-40 overflow-y-auto">
            <h3 className="text-sm font-bold mb-2">已选择的文件:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

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
          disabled={files.length === 0 || isConverting}
          className="w-full bg-gray-300 border-2 border-gray-500 p-2 font-bold mb-4 hover:bg-gray-400 active:translate-y-1 active:border-b-0"
        >
          {isConverting ? `转换中... (${convertedFiles.length}/${files.length})` : '批量转换'}
        </button>

        {/* Download Buttons */}
        {convertedFiles.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-bold">转换结果:</h3>
              {convertedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">converted_${index + 1}.${outputFormat}</span>
                  <button
                    onClick={() => handleDownload(index)}
                    className="bg-gray-300 border-2 border-gray-500 px-2 py-1 text-xs font-bold hover:bg-gray-400 active:translate-y-1 active:border-b-0"
                  >
                    下载
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleBatchDownload}
              className="w-full bg-gray-300 border-2 border-gray-500 p-2 font-bold hover:bg-gray-400 active:translate-y-1 active:border-b-0"
            >
              批量下载
            </button>
          </div>
        )}
      </div>
    </div>
  );
};