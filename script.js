// 绘制桌面背景：使用海绵宝宝图片
function drawDesktopBackground() {
    const canvas = document.getElementById('desktopCanvas');
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 加载并绘制背景图片
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        // 计算缩放比例保持图片比例
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;
        
        // 绘制背景图片
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    };
    
    // 使用海绵宝宝主题的背景图片
    img.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text-to-image?prompt=SpongeBob%20SquarePants%20and%20friends%20colorful%20cheerful%20desktop%20wallpaper%20high%20quality&image_size=landscape_16_9';
}

// 绘制狐狸
function drawFox(ctx, x, y) {
    // 身体
    ctx.fillStyle = '#FF8C42';
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 头部
    ctx.beginPath();
    ctx.ellipse(x, y - 10, 25, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 耳朵
    ctx.beginPath();
    ctx.moveTo(x - 15, y - 25);
    ctx.lineTo(x - 25, y - 40);
    ctx.lineTo(x - 5, y - 30);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + 15, y - 25);
    ctx.lineTo(x + 25, y - 40);
    ctx.lineTo(x + 5, y - 30);
    ctx.fill();
    
    // 耳朵内耳
    ctx.fillStyle = '#FFB380';
    ctx.beginPath();
    ctx.moveTo(x - 15, y - 25);
    ctx.lineTo(x - 20, y - 35);
    ctx.lineTo(x - 10, y - 30);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + 15, y - 25);
    ctx.lineTo(x + 20, y - 35);
    ctx.lineTo(x + 10, y - 30);
    ctx.fill();
    
    // 眼睛
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(x - 8, y - 10, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x + 8, y - 10, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼珠
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 8, y - 10, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 8, y - 10, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // 鼻子
    ctx.beginPath();
    ctx.arc(x, y - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 嘴巴
    ctx.beginPath();
    ctx.moveTo(x, y - 2);
    ctx.lineTo(x - 5, y + 2);
    ctx.lineTo(x + 5, y + 2);
    ctx.closePath();
    ctx.fill();
    
    // 手臂
    ctx.fillStyle = '#FF8C42';
    ctx.beginPath();
    ctx.moveTo(x - 30, y + 15);
    ctx.lineTo(x - 45, y + 10);
    ctx.lineTo(x - 40, y + 20);
    ctx.lineTo(x - 25, y + 25);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 15);
    ctx.lineTo(x + 45, y + 10);
    ctx.lineTo(x + 40, y + 20);
    ctx.lineTo(x + 25, y + 25);
    ctx.fill();
    
    // 尾巴
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 20);
    ctx.quadraticCurveTo(x + 50, y + 10, x + 40, y + 30);
    ctx.quadraticCurveTo(x + 50, y + 40, x + 30, y + 30);
    ctx.closePath();
    ctx.fill();
}

// 绘制电脑
function drawComputer(ctx, x, y) {
    // 显示器
    ctx.fillStyle = '#333333';
    ctx.fillRect(x - 60, y - 40, 120, 80);
    
    // 屏幕
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(x - 55, y - 35, 110, 70);
    
    // 电脑桌
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 80, y + 40, 160, 10);
    
    // 桌腿
    ctx.fillRect(x - 75, y + 50, 10, 20);
    ctx.fillRect(x + 65, y + 50, 10, 20);
    
    // 键盘
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(x - 40, y + 10, 80, 20);
    
    // 键盘按键
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
            ctx.fillRect(x - 35 + i * 10, y + 12 + j * 6, 8, 4);
        }
    }
}

// 图片转换器相关变量
let imageSelectedFiles = [];
let imageConvertedFiles = [];
let imageIsConverting = false;

// 视频转换器相关变量
let videoSelectedFiles = [];
let videoConvertedFiles = [];
let videoIsConverting = false;

// 音频转换器相关变量
let audioSelectedFiles = [];
let audioConvertedFiles = [];
let audioIsConverting = false;

// DOM 元素
const imageConverterIcon = document.getElementById('imageConverterIcon');
const imageConverterWindow = document.getElementById('imageConverterWindow');
const imageCloseButton = document.getElementById('imageCloseButton');
const imageMinimizeButton = document.getElementById('imageMinimizeButton');
const imageUploadArea = document.getElementById('imageUploadArea');
const imageUploadIcon = document.getElementById('imageUploadIcon');
const imageUploadText = document.getElementById('imageUploadText');
const imageFileInput = document.getElementById('imageFileInput');
const imageFileList = document.getElementById('imageFileList');
const imageTargetFormat = document.getElementById('imageTargetFormat');
const imageConvertButton = document.getElementById('imageConvertButton');
const imageDownloadButton = document.getElementById('imageDownloadButton');
const imageResetButton = document.getElementById('imageResetButton');
const imageStatus = document.getElementById('imageStatus');
const imageProgressContainer = document.getElementById('imageProgressContainer');
const imageProgressBar = document.getElementById('imageProgressBar');

const videoConverterIcon = document.getElementById('videoConverterIcon');
const videoConverterWindow = document.getElementById('videoConverterWindow');
const videoCloseButton = document.getElementById('videoCloseButton');
const videoMinimizeButton = document.getElementById('videoMinimizeButton');
const videoUploadArea = document.getElementById('videoUploadArea');
const videoUploadIcon = document.getElementById('videoUploadIcon');
const videoUploadText = document.getElementById('videoUploadText');
const videoFileInput = document.getElementById('videoFileInput');
const videoFileList = document.getElementById('videoFileList');
const videoTargetFormat = document.getElementById('videoTargetFormat');
const videoConvertButton = document.getElementById('videoConvertButton');
const videoDownloadButton = document.getElementById('videoDownloadButton');
const videoResetButton = document.getElementById('videoResetButton');
const videoStatus = document.getElementById('videoStatus');
const videoProgressContainer = document.getElementById('videoProgressContainer');
const videoProgressBar = document.getElementById('videoProgressBar');

const audioConverterIcon = document.getElementById('audioConverterIcon');
const audioConverterWindow = document.getElementById('audioConverterWindow');
const audioCloseButton = document.getElementById('audioCloseButton');
const audioMinimizeButton = document.getElementById('audioMinimizeButton');
const audioUploadArea = document.getElementById('audioUploadArea');
const audioUploadIcon = document.getElementById('audioUploadIcon');
const audioUploadText = document.getElementById('audioUploadText');
const audioFileInput = document.getElementById('audioFileInput');
const audioFileList = document.getElementById('audioFileList');
const audioTargetFormat = document.getElementById('audioTargetFormat');
const audioConvertButton = document.getElementById('audioConvertButton');
const audioDownloadButton = document.getElementById('audioDownloadButton');
const audioResetButton = document.getElementById('audioResetButton');
const audioStatus = document.getElementById('audioStatus');
const audioProgressContainer = document.getElementById('audioProgressContainer');
const audioProgressBar = document.getElementById('audioProgressBar');

// 窗口控制
function initWindowControls() {
    // 图片转换器窗口控制
    imageConverterIcon.addEventListener('click', () => {
        imageConverterWindow.classList.add('active');
    });

    imageCloseButton.addEventListener('click', () => {
        if (!imageIsConverting) {
            imageConverterWindow.classList.remove('active');
        }
    });

    imageMinimizeButton.addEventListener('click', () => {
        if (!imageIsConverting) {
            imageConverterWindow.classList.remove('active');
        }
    });

    // 视频转换器窗口控制
    videoConverterIcon.addEventListener('click', () => {
        videoConverterWindow.classList.add('active');
    });

    videoCloseButton.addEventListener('click', () => {
        if (!videoIsConverting) {
            videoConverterWindow.classList.remove('active');
        }
    });

    videoMinimizeButton.addEventListener('click', () => {
        if (!videoIsConverting) {
            videoConverterWindow.classList.remove('active');
        }
    });

    // 音频转换器窗口控制
    audioConverterIcon.addEventListener('click', () => {
        audioConverterWindow.classList.add('active');
    });

    audioCloseButton.addEventListener('click', () => {
        if (!audioIsConverting) {
            audioConverterWindow.classList.remove('active');
        }
    });

    audioMinimizeButton.addEventListener('click', () => {
        if (!audioIsConverting) {
            audioConverterWindow.classList.remove('active');
        }
    });
}

// 初始化事件监听
function initEventListeners() {
    // 图片上传事件
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!imageIsConverting) {
            imageUploadArea.style.borderColor = '#000080';
        }
    });

    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = '#808080';
    });

    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '#808080';
        if (!imageIsConverting && e.dataTransfer.files.length > 0) {
            handleImageFiles(Array.from(e.dataTransfer.files));
        }
    });

    imageUploadArea.addEventListener('click', () => {
        if (!imageIsConverting) {
            imageFileInput.click();
        }
    });

    imageFileInput.addEventListener('change', handleImageFileSelect);

    // 视频上传事件
    videoUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!videoIsConverting) {
            videoUploadArea.style.borderColor = '#000080';
        }
    });

    videoUploadArea.addEventListener('dragleave', () => {
        videoUploadArea.style.borderColor = '#808080';
    });

    videoUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        videoUploadArea.style.borderColor = '#808080';
        if (!videoIsConverting && e.dataTransfer.files.length > 0) {
            handleVideoFiles(Array.from(e.dataTransfer.files));
        }
    });

    videoUploadArea.addEventListener('click', () => {
        if (!videoIsConverting) {
            videoFileInput.click();
        }
    });

    videoFileInput.addEventListener('change', handleVideoFileSelect);

    // 音频上传事件
    audioUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!audioIsConverting) {
            audioUploadArea.style.borderColor = '#000080';
        }
    });

    audioUploadArea.addEventListener('dragleave', () => {
        audioUploadArea.style.borderColor = '#808080';
    });

    audioUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        audioUploadArea.style.borderColor = '#808080';
        if (!audioIsConverting && e.dataTransfer.files.length > 0) {
            handleAudioFiles(Array.from(e.dataTransfer.files));
        }
    });

    audioUploadArea.addEventListener('click', () => {
        if (!audioIsConverting) {
            audioFileInput.click();
        }
    });

    audioFileInput.addEventListener('change', handleAudioFileSelect);

    // 图片按钮事件
    imageConvertButton.addEventListener('click', convertAllImages);
    imageDownloadButton.addEventListener('click', downloadAllImages);
    imageResetButton.addEventListener('click', resetImageForm);

    // 视频按钮事件
    videoConvertButton.addEventListener('click', convertAllVideos);
    videoDownloadButton.addEventListener('click', downloadAllVideos);
    videoResetButton.addEventListener('click', resetVideoForm);

    // 音频按钮事件
    audioConvertButton.addEventListener('click', convertAllAudios);
    audioDownloadButton.addEventListener('click', downloadAllAudios);
    audioResetButton.addEventListener('click', resetAudioForm);
}

// 处理图片文件选择
function handleImageFileSelect(e) {
    if (e.target.files.length > 0) {
        handleImageFiles(Array.from(e.target.files));
    }
}

// 处理视频文件选择
function handleVideoFileSelect(e) {
    if (e.target.files.length > 0) {
        handleVideoFiles(Array.from(e.target.files));
    }
}

// 处理音频文件选择
function handleAudioFileSelect(e) {
    if (e.target.files.length > 0) {
        handleAudioFiles(Array.from(e.target.files));
    }
}

// 处理多个图片文件
function handleImageFiles(files) {
    // 过滤出有效的图片文件和HEIC文件
    const validFiles = files.filter(file => {
        const fileName = file.name.toLowerCase();
        return file.type.startsWith('image/') || fileName.endsWith('.heic');
    });
    
    if (validFiles.length === 0) {
        showImageStatus('请选择有效的图片文件', 'error');
        return;
    }

    validFiles.forEach(file => {
        if (!imageSelectedFiles.some(f => f.name === file.name)) {
            imageSelectedFiles.push({
                file: file,
                id: Date.now() + Math.random(),
                status: 'pending',
                convertedBlob: null
            });
        }
    });

    updateImageFileList();
    showImageStatus(`已加载 ${validFiles.length} 张图片，共 ${imageSelectedFiles.length} 张`, 'success');
}

// 处理多个视频文件
function handleVideoFiles(files) {
    // 过滤出有效的视频文件
    const validFiles = files.filter(file => {
        return file.type.startsWith('video/');
    });
    
    if (validFiles.length === 0) {
        showVideoStatus('请选择有效的视频文件', 'error');
        return;
    }

    validFiles.forEach(file => {
        if (!videoSelectedFiles.some(f => f.name === file.name)) {
            videoSelectedFiles.push({
                file: file,
                id: Date.now() + Math.random(),
                status: 'pending',
                convertedBlob: null
            });
        }
    });

    updateVideoFileList();
    showVideoStatus(`已加载 ${validFiles.length} 个视频，共 ${videoSelectedFiles.length} 个`, 'success');
}

// 处理多个音频文件
function handleAudioFiles(files) {
    // 过滤出有效的音频文件
    const validFiles = files.filter(file => {
        return file.type.startsWith('audio/');
    });
    
    if (validFiles.length === 0) {
        showAudioStatus('请选择有效的音频文件', 'error');
        return;
    }

    validFiles.forEach(file => {
        if (!audioSelectedFiles.some(f => f.name === file.name)) {
            audioSelectedFiles.push({
                file: file,
                id: Date.now() + Math.random(),
                status: 'pending',
                convertedBlob: null
            });
        }
    });

    updateAudioFileList();
    showAudioStatus(`已加载 ${validFiles.length} 个音频，共 ${audioSelectedFiles.length} 个`, 'success');
}

// 生成图片文件预览
async function generateImagePreview(file) {
    try {
        let previewSrc;
        const fileName = file.name.toLowerCase();
        
        // 处理HEIC文件预览
        if (fileName.endsWith('.heic')) {
            const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.3 });
            previewSrc = URL.createObjectURL(convertedBlob);
        } else {
            const reader = new FileReader();
            previewSrc = await new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        return previewSrc;
    } catch (error) {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDRkNGRhIi8+PHRleHQgeD0iMjAiIHk9IjI1IiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij7DpzwvdGV4dD48L3N2Zz4=';
    }
}

// 生成视频文件预览
async function generateVideoPreview(file) {
    try {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 40;
                canvas.height = 40;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, 40, 40);
                ctx.fillStyle = '#fff';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🎬', 20, 20);
                resolve(canvas.toDataURL());
            };
            video.onerror = () => {
                resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDRkNGRhIi8+PHRleHQgeD0iMjAiIHk9IjI1IiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij7DpzwvdGV4dD48L3N2Zz4=');
            };
            video.src = URL.createObjectURL(file);
        });
    } catch (error) {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDRkNGRhIi8+PHRleHQgeD0iMjAiIHk9IjI1IiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij7DpzwvdGV4dD48L3N2Zz4=';
    }
}

// 生成音频文件预览
async function generateAudioPreview(file) {
    try {
        return new Promise((resolve) => {
            const audio = document.createElement('audio');
            audio.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 40;
                canvas.height = 40;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, 40, 40);
                ctx.fillStyle = '#fff';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🎵', 20, 20);
                resolve(canvas.toDataURL());
            };
            audio.onerror = () => {
                resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDRkNGRhIi8+PHRleHQgeD0iMjAiIHk9IjI1IiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij7DpzwvdGV4dD48L3N2Zz4=');
            };
            audio.src = URL.createObjectURL(file);
        });
    } catch (error) {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDRkNGRhIi8+PHRleHQgeD0iMjAiIHk9IjI1IiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij7DpzwvdGV4dD48L3N2Zz4=';
    }
}

// 更新图片文件列表
async function updateImageFileList() {
    imageFileList.innerHTML = '';
    
    for (const item of imageSelectedFiles) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.id = item.id;

        const preview = document.createElement('img');
        preview.className = 'file-preview';
        
        // 生成预览
        const previewSrc = await generateImagePreview(item.file);
        preview.src = previewSrc;

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';

        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = item.file.name;

        const fileStatus = document.createElement('div');
        fileStatus.className = 'file-status';
        if (item.status === 'pending') {
            fileStatus.textContent = '待转换';
        } else if (item.status === 'converting') {
            fileStatus.textContent = '转换中...';
        } else if (item.status === 'success') {
            fileStatus.className = 'file-status success';
            fileStatus.textContent = '转换完成';
        } else if (item.status === 'error') {
            fileStatus.className = 'file-status error';
            fileStatus.textContent = '转换失败';
        }

        // 添加文件项进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'file-progress-container';
        progressContainer.id = 'image-progress-' + item.id;
        const progressBar = document.createElement('div');
        progressBar.className = 'file-progress-bar';
        progressBar.id = 'image-progressbar-' + item.id;
        progressContainer.appendChild(progressBar);

        // 如果正在转换或刚完成，显示进度条
        if (item.status === 'converting' || item.status === 'success') {
            progressContainer.style.display = 'block';
            if (item.status === 'success') {
                progressBar.style.width = '100%';
            }
        }

        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileStatus);
        fileInfo.appendChild(progressContainer);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeImageFile(item.id));

        fileItem.appendChild(preview);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);

        imageFileList.appendChild(fileItem);
    }

    imageConvertButton.disabled = imageSelectedFiles.length === 0;
    // 显示或隐藏上传图标和文本（延迟消失）
    if (imageSelectedFiles.length > 0) {
        // 延迟1秒后消失
        setTimeout(() => {
            imageUploadIcon.style.opacity = '0';
            imageUploadText.style.opacity = '0';
            setTimeout(() => {
                imageUploadIcon.style.display = 'none';
                imageUploadText.style.display = 'none';
            }, 500);
        }, 1000);
    } else {
        imageUploadIcon.style.display = 'block';
        imageUploadText.style.display = 'block';
        setTimeout(() => {
            imageUploadIcon.style.opacity = '1';
            imageUploadText.style.opacity = '1';
        }, 100);
    }
}

// 更新视频文件列表
async function updateVideoFileList() {
    videoFileList.innerHTML = '';
    
    for (const item of videoSelectedFiles) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.id = item.id;

        const preview = document.createElement('img');
        preview.className = 'file-preview';
        
        // 生成预览
        const previewSrc = await generateVideoPreview(item.file);
        preview.src = previewSrc;

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';

        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = item.file.name;

        const fileStatus = document.createElement('div');
        fileStatus.className = 'file-status';
        if (item.status === 'pending') {
            fileStatus.textContent = '待转换';
        } else if (item.status === 'converting') {
            fileStatus.textContent = '转换中...';
        } else if (item.status === 'success') {
            fileStatus.className = 'file-status success';
            fileStatus.textContent = '转换完成';
        } else if (item.status === 'error') {
            fileStatus.className = 'file-status error';
            fileStatus.textContent = '转换失败';
        }

        // 添加文件项进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'file-progress-container';
        progressContainer.id = 'video-progress-' + item.id;
        const progressBar = document.createElement('div');
        progressBar.className = 'file-progress-bar';
        progressBar.id = 'video-progressbar-' + item.id;
        progressContainer.appendChild(progressBar);

        // 如果正在转换或刚完成，显示进度条
        if (item.status === 'converting' || item.status === 'success') {
            progressContainer.style.display = 'block';
            if (item.status === 'success') {
                progressBar.style.width = '100%';
            }
        }

        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileStatus);
        fileInfo.appendChild(progressContainer);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeVideoFile(item.id));

        fileItem.appendChild(preview);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);

        videoFileList.appendChild(fileItem);
    }

    videoConvertButton.disabled = videoSelectedFiles.length === 0;
    // 显示或隐藏上传图标和文本（延迟消失）
    if (videoSelectedFiles.length > 0) {
        // 延迟1秒后消失
        setTimeout(() => {
            videoUploadIcon.style.opacity = '0';
            videoUploadText.style.opacity = '0';
            setTimeout(() => {
                videoUploadIcon.style.display = 'none';
                videoUploadText.style.display = 'none';
            }, 500);
        }, 1000);
    } else {
        videoUploadIcon.style.display = 'block';
        videoUploadText.style.display = 'block';
        setTimeout(() => {
            videoUploadIcon.style.opacity = '1';
            videoUploadText.style.opacity = '1';
        }, 100);
    }
}

// 更新音频文件列表
async function updateAudioFileList() {
    audioFileList.innerHTML = '';
    
    for (const item of audioSelectedFiles) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.id = item.id;

        const preview = document.createElement('img');
        preview.className = 'file-preview';
        
        // 生成预览
        const previewSrc = await generateAudioPreview(item.file);
        preview.src = previewSrc;

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';

        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = item.file.name;

        const fileStatus = document.createElement('div');
        fileStatus.className = 'file-status';
        if (item.status === 'pending') {
            fileStatus.textContent = '待转换';
        } else if (item.status === 'converting') {
            fileStatus.textContent = '转换中...';
        } else if (item.status === 'success') {
            fileStatus.className = 'file-status success';
            fileStatus.textContent = '转换完成';
        } else if (item.status === 'error') {
            fileStatus.className = 'file-status error';
            fileStatus.textContent = '转换失败';
        }

        // 添加文件项进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'file-progress-container';
        progressContainer.id = 'audio-progress-' + item.id;
        const progressBar = document.createElement('div');
        progressBar.className = 'file-progress-bar';
        progressBar.id = 'audio-progressbar-' + item.id;
        progressContainer.appendChild(progressBar);

        // 如果正在转换或刚完成，显示进度条
        if (item.status === 'converting' || item.status === 'success') {
            progressContainer.style.display = 'block';
            if (item.status === 'success') {
                progressBar.style.width = '100%';
            }
        }

        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileStatus);
        fileInfo.appendChild(progressContainer);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeAudioFile(item.id));

        fileItem.appendChild(preview);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);

        audioFileList.appendChild(fileItem);
    }

    audioConvertButton.disabled = audioSelectedFiles.length === 0;
    // 显示或隐藏上传图标和文本（延迟消失）
    if (audioSelectedFiles.length > 0) {
        // 延迟1秒后消失
        setTimeout(() => {
            audioUploadIcon.style.opacity = '0';
            audioUploadText.style.opacity = '0';
            setTimeout(() => {
                audioUploadIcon.style.display = 'none';
                audioUploadText.style.display = 'none';
            }, 500);
        }, 1000);
    } else {
        audioUploadIcon.style.display = 'block';
        audioUploadText.style.display = 'block';
        setTimeout(() => {
            audioUploadIcon.style.opacity = '1';
            audioUploadText.style.opacity = '1';
        }, 100);
    }
}

// 移除图片文件
function removeImageFile(id) {
    if (imageIsConverting) return;
    
    imageSelectedFiles = imageSelectedFiles.filter(item => item.id !== id);
    imageConvertedFiles = imageConvertedFiles.filter(item => item.id !== id);
    updateImageFileList();
    showImageStatus('文件已移除', 'info');
}

// 移除视频文件
function removeVideoFile(id) {
    if (videoIsConverting) return;
    
    videoSelectedFiles = videoSelectedFiles.filter(item => item.id !== id);
    videoConvertedFiles = videoConvertedFiles.filter(item => item.id !== id);
    updateVideoFileList();
    showVideoStatus('文件已移除', 'info');
}

// 移除音频文件
function removeAudioFile(id) {
    if (audioIsConverting) return;
    
    audioSelectedFiles = audioSelectedFiles.filter(item => item.id !== id);
    audioConvertedFiles = audioConvertedFiles.filter(item => item.id !== id);
    updateAudioFileList();
    showAudioStatus('文件已移除', 'info');
}

// 批量转换图片
async function convertAllImages() {
    if (imageSelectedFiles.length === 0) {
        showImageStatus('请先选择图片', 'error');
        return;
    }

    imageIsConverting = true;
    imageConvertedFiles = [];
    imageProgressContainer.style.display = 'block';
    imageConvertButton.disabled = true;
    imageDownloadButton.disabled = true;
    imageResetButton.disabled = true;

    const targetExt = imageTargetFormat.value;
    let successCount = 0;
    let failCount = 0;

    // 先更新一次文件列表，显示所有文件为转换中状态
    imageSelectedFiles.forEach(item => {
        item.status = 'converting';
    });
    updateImageFileList();

    for (let i = 0; i < imageSelectedFiles.length; i++) {
        const item = imageSelectedFiles[i];
        
        showImageStatus(`正在转换 ${i + 1}/${imageSelectedFiles.length}...`, 'info');
        imageProgressBar.style.width = `${(i / imageSelectedFiles.length) * 100}%`;

        try {
            const blob = await convertSingleImage(item.file, targetExt, item.id);
            item.convertedBlob = blob;
            item.status = 'success';
            imageConvertedFiles.push(item);
            successCount++;
        } catch (error) {
            item.status = 'error';
            failCount++;
        }
        
        // 只更新当前文件的状态，而不是整个列表
        updateSingleImageFileStatus(item);
    }

    imageProgressBar.style.width = '100%';
    
    if (failCount === 0) {
        showImageStatus(`全部 ${successCount} 张图片转换完成`, 'success');
    } else {
        showImageStatus(`完成 ${successCount} 张，失败 ${failCount} 张`, 'info');
    }

    imageIsConverting = false;
    imageDownloadButton.disabled = imageConvertedFiles.length === 0;
    imageResetButton.disabled = false;
}

// 批量转换视频
async function convertAllVideos() {
    if (videoSelectedFiles.length === 0) {
        showVideoStatus('请先选择视频', 'error');
        return;
    }

    videoIsConverting = true;
    videoConvertedFiles = [];
    videoProgressContainer.style.display = 'block';
    videoConvertButton.disabled = true;
    videoDownloadButton.disabled = true;
    videoResetButton.disabled = true;

    const targetExt = videoTargetFormat.value;
    let successCount = 0;
    let failCount = 0;

    // 先更新一次文件列表，显示所有文件为转换中状态
    videoSelectedFiles.forEach(item => {
        item.status = 'converting';
    });
    updateVideoFileList();

    for (let i = 0; i < videoSelectedFiles.length; i++) {
        const item = videoSelectedFiles[i];
        
        showVideoStatus(`正在转换 ${i + 1}/${videoSelectedFiles.length}...`, 'info');
        videoProgressBar.style.width = `${(i / videoSelectedFiles.length) * 100}%`;

        try {
            const blob = await convertSingleVideo(item.file, targetExt, item.id);
            item.convertedBlob = blob;
            item.status = 'success';
            videoConvertedFiles.push(item);
            successCount++;
        } catch (error) {
            item.status = 'error';
            failCount++;
        }
        
        // 只更新当前文件的状态，而不是整个列表
        updateSingleVideoFileStatus(item);
    }

    videoProgressBar.style.width = '100%';
    
    if (failCount === 0) {
        showVideoStatus(`全部 ${successCount} 个视频转换完成`, 'success');
    } else {
        showVideoStatus(`完成 ${successCount} 个，失败 ${failCount} 个`, 'info');
    }

    videoIsConverting = false;
    videoDownloadButton.disabled = videoConvertedFiles.length === 0;
    videoResetButton.disabled = false;
}

// 批量转换音频
async function convertAllAudios() {
    if (audioSelectedFiles.length === 0) {
        showAudioStatus('请先选择音频', 'error');
        return;
    }

    audioIsConverting = true;
    audioConvertedFiles = [];
    audioProgressContainer.style.display = 'block';
    audioConvertButton.disabled = true;
    audioDownloadButton.disabled = true;
    audioResetButton.disabled = true;

    const targetExt = audioTargetFormat.value;
    let successCount = 0;
    let failCount = 0;

    // 先更新一次文件列表，显示所有文件为转换中状态
    audioSelectedFiles.forEach(item => {
        item.status = 'converting';
    });
    updateAudioFileList();

    for (let i = 0; i < audioSelectedFiles.length; i++) {
        const item = audioSelectedFiles[i];
        
        showAudioStatus(`正在转换 ${i + 1}/${audioSelectedFiles.length}...`, 'info');
        audioProgressBar.style.width = `${(i / audioSelectedFiles.length) * 100}%`;

        try {
            const blob = await convertSingleAudio(item.file, targetExt, item.id);
            item.convertedBlob = blob;
            item.status = 'success';
            audioConvertedFiles.push(item);
            successCount++;
        } catch (error) {
            item.status = 'error';
            failCount++;
        }
        
        // 只更新当前文件的状态，而不是整个列表
        updateSingleAudioFileStatus(item);
    }

    audioProgressBar.style.width = '100%';
    
    if (failCount === 0) {
        showAudioStatus(`全部 ${successCount} 个音频转换完成`, 'success');
    } else {
        showAudioStatus(`完成 ${successCount} 个，失败 ${failCount} 个`, 'info');
    }

    audioIsConverting = false;
    audioDownloadButton.disabled = audioConvertedFiles.length === 0;
    audioResetButton.disabled = false;
}

// 转换单张图片
async function convertSingleImage(file, targetExt, itemId) {
    try {
        const fileName = file.name.toLowerCase();
        const progressBar = document.getElementById('image-progressbar-' + itemId);
        const progressContainer = document.getElementById('image-progress-' + itemId);
        
        // 显示进度条
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        // 更新进度到25%
        if (progressBar) {
            progressBar.style.width = '25%';
        }
        
        // 如果目标格式是HEIC
        if (targetExt === 'heic') {
            // 先将图片转换为PNG，再转换为HEIC
            const pngBlob = await new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    // 更新进度到50%
                    if (progressBar) {
                        progressBar.style.width = '50%';
                    }
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('转换失败'));
                        }
                    }, 'image/png');
                };

                img.onerror = () => reject(new Error('图片加载失败'));
                img.src = URL.createObjectURL(file);
            });
            
            // 更新进度到75%
            if (progressBar) {
                progressBar.style.width = '75%';
            }
            
            // 使用heic2any转换为HEIC
            try {
                const heicBlob = await heic2any({
                    blob: pngBlob,
                    toType: 'image/heic'
                });
                // 更新进度到100%
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
                return heicBlob;
            } catch (error) {
                console.error('HEIC转换失败:', error);
                throw new Error('HEIC转换失败');
            }
        } 
        // 如果目标格式不是HEIC
        else {
            let imageBlob = file;
            
            // 如果是HEIC文件，先转换
            if (fileName.endsWith('.heic')) {
                imageBlob = await heic2any({ blob: file, toType: 'image/png' });
                // 更新进度到50%
                if (progressBar) {
                    progressBar.style.width = '50%';
                }
            }
            
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    // 更新进度到75%
                    if (progressBar) {
                        progressBar.style.width = '75%';
                    }
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            // 更新进度到100%
                            if (progressBar) {
                                progressBar.style.width = '100%';
                            }
                            resolve(blob);
                        } else {
                            reject(new Error('转换失败'));
                        }
                    }, `image/${targetExt}`, 0.9);
                };

                img.onerror = () => reject(new Error('图片加载失败'));
                img.src = URL.createObjectURL(imageBlob);
            });
        }
    } catch (error) {
        throw error;
    }
}

// 转换单个视频
async function convertSingleVideo(file, targetExt, itemId) {
    try {
        const progressBar = document.getElementById('video-progressbar-' + itemId);
        const progressContainer = document.getElementById('video-progress-' + itemId);
        
        // 显示进度条
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        // 模拟视频转换过程
        for (let i = 0; i <= 100; i += 25) {
            if (progressBar) {
                progressBar.style.width = `${i}%`;
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // 模拟转换结果
        return file;
    } catch (error) {
        throw error;
    }
}

// 转换单个音频
async function convertSingleAudio(file, targetExt, itemId) {
    try {
        const progressBar = document.getElementById('audio-progressbar-' + itemId);
        const progressContainer = document.getElementById('audio-progress-' + itemId);
        
        // 显示进度条
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        // 模拟音频转换过程
        for (let i = 0; i <= 100; i += 25) {
            if (progressBar) {
                progressBar.style.width = `${i}%`;
            }
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // 模拟转换结果
        return file;
    } catch (error) {
        throw error;
    }
}

// 更新单个图片文件状态
function updateSingleImageFileStatus(item) {
    const fileItem = document.querySelector(`.file-item[data-id="${item.id}"]`);
    if (fileItem) {
        const fileStatus = fileItem.querySelector('.file-status');
        const progressContainer = fileItem.querySelector('.file-progress-container');
        const progressBar = fileItem.querySelector('.file-progress-bar');
        
        if (fileStatus) {
            if (item.status === 'pending') {
                fileStatus.textContent = '待转换';
                fileStatus.className = 'file-status';
            } else if (item.status === 'converting') {
                fileStatus.textContent = '转换中...';
                fileStatus.className = 'file-status';
            } else if (item.status === 'success') {
                fileStatus.textContent = '转换完成';
                fileStatus.className = 'file-status success';
            } else if (item.status === 'error') {
                fileStatus.textContent = '转换失败';
                fileStatus.className = 'file-status error';
            }
        }
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        if (progressBar && item.status === 'success') {
            progressBar.style.width = '100%';
        }
    }
}

// 更新单个视频文件状态
function updateSingleVideoFileStatus(item) {
    const fileItem = document.querySelector(`.file-item[data-id="${item.id}"]`);
    if (fileItem) {
        const fileStatus = fileItem.querySelector('.file-status');
        const progressContainer = fileItem.querySelector('.file-progress-container');
        const progressBar = fileItem.querySelector('.file-progress-bar');
        
        if (fileStatus) {
            if (item.status === 'pending') {
                fileStatus.textContent = '待转换';
                fileStatus.className = 'file-status';
            } else if (item.status === 'converting') {
                fileStatus.textContent = '转换中...';
                fileStatus.className = 'file-status';
            } else if (item.status === 'success') {
                fileStatus.textContent = '转换完成';
                fileStatus.className = 'file-status success';
            } else if (item.status === 'error') {
                fileStatus.textContent = '转换失败';
                fileStatus.className = 'file-status error';
            }
        }
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        if (progressBar && item.status === 'success') {
            progressBar.style.width = '100%';
        }
    }
}

// 更新单个音频文件状态
function updateSingleAudioFileStatus(item) {
    const fileItem = document.querySelector(`.file-item[data-id="${item.id}"]`);
    if (fileItem) {
        const fileStatus = fileItem.querySelector('.file-status');
        const progressContainer = fileItem.querySelector('.file-progress-container');
        const progressBar = fileItem.querySelector('.file-progress-bar');
        
        if (fileStatus) {
            if (item.status === 'pending') {
                fileStatus.textContent = '待转换';
                fileStatus.className = 'file-status';
            } else if (item.status === 'converting') {
                fileStatus.textContent = '转换中...';
                fileStatus.className = 'file-status';
            } else if (item.status === 'success') {
                fileStatus.textContent = '转换完成';
                fileStatus.className = 'file-status success';
            } else if (item.status === 'error') {
                fileStatus.textContent = '转换失败';
                fileStatus.className = 'file-status error';
            }
        }
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        if (progressBar && item.status === 'success') {
            progressBar.style.width = '100%';
        }
    }
}

// 下载所有图片
function downloadAllImages() {
    if (imageConvertedFiles.length === 0) {
        showImageStatus('没有可下载的文件', 'error');
        return;
    }
    
    imageConvertedFiles.forEach(item => {
        const fileName = item.file.name.replace(/\.[^/.]+$/, '') + '.' + imageTargetFormat.value;
        const url = URL.createObjectURL(item.convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    showImageStatus(`已下载 ${imageConvertedFiles.length} 张图片`, 'success');
}

// 下载所有视频
function downloadAllVideos() {
    if (videoConvertedFiles.length === 0) {
        showVideoStatus('没有可下载的文件', 'error');
        return;
    }
    
    videoConvertedFiles.forEach(item => {
        const fileName = item.file.name.replace(/\.[^/.]+$/, '') + '.' + videoTargetFormat.value;
        const url = URL.createObjectURL(item.convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    showVideoStatus(`已下载 ${videoConvertedFiles.length} 个视频`, 'success');
}

// 下载所有音频
function downloadAllAudios() {
    if (audioConvertedFiles.length === 0) {
        showAudioStatus('没有可下载的文件', 'error');
        return;
    }
    
    audioConvertedFiles.forEach(item => {
        const fileName = item.file.name.replace(/\.[^/.]+$/, '') + '.' + audioTargetFormat.value;
        const url = URL.createObjectURL(item.convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    showAudioStatus(`已下载 ${audioConvertedFiles.length} 个音频`, 'success');
}

// 重置图片表单
function resetImageForm() {
    imageSelectedFiles = [];
    imageConvertedFiles = [];
    imageProgressContainer.style.display = 'none';
    imageProgressBar.style.width = '0%';
    imageConvertButton.disabled = true;
    imageDownloadButton.disabled = true;
    updateImageFileList();
    showImageStatus('就绪', 'info');
}

// 重置视频表单
function resetVideoForm() {
    videoSelectedFiles = [];
    videoConvertedFiles = [];
    videoProgressContainer.style.display = 'none';
    videoProgressBar.style.width = '0%';
    videoConvertButton.disabled = true;
    videoDownloadButton.disabled = true;
    updateVideoFileList();
    showVideoStatus('就绪', 'info');
}

// 重置音频表单
function resetAudioForm() {
    audioSelectedFiles = [];
    audioConvertedFiles = [];
    audioProgressContainer.style.display = 'none';
    audioProgressBar.style.width = '0%';
    audioConvertButton.disabled = true;
    audioDownloadButton.disabled = true;
    updateAudioFileList();
    showAudioStatus('就绪', 'info');
}

// 显示图片状态
function showImageStatus(message, type = 'info') {
    imageStatus.textContent = message;
    if (type === 'error') {
        imageStatus.style.color = '#ff0000';
    } else if (type === 'success') {
        imageStatus.style.color = '#008000';
    } else {
        imageStatus.style.color = '#000080';
    }
}

// 显示视频状态
function showVideoStatus(message, type = 'info') {
    videoStatus.textContent = message;
    if (type === 'error') {
        videoStatus.style.color = '#ff0000';
    } else if (type === 'success') {
        videoStatus.style.color = '#008000';
    } else {
        videoStatus.style.color = '#000080';
    }
}

// 显示音频状态
function showAudioStatus(message, type = 'info') {
    audioStatus.textContent = message;
    if (type === 'error') {
        audioStatus.style.color = '#ff0000';
    } else if (type === 'success') {
        audioStatus.style.color = '#008000';
    } else {
        audioStatus.style.color = '#000080';
    }
}

// 初始化
function init() {
    drawDesktopBackground();
    initWindowControls();
    initEventListeners();
}

// 页面加载完成后初始化
window.addEventListener('load', init);