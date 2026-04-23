// 绘制桌面背景：狐狸在电脑前办公
function drawDesktopBackground() {
    const canvas = document.getElementById('desktopCanvas');
    const ctx = canvas.getContext('2d');
    
    // 设置Canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 纯色背景
    ctx.fillStyle = '#008080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 计算中心位置
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // 绘制狐狸
    drawFox(ctx, centerX, centerY);
    
    // 绘制电脑
    drawComputer(ctx, centerX, centerY + 60);
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

// 更新时钟
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '下午' : '上午';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('clock').textContent = `${ampm} ${hours}:${minutes}`;
}

// 图片编辑器相关变量
let currentEditIndex = 0;
let editorCanvas, editorCtx;
let originalImage = null;
let currentImage = null;
let isCropping = false;
let cropBox = { x: 0, y: 0, width: 0, height: 0 };
let cropRatio = null;
let cropStart = null;
let resizeHandle = null;
let adjustSettings = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    grayscale: false,
    invert: false,
    sepia: false,
    rotation: 0,
    flipH: false,
    flipV: false
};

// 裁剪预设尺寸（像素）
const cropPresets = {
    'a4-portrait': { ratio: 210/297 },
    'a4-landscape': { ratio: 297/210 },
    'a3-portrait': { ratio: 297/420 },
    'a3-landscape': { ratio: 420/297 },
    'id-1inch': { ratio: 25/35 },
    'id-2inch': { ratio: 35/49 },
    'instagram': { ratio: 1 },
    'cover-facebook': { ratio: 820/312 },
    'cover-twitter': { ratio: 1500/500 }
};

// 初始化编辑器
function initImageEditor() {
    const imageEditorWindow = document.getElementById('imageEditorWindow');
    const imageEditorCloseButton = document.getElementById('imageEditorCloseButton');
    const imageEditorMinButton = document.getElementById('imageEditorMinButton');
    const imageEditButton = document.getElementById('imageEditButton');
    const saveEditorButton = document.getElementById('saveEditor');
    const cancelEditorButton = document.getElementById('cancelEditor');
    
    // 初始化canvas
    editorCanvas = document.getElementById('editorCanvas');
    editorCtx = editorCanvas.getContext('2d');
    
    // 窗口控制
    imageEditorCloseButton.addEventListener('click', () => {
        if (!imageIsConverting) {
            imageEditorWindow.classList.remove('active');
        }
    });
    
    imageEditorMinButton.addEventListener('click', () => {
        if (!imageIsConverting) {
            imageEditorWindow.classList.remove('active');
        }
    });
    
    // 打开编辑器
    imageEditButton.addEventListener('click', () => {
        if (imageSelectedFiles.length === 0) {
            showImageStatus('请先选择图片', 'error');
            return;
        }
        currentEditIndex = 0;
        openImageEditor();
    });
    
    // 保存和取消
    saveEditorButton.addEventListener('click', saveImageEdit);
    cancelEditorButton.addEventListener('click', () => {
        document.getElementById('imageEditorWindow').classList.remove('active');
    });
    
    // 初始化标签页
    initEditorTabs();
    
    // 初始化裁剪功能
    initCropControls();
    
    // 初始化调整功能
    initAdjustControls();
}

// 初始化标签页
function initEditorTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tabName}Panel`).classList.add('active');
            
            if (tabName === 'crop') {
                document.getElementById('cropOverlay').style.display = 'block';
            } else {
                document.getElementById('cropOverlay').style.display = 'none';
            }
        });
    });
}

// 打开编辑器
function openImageEditor() {
    const file = imageSelectedFiles[currentEditIndex];
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
        originalImage = img;
        currentImage = img;
        
        // 设置canvas尺寸
        editorCanvas.width = img.width;
        editorCanvas.height = img.height;
        
        // 重置调整设置
        resetAdjustSettings();
        
        // 绘制图片
        drawEditorImage();
        
        // 初始化裁剪框
        initCropBox();
        
        document.getElementById('imageEditorWindow').classList.add('active');
    };
    
    img.src = URL.createObjectURL(file.file);
}

// 绘制编辑器图片
function drawEditorImage() {
    if (!currentImage) return;
    
    // 保存当前状态
    editorCtx.save();
    
    // 清空canvas
    editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
    
    // 应用变换
    const centerX = editorCanvas.width / 2;
    const centerY = editorCanvas.height / 2;
    
    editorCtx.translate(centerX, centerY);
    
    // 应用旋转
    editorCtx.rotate((adjustSettings.rotation * Math.PI) / 180);
    
    // 应用翻转
    editorCtx.scale(adjustSettings.flipH ? -1 : 1, adjustSettings.flipV ? -1 : 1);
    
    // 绘制图片
    editorCtx.drawImage(currentImage, -currentImage.width / 2, -currentImage.height / 2);
    
    // 恢复状态
    editorCtx.restore();
    
    // 应用滤镜
    applyFilters();
}

// 应用滤镜
function applyFilters() {
    let filterString = '';
    
    if (adjustSettings.brightness !== 0) {
        filterString += `brightness(${100 + adjustSettings.brightness}%) `;
    }
    
    if (adjustSettings.contrast !== 0) {
        filterString += `contrast(${100 + adjustSettings.contrast}%) `;
    }
    
    if (adjustSettings.saturation !== 0) {
        filterString += `saturate(${100 + adjustSettings.saturation}%) `;
    }
    
    if (adjustSettings.grayscale) {
        filterString += 'grayscale(100%) ';
    }
    
    if (adjustSettings.invert) {
        filterString += 'invert(100%) ';
    }
    
    if (adjustSettings.sepia) {
        filterString += 'sepia(100%) ';
    }
    
    if (filterString) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = editorCanvas.width;
        tempCanvas.height = editorCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.filter = filterString.trim();
        tempCtx.drawImage(editorCanvas, 0, 0);
        
        editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
        editorCtx.drawImage(tempCanvas, 0, 0);
    }
}

// 初始化裁剪控制
function initCropControls() {
    const cropOverlay = document.getElementById('cropOverlay');
    const cropBoxElement = document.getElementById('cropBox');
    const cropRatioSelect = document.getElementById('cropRatio');
    const cropPresetSelect = document.getElementById('cropPreset');
    const applyCropBtn = document.getElementById('applyCrop');
    const resetCropBtn = document.getElementById('resetCrop');
    
    // 裁剪比例变化
    cropRatioSelect.addEventListener('change', () => {
        const ratio = cropRatioSelect.value;
        if (ratio === 'free') {
            cropRatio = null;
        } else {
            const [w, h] = ratio.split(':').map(Number);
            cropRatio = w / h;
        }
        updateCropBoxFromRatio();
    });
    
    // 裁剪预设变化
    cropPresetSelect.addEventListener('change', () => {
        const preset = cropPresetSelect.value;
        if (preset !== 'none' && cropPresets[preset]) {
            cropRatio = cropPresets[preset].ratio;
            cropRatioSelect.value = 'free';
            updateCropBoxFromRatio();
        }
    });
    
    // 应用裁剪
    applyCropBtn.addEventListener('click', applyCrop);
    
    // 重置裁剪
    resetCropBtn.addEventListener('click', () => {
        initCropBox();
    });
    
    // 裁剪框拖拽
    cropBoxElement.addEventListener('mousedown', startCropDrag);
    cropOverlay.addEventListener('mousedown', startCropDraw);
}

// 初始化裁剪框
function initCropBox() {
    cropBox = {
        x: editorCanvas.width * 0.1,
        y: editorCanvas.height * 0.1,
        width: editorCanvas.width * 0.8,
        height: editorCanvas.height * 0.8
    };
    updateCropBoxUI();
}

// 更新裁剪框UI
function updateCropBoxUI() {
    const cropBoxElement = document.getElementById('cropBox');
    cropBoxElement.innerHTML = '';
    
    cropBoxElement.style.left = `${cropBox.x}px`;
    cropBoxElement.style.top = `${cropBox.y}px`;
    cropBoxElement.style.width = `${cropBox.width}px`;
    cropBoxElement.style.height = `${cropBox.height}px`;
    
    // 添加调整手柄
    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    handles.forEach(pos => {
        const handle = document.createElement('div');
        handle.className = `crop-handle ${pos}`;
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            startResizeCrop(e, pos);
        });
        cropBoxElement.appendChild(handle);
    });
}

// 根据比例更新裁剪框
function updateCropBoxFromRatio() {
    if (!cropRatio) return;
    
    const currentRatio = cropBox.width / cropBox.height;
    const centerX = cropBox.x + cropBox.width / 2;
    const centerY = cropBox.y + cropBox.height / 2;
    
    if (currentRatio > cropRatio) {
        cropBox.height = cropBox.width / cropRatio;
    } else {
        cropBox.width = cropBox.height * cropRatio;
    }
    
    cropBox.x = centerX - cropBox.width / 2;
    cropBox.y = centerY - cropBox.height / 2;
    
    updateCropBoxUI();
}

// 开始绘制裁剪框
function startCropDraw(e) {
    if (e.target !== document.getElementById('cropOverlay')) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    cropStart = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    
    cropBox = {
        x: cropStart.x,
        y: cropStart.y,
        width: 0,
        height: 0
    };
    
    isCropping = true;
    
    document.addEventListener('mousemove', onCropDraw);
    document.addEventListener('mouseup', stopCrop);
}

// 绘制裁剪框
function onCropDraw(e) {
    if (!isCropping) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    cropBox.x = Math.min(cropStart.x, currentX);
    cropBox.y = Math.min(cropStart.y, currentY);
    cropBox.width = Math.abs(currentX - cropStart.x);
    cropBox.height = Math.abs(currentY - cropStart.y);
    
    // 保持比例
    if (cropRatio) {
        const currentRatio = cropBox.width / cropBox.height;
        if (currentRatio > cropRatio) {
            cropBox.height = cropBox.width / cropRatio;
        } else {
            cropBox.width = cropBox.height * cropRatio;
        }
    }
    
    updateCropBoxUI();
}

// 停止裁剪
function stopCrop() {
    isCropping = false;
    document.removeEventListener('mousemove', onCropDraw);
    document.removeEventListener('mouseup', stopCrop);
}

// 开始拖拽裁剪框
function startCropDrag(e) {
    if (e.target.classList.contains('crop-handle')) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    cropStart = {
        x: e.clientX - rect.left - cropBox.x,
        y: e.clientY - rect.top - cropBox.y
    };
    
    document.addEventListener('mousemove', onCropDrag);
    document.addEventListener('mouseup', stopCropDrag);
}

// 拖拽裁剪框
function onCropDrag(e) {
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    cropBox.x = e.clientX - rect.left - cropStart.x;
    cropBox.y = e.clientY - rect.top - cropStart.y;
    updateCropBoxUI();
}

// 停止拖拽
function stopCropDrag() {
    document.removeEventListener('mousemove', onCropDrag);
    document.removeEventListener('mouseup', stopCropDrag);
}

// 开始调整裁剪框大小
function startResizeCrop(e, position) {
    resizeHandle = position;
    cropStart = {
        x: e.clientX,
        y: e.clientY,
        origX: cropBox.x,
        origY: cropBox.y,
        origW: cropBox.width,
        origH: cropBox.height
    };
    
    document.addEventListener('mousemove', onResizeCrop);
    document.addEventListener('mouseup', stopResizeCrop);
}

// 调整裁剪框大小
function onResizeCrop(e) {
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    const deltaX = e.clientX - cropStart.x;
    const deltaY = e.clientY - cropStart.y;
    
    switch (resizeHandle) {
        case 'se':
            cropBox.width = Math.max(10, cropStart.origW + deltaX);
            cropBox.height = Math.max(10, cropStart.origH + deltaY);
            break;
        case 'sw':
            cropBox.x = cropStart.origX + deltaX;
            cropBox.width = Math.max(10, cropStart.origW - deltaX);
            cropBox.height = Math.max(10, cropStart.origH + deltaY);
            break;
        case 'ne':
            cropBox.y = cropStart.origY + deltaY;
            cropBox.width = Math.max(10, cropStart.origW + deltaX);
            cropBox.height = Math.max(10, cropStart.origH - deltaY);
            break;
        case 'nw':
            cropBox.x = cropStart.origX + deltaX;
            cropBox.y = cropStart.origY + deltaY;
            cropBox.width = Math.max(10, cropStart.origW - deltaX);
            cropBox.height = Math.max(10, cropStart.origH - deltaY);
            break;
        case 'n':
            cropBox.y = cropStart.origY + deltaY;
            cropBox.height = Math.max(10, cropStart.origH - deltaY);
            break;
        case 's':
            cropBox.height = Math.max(10, cropStart.origH + deltaY);
            break;
        case 'e':
            cropBox.width = Math.max(10, cropStart.origW + deltaX);
            break;
        case 'w':
            cropBox.x = cropStart.origX + deltaX;
            cropBox.width = Math.max(10, cropStart.origW - deltaX);
            break;
    }
    
    // 保持比例
    if (cropRatio) {
        const currentRatio = cropBox.width / cropBox.height;
        if (currentRatio > cropRatio) {
            cropBox.height = cropBox.width / cropRatio;
        } else {
            cropBox.width = cropBox.height * cropRatio;
        }
    }
    
    updateCropBoxUI();
}

// 停止调整
function stopResizeCrop() {
    resizeHandle = null;
    document.removeEventListener('mousemove', onResizeCrop);
    document.removeEventListener('mouseup', stopResizeCrop);
}

// 应用裁剪
function applyCrop() {
    if (cropBox.width < 10 || cropBox.height < 10) {
        alert('裁剪区域太小');
        return;
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropBox.width;
    tempCanvas.height = cropBox.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(editorCanvas, cropBox.x, cropBox.y, cropBox.width, cropBox.height, 0, 0, cropBox.width, cropBox.height);
    
    // 更新canvas和currentImage
    editorCanvas.width = cropBox.width;
    editorCanvas.height = cropBox.height;
    editorCtx.drawImage(tempCanvas, 0, 0);
    
    // 更新currentImage
    const img = new Image();
    img.onload = () => {
        currentImage = img;
        initCropBox();
    };
    img.src = tempCanvas.toDataURL();
}

// 初始化调整控制
function initAdjustControls() {
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    
    // 滑块事件
    brightnessSlider.addEventListener('input', (e) => {
        adjustSettings.brightness = parseInt(e.target.value);
        document.getElementById('brightnessValue').textContent = e.target.value;
        drawEditorImage();
    });
    
    contrastSlider.addEventListener('input', (e) => {
        adjustSettings.contrast = parseInt(e.target.value);
        document.getElementById('contrastValue').textContent = e.target.value;
        drawEditorImage();
    });
    
    saturationSlider.addEventListener('input', (e) => {
        adjustSettings.saturation = parseInt(e.target.value);
        document.getElementById('saturationValue').textContent = e.target.value;
        drawEditorImage();
    });
    
    // 效果按钮
    document.getElementById('grayscaleEffect').addEventListener('click', () => {
        adjustSettings.grayscale = !adjustSettings.grayscale;
        drawEditorImage();
    });
    
    document.getElementById('invertEffect').addEventListener('click', () => {
        adjustSettings.invert = !adjustSettings.invert;
        drawEditorImage();
    });
    
    document.getElementById('sepiaEffect').addEventListener('click', () => {
        adjustSettings.sepia = !adjustSettings.sepia;
        drawEditorImage();
    });
    
    // 旋转和翻转
    document.getElementById('rotateLeft').addEventListener('click', () => {
        adjustSettings.rotation = (adjustSettings.rotation - 90) % 360;
        // 交换宽高
        const temp = editorCanvas.width;
        editorCanvas.width = editorCanvas.height;
        editorCanvas.height = temp;
        drawEditorImage();
    });
    
    document.getElementById('rotateRight').addEventListener('click', () => {
        adjustSettings.rotation = (adjustSettings.rotation + 90) % 360;
        const temp = editorCanvas.width;
        editorCanvas.width = editorCanvas.height;
        editorCanvas.height = temp;
        drawEditorImage();
    });
    
    document.getElementById('flipHorizontal').addEventListener('click', () => {
        adjustSettings.flipH = !adjustSettings.flipH;
        drawEditorImage();
    });
    
    document.getElementById('flipVertical').addEventListener('click', () => {
        adjustSettings.flipV = !adjustSettings.flipV;
        drawEditorImage();
    });
    
    // 应用和重置
    document.getElementById('applyAdjust').addEventListener('click', applyAdjustments);
    document.getElementById('resetAdjust').addEventListener('click', resetAdjustSettings);
}

// 应用调整
function applyAdjustments() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = editorCanvas.width;
    tempCanvas.height = editorCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(editorCanvas, 0, 0);
    
    const img = new Image();
    img.onload = () => {
        currentImage = img;
        resetAdjustSettings();
        drawEditorImage();
    };
    img.src = tempCanvas.toDataURL();
}

// 重置调整设置
function resetAdjustSettings() {
    adjustSettings = {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        grayscale: false,
        invert: false,
        sepia: false,
        rotation: 0,
        flipH: false,
        flipV: false
    };
    
    document.getElementById('brightness').value = 0;
    document.getElementById('brightnessValue').textContent = '0';
    document.getElementById('contrast').value = 0;
    document.getElementById('contrastValue').textContent = '0';
    document.getElementById('saturation').value = 0;
    document.getElementById('saturationValue').textContent = '0';
    
    if (originalImage) {
        editorCanvas.width = originalImage.width;
        editorCanvas.height = originalImage.height;
        currentImage = originalImage;
        drawEditorImage();
    }
}

// 保存编辑
function saveImageEdit() {
    // 创建新的File对象
    editorCanvas.toBlob((blob) => {
        const fileName = imageSelectedFiles[currentEditIndex].file.name;
        const newFile = new File([blob], fileName, { type: 'image/png' });
        
        // 更新文件列表
        imageSelectedFiles[currentEditIndex].file = newFile;
        imageSelectedFiles[currentEditIndex].convertedBlob = blob;
        imageSelectedFiles[currentEditIndex].status = 'pending';
        
        // 更新文件列表UI
        updateImageFileList();
        
        document.getElementById('imageEditorWindow').classList.remove('active');
        showImageStatus('图片已编辑', 'success');
    }, 'image/png');
}

// 修改initEventListeners，添加编辑器初始化和编辑按钮启用
const originalInitEventListeners = initEventListeners;
initEventListeners = function() {
    originalInitEventListeners.call(this);
    initImageEditor();
};

// 修改updateImageFileList，启用编辑按钮
const originalUpdateImageFileList = updateImageFileList;
updateImageFileList = async function() {
    await originalUpdateImageFileList.call(this);
    document.getElementById('imageEditButton').disabled = imageSelectedFiles.length === 0;
};

// 独立图片编辑器相关变量
let editorSelectedFiles = [];
let editorEditedFiles = [];
let currentEditorIndex = 0;
let editorCanvas, editorCtx;
let editorOriginalImage = null;
let editorCurrentImage = null;
let editorIsCropping = false;
let editorCropBox = { x: 0, y: 0, width: 0, height: 0 };
let editorCropRatio = null;
let editorCropStart = null;
let editorResizeHandle = null;
let editorAdjustSettings = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    grayscale: false,
    invert: false,
    sepia: false,
    rotation: 0,
    flipH: false,
    flipV: false
};

// 初始化独立图片编辑器
function initStandaloneImageEditor() {
    const imageEditorIcon = document.getElementById('imageEditorIcon');
    const imageEditorWindow = document.getElementById('imageEditorWindow');
    const imageEditorCloseButton = document.getElementById('imageEditorCloseButton');
    const imageEditorMinButton = document.getElementById('imageEditorMinButton');
    const editorUploadArea = document.getElementById('editorUploadArea');
    const editorFileInput = document.getElementById('editorFileInput');
    const openEditorButton = document.getElementById('openEditorButton');
    const editorDownloadButton = document.getElementById('editorDownloadButton');
    const editorResetButton = document.getElementById('editorResetButton');
    const editorWorkWindow = document.getElementById('editorWorkWindow');
    const editorWorkCloseButton = document.getElementById('editorWorkCloseButton');
    const editorWorkMinButton = document.getElementById('editorWorkMinButton');
    const saveEditorButton = document.getElementById('saveEditor');
    const cancelEditorButton = document.getElementById('cancelEditor');
    
    // 初始化canvas
    editorCanvas = document.getElementById('editorCanvas');
    editorCtx = editorCanvas.getContext('2d');
    
    // 图片编辑器窗口控制
    imageEditorIcon.addEventListener('click', () => {
        imageEditorWindow.classList.add('active');
    });

    imageEditorCloseButton.addEventListener('click', () => {
        imageEditorWindow.classList.remove('active');
    });

    imageEditorMinButton.addEventListener('click', () => {
        imageEditorWindow.classList.remove('active');
    });
    
    // 编辑工作区窗口控制
    editorWorkCloseButton.addEventListener('click', () => {
        editorWorkWindow.classList.remove('active');
    });

    editorWorkMinButton.addEventListener('click', () => {
        editorWorkWindow.classList.remove('active');
    });
    
    // 上传事件
    editorUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        editorUploadArea.style.borderColor = '#000080';
    });

    editorUploadArea.addEventListener('dragleave', () => {
        editorUploadArea.style.borderColor = '#808080';
    });

    editorUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        editorUploadArea.style.borderColor = '#808080';
        if (e.dataTransfer.files.length > 0) {
            handleEditorFiles(Array.from(e.dataTransfer.files));
        }
    });

    editorUploadArea.addEventListener('click', () => {
        editorFileInput.click();
    });

    editorFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleEditorFiles(Array.from(e.target.files));
        }
    });
    
    // 按钮事件
    openEditorButton.addEventListener('click', () => {
        if (editorSelectedFiles.length === 0) {
            showEditorStatus('请先选择图片', 'error');
            return;
        }
        currentEditorIndex = 0;
        openStandaloneEditor();
    });
    
    editorDownloadButton.addEventListener('click', downloadAllEditorImages);
    editorResetButton.addEventListener('click', resetEditorForm);
    
    // 保存和取消
    saveEditorButton.addEventListener('click', saveStandaloneImageEdit);
    cancelEditorButton.addEventListener('click', () => {
        editorWorkWindow.classList.remove('active');
    });
    
    // 初始化标签页
    initStandaloneEditorTabs();
    
    // 初始化裁剪功能
    initStandaloneCropControls();
    
    // 初始化调整功能
    initStandaloneAdjustControls();
}

// 处理编辑器文件
function handleEditorFiles(files) {
    // 过滤出有效的图片文件和HEIC文件
    const validFiles = files.filter(file => {
        const fileName = file.name.toLowerCase();
        return file.type.startsWith('image/') || fileName.endsWith('.heic');
    });
    
    if (validFiles.length === 0) {
        showEditorStatus('请选择有效的图片文件', 'error');
        return;
    }

    validFiles.forEach(file => {
        if (!editorSelectedFiles.some(f => f.name === file.name)) {
            editorSelectedFiles.push({
                file: file,
                id: Date.now() + Math.random(),
                status: 'pending',
                editedBlob: null
            });
        }
    });

    updateEditorFileList();
    showEditorStatus(`已加载 ${validFiles.length} 张图片，共 ${editorSelectedFiles.length} 张`, 'success');
}

// 更新编辑器文件列表
async function updateEditorFileList() {
    const editorFileList = document.getElementById('editorFileList');
    editorFileList.innerHTML = '';
    
    for (const item of editorSelectedFiles) {
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
            fileStatus.textContent = '待编辑';
        } else if (item.status === 'edited') {
            fileStatus.className = 'file-status success';
            fileStatus.textContent = '编辑完成';
        }

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeEditorFile(item.id));

        fileItem.appendChild(preview);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);

        editorFileList.appendChild(fileItem);
    }

    const openEditorButton = document.getElementById('openEditorButton');
    const editorDownloadButton = document.getElementById('editorDownloadButton');
    
    openEditorButton.disabled = editorSelectedFiles.length === 0;
    editorDownloadButton.disabled = editorEditedFiles.length === 0;
    
    // 显示或隐藏上传图标和文本
    const editorUploadIcon = document.getElementById('editorUploadIcon');
    const editorUploadText = document.getElementById('editorUploadText');
    if (editorSelectedFiles.length > 0) {
        editorUploadIcon.style.opacity = '0';
        editorUploadText.style.opacity = '0';
        setTimeout(() => {
            editorUploadIcon.style.display = 'none';
            editorUploadText.style.display = 'none';
        }, 500);
    } else {
        editorUploadIcon.style.display = 'block';
        editorUploadText.style.display = 'block';
        setTimeout(() => {
            editorUploadIcon.style.opacity = '1';
            editorUploadText.style.opacity = '1';
        }, 100);
    }
}

// 移除编辑器文件
function removeEditorFile(id) {
    editorSelectedFiles = editorSelectedFiles.filter(item => item.id !== id);
    editorEditedFiles = editorEditedFiles.filter(item => item.id !== id);
    updateEditorFileList();
    showEditorStatus('文件已移除', 'info');
}

// 重置编辑器表单
function resetEditorForm() {
    editorSelectedFiles = [];
    editorEditedFiles = [];
    updateEditorFileList();
    showEditorStatus('就绪', 'info');
}

// 显示编辑器状态
function showEditorStatus(message, type = 'info') {
    const editorStatus = document.getElementById('editorStatus');
    editorStatus.textContent = message;
    if (type === 'error') {
        editorStatus.style.color = '#ff0000';
    } else if (type === 'success') {
        editorStatus.style.color = '#008000';
    } else {
        editorStatus.style.color = '#000080';
    }
}

// 下载所有编辑后的图片
function downloadAllEditorImages() {
    if (editorEditedFiles.length === 0) {
        showEditorStatus('没有可下载的文件', 'error');
        return;
    }
    
    editorEditedFiles.forEach(item => {
        const fileName = item.file.name.replace(/\.[^/.]+$/, '') + '_edited.png';
        const url = URL.createObjectURL(item.editedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    showEditorStatus(`已下载 ${editorEditedFiles.length} 张图片`, 'success');
}

// 打开独立编辑器
function openStandaloneEditor() {
    const file = editorSelectedFiles[currentEditorIndex];
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
        editorOriginalImage = img;
        editorCurrentImage = img;
        
        // 设置canvas尺寸
        editorCanvas.width = img.width;
        editorCanvas.height = img.height;
        
        // 重置调整设置
        resetStandaloneAdjustSettings();
        
        // 绘制图片
        drawStandaloneEditorImage();
        
        // 初始化裁剪框
        initStandaloneCropBox();
        
        document.getElementById('editorWorkWindow').classList.add('active');
    };
    
    img.src = URL.createObjectURL(file.file);
}

// 绘制编辑器图片
function drawStandaloneEditorImage() {
    if (!editorCurrentImage) return;
    
    // 保存当前状态
    editorCtx.save();
    
    // 清空canvas
    editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
    
    // 应用变换
    const centerX = editorCanvas.width / 2;
    const centerY = editorCanvas.height / 2;
    
    editorCtx.translate(centerX, centerY);
    
    // 应用旋转
    editorCtx.rotate((editorAdjustSettings.rotation * Math.PI) / 180);
    
    // 应用翻转
    editorCtx.scale(editorAdjustSettings.flipH ? -1 : 1, editorAdjustSettings.flipV ? -1 : 1);
    
    // 绘制图片
    editorCtx.drawImage(editorCurrentImage, -editorCurrentImage.width / 2, -editorCurrentImage.height / 2);
    
    // 恢复状态
    editorCtx.restore();
    
    // 应用滤镜
    applyStandaloneFilters();
}

// 应用滤镜
function applyStandaloneFilters() {
    let filterString = '';
    
    if (editorAdjustSettings.brightness !== 0) {
        filterString += `brightness(${100 + editorAdjustSettings.brightness}%) `;
    }
    
    if (editorAdjustSettings.contrast !== 0) {
        filterString += `contrast(${100 + editorAdjustSettings.contrast}%) `;
    }
    
    if (editorAdjustSettings.saturation !== 0) {
        filterString += `saturate(${100 + editorAdjustSettings.saturation}%) `;
    }
    
    if (editorAdjustSettings.grayscale) {
        filterString += 'grayscale(100%) ';
    }
    
    if (editorAdjustSettings.invert) {
        filterString += 'invert(100%) ';
    }
    
    if (editorAdjustSettings.sepia) {
        filterString += 'sepia(100%) ';
    }
    
    if (filterString) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = editorCanvas.width;
        tempCanvas.height = editorCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.filter = filterString.trim();
        tempCtx.drawImage(editorCanvas, 0, 0);
        
        editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
        editorCtx.drawImage(tempCanvas, 0, 0);
    }
}

// 初始化标签页
function initStandaloneEditorTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tabName}Panel`).classList.add('active');
            
            if (tabName === 'crop') {
                document.getElementById('cropOverlay').style.display = 'block';
            } else {
                document.getElementById('cropOverlay').style.display = 'none';
            }
        });
    });
}

// 初始化裁剪框
function initStandaloneCropBox() {
    editorCropBox = {
        x: editorCanvas.width * 0.1,
        y: editorCanvas.height * 0.1,
        width: editorCanvas.width * 0.8,
        height: editorCanvas.height * 0.8
    };
    updateStandaloneCropBoxUI();
}

// 更新裁剪框UI
function updateStandaloneCropBoxUI() {
    const cropBoxElement = document.getElementById('cropBox');
    cropBoxElement.innerHTML = '';
    
    cropBoxElement.style.left = `${editorCropBox.x}px`;
    cropBoxElement.style.top = `${editorCropBox.y}px`;
    cropBoxElement.style.width = `${editorCropBox.width}px`;
    cropBoxElement.style.height = `${editorCropBox.height}px`;
    
    // 添加调整手柄
    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    handles.forEach(pos => {
        const handle = document.createElement('div');
        handle.className = `crop-handle ${pos}`;
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            startStandaloneResizeCrop(e, pos);
        });
        cropBoxElement.appendChild(handle);
    });
}

// 初始化裁剪控制
function initStandaloneCropControls() {
    const cropOverlay = document.getElementById('cropOverlay');
    const cropBoxElement = document.getElementById('cropBox');
    const cropRatioSelect = document.getElementById('cropRatio');
    const cropPresetSelect = document.getElementById('cropPreset');
    const applyCropBtn = document.getElementById('applyCrop');
    const resetCropBtn = document.getElementById('resetCrop');
    
    // 裁剪比例变化
    cropRatioSelect.addEventListener('change', () => {
        const ratio = cropRatioSelect.value;
        if (ratio === 'free') {
            editorCropRatio = null;
        } else {
            const [w, h] = ratio.split(':').map(Number);
            editorCropRatio = w / h;
        }
        updateStandaloneCropBoxFromRatio();
    });
    
    // 裁剪预设变化
    cropPresetSelect.addEventListener('change', () => {
        const preset = cropPresetSelect.value;
        if (preset !== 'none') {
            const cropPresets = {
                'a4-portrait': { ratio: 210/297 },
                'a4-landscape': { ratio: 297/210 },
                'a3-portrait': { ratio: 297/420 },
                'a3-landscape': { ratio: 420/297 },
                'id-1inch': { ratio: 25/35 },
                'id-2inch': { ratio: 35/49 },
                'instagram': { ratio: 1 },
                'cover-facebook': { ratio: 820/312 },
                'cover-twitter': { ratio: 1500/500 }
            };
            if (cropPresets[preset]) {
                editorCropRatio = cropPresets[preset].ratio;
                cropRatioSelect.value = 'free';
                updateStandaloneCropBoxFromRatio();
            }
        }
    });
    
    // 应用裁剪
    applyCropBtn.addEventListener('click', applyStandaloneCrop);
    
    // 重置裁剪
    resetCropBtn.addEventListener('click', () => {
        initStandaloneCropBox();
    });
    
    // 裁剪框拖拽
    cropBoxElement.addEventListener('mousedown', startStandaloneCropDrag);
    cropOverlay.addEventListener('mousedown', startStandaloneCropDraw);
}

// 根据比例更新裁剪框
function updateStandaloneCropBoxFromRatio() {
    if (!editorCropRatio) return;
    
    const currentRatio = editorCropBox.width / editorCropBox.height;
    const centerX = editorCropBox.x + editorCropBox.width / 2;
    const centerY = editorCropBox.y + editorCropBox.height / 2;
    
    if (currentRatio > editorCropRatio) {
        editorCropBox.height = editorCropBox.width / editorCropRatio;
    } else {
        editorCropBox.width = editorCropBox.height * editorCropRatio;
    }
    
    editorCropBox.x = centerX - editorCropBox.width / 2;
    editorCropBox.y = centerY - editorCropBox.height / 2;
    
    updateStandaloneCropBoxUI();
}

// 开始绘制裁剪框
function startStandaloneCropDraw(e) {
    if (e.target !== document.getElementById('cropOverlay')) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    editorCropStart = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    
    editorCropBox = {
        x: editorCropStart.x,
        y: editorCropStart.y,
        width: 0,
        height: 0
    };
    
    editorIsCropping = true;
    
    document.addEventListener('mousemove', onStandaloneCropDraw);
    document.addEventListener('mouseup', stopStandaloneCrop);
}

// 绘制裁剪框
function onStandaloneCropDraw(e) {
    if (!editorIsCropping) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    editorCropBox.x = Math.min(editorCropStart.x, currentX);
    editorCropBox.y = Math.min(editorCropStart.y, currentY);
    editorCropBox.width = Math.abs(currentX - editorCropStart.x);
    editorCropBox.height = Math.abs(currentY - editorCropStart.y);
    
    // 保持比例
    if (editorCropRatio) {
        const currentRatio = editorCropBox.width / editorCropBox.height;
        if (currentRatio > editorCropRatio) {
            editorCropBox.height = editorCropBox.width / editorCropRatio;
        } else {
            editorCropBox.width = editorCropBox.height * editorCropRatio;
        }
    }
    
    updateStandaloneCropBoxUI();
}

// 停止裁剪
function stopStandaloneCrop() {
    editorIsCropping = false;
    document.removeEventListener('mousemove', onStandaloneCropDraw);
    document.removeEventListener('mouseup', stopStandaloneCrop);
}

// 开始拖拽裁剪框
function startStandaloneCropDrag(e) {
    if (e.target.classList.contains('crop-handle')) return;
    
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    editorCropStart = {
        x: e.clientX - rect.left - editorCropBox.x,
        y: e.clientY - rect.top - editorCropBox.y
    };
    
    document.addEventListener('mousemove', onStandaloneCropDrag);
    document.addEventListener('mouseup', stopStandaloneCropDrag);
}

// 拖拽裁剪框
function onStandaloneCropDrag(e) {
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    editorCropBox.x = e.clientX - rect.left - editorCropStart.x;
    editorCropBox.y = e.clientY - rect.top - editorCropStart.y;
    updateStandaloneCropBoxUI();
}

// 停止拖拽
function stopStandaloneCropDrag() {
    document.removeEventListener('mousemove', onStandaloneCropDrag);
    document.removeEventListener('mouseup', stopStandaloneCropDrag);
}

// 开始调整裁剪框大小
function startStandaloneResizeCrop(e, position) {
    editorResizeHandle = position;
    editorCropStart = {
        x: e.clientX,
        y: e.clientY,
        origX: editorCropBox.x,
        origY: editorCropBox.y,
        origW: editorCropBox.width,
        origH: editorCropBox.height
    };
    
    document.addEventListener('mousemove', onStandaloneResizeCrop);
    document.addEventListener('mouseup', stopStandaloneResizeCrop);
}

// 调整裁剪框大小
function onStandaloneResizeCrop(e) {
    const rect = document.getElementById('cropOverlay').getBoundingClientRect();
    const deltaX = e.clientX - editorCropStart.x;
    const deltaY = e.clientY - editorCropStart.y;
    
    switch (editorResizeHandle) {
        case 'se':
            editorCropBox.width = Math.max(10, editorCropStart.origW + deltaX);
            editorCropBox.height = Math.max(10, editorCropStart.origH + deltaY);
            break;
        case 'sw':
            editorCropBox.x = editorCropStart.origX + deltaX;
            editorCropBox.width = Math.max(10, editorCropStart.origW - deltaX);
            editorCropBox.height = Math.max(10, editorCropStart.origH + deltaY);
            break;
        case 'ne':
            editorCropBox.y = editorCropStart.origY + deltaY;
            editorCropBox.width = Math.max(10, editorCropStart.origW + deltaX);
            editorCropBox.height = Math.max(10, editorCropStart.origH - deltaY);
            break;
        case 'nw':
            editorCropBox.x = editorCropStart.origX + deltaX;
            editorCropBox.y = editorCropStart.origY + deltaY;
            editorCropBox.width = Math.max(10, editorCropStart.origW - deltaX);
            editorCropBox.height = Math.max(10, editorCropStart.origH - deltaY);
            break;
        case 'n':
            editorCropBox.y = editorCropStart.origY + deltaY;
            editorCropBox.height = Math.max(10, editorCropStart.origH - deltaY);
            break;
        case 's':
            editorCropBox.height = Math.max(10, editorCropStart.origH + deltaY);
            break;
        case 'e':
            editorCropBox.width = Math.max(10, editorCropStart.origW + deltaX);
            break;
        case 'w':
            editorCropBox.x = editorCropStart.origX + deltaX;
            editorCropBox.width = Math.max(10, editorCropStart.origW - deltaX);
            break;
    }
    
    // 保持比例
    if (editorCropRatio) {
        const currentRatio = editorCropBox.width / editorCropBox.height;
        if (currentRatio > editorCropRatio) {
            editorCropBox.height = editorCropBox.width / editorCropRatio;
        } else {
            editorCropBox.width = editorCropBox.height * editorCropRatio;
        }
    }
    
    updateStandaloneCropBoxUI();
}

// 停止调整
function stopStandaloneResizeCrop() {
    editorResizeHandle = null;
    document.removeEventListener('mousemove', onStandaloneResizeCrop);
    document.removeEventListener('mouseup', stopStandaloneResizeCrop);
}

// 应用裁剪
function applyStandaloneCrop() {
    if (editorCropBox.width < 10 || editorCropBox.height < 10) {
        alert('裁剪区域太小');
        return;
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = editorCropBox.width;
    tempCanvas.height = editorCropBox.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(editorCanvas, editorCropBox.x, editorCropBox.y, editorCropBox.width, editorCropBox.height, 0, 0, editorCropBox.width, editorCropBox.height);
    
    // 更新canvas和currentImage
    editorCanvas.width = editorCropBox.width;
    editorCanvas.height = editorCropBox.height;
    editorCtx.drawImage(tempCanvas, 0, 0);
    
    // 更新currentImage
    const img = new Image();
    img.onload = () => {
        editorCurrentImage = img;
        initStandaloneCropBox();
    };
    img.src = tempCanvas.toDataURL();
}

// 初始化调整控制
function initStandaloneAdjustControls() {
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    
    // 滑块事件
    brightnessSlider.addEventListener('input', (e) => {
        editorAdjustSettings.brightness = parseInt(e.target.value);
        document.getElementById('brightnessValue').textContent = e.target.value;
        drawStandaloneEditorImage();
    });
    
    contrastSlider.addEventListener('input', (e) => {
        editorAdjustSettings.contrast = parseInt(e.target.value);
        document.getElementById('contrastValue').textContent = e.target.value;
        drawStandaloneEditorImage();
    });
    
    saturationSlider.addEventListener('input', (e) => {
        editorAdjustSettings.saturation = parseInt(e.target.value);
        document.getElementById('saturationValue').textContent = e.target.value;
        drawStandaloneEditorImage();
    });
    
    // 效果按钮
    document.getElementById('grayscaleEffect').addEventListener('click', () => {
        editorAdjustSettings.grayscale = !editorAdjustSettings.grayscale;
        drawStandaloneEditorImage();
    });
    
    document.getElementById('invertEffect').addEventListener('click', () => {
        editorAdjustSettings.invert = !editorAdjustSettings.invert;
        drawStandaloneEditorImage();
    });
    
    document.getElementById('sepiaEffect').addEventListener('click', () => {
        editorAdjustSettings.sepia = !editorAdjustSettings.sepia;
        drawStandaloneEditorImage();
    });
    
    // 旋转和翻转
    document.getElementById('rotateLeft').addEventListener('click', () => {
        editorAdjustSettings.rotation = (editorAdjustSettings.rotation - 90) % 360;
        // 交换宽高
        const temp = editorCanvas.width;
        editorCanvas.width = editorCanvas.height;
        editorCanvas.height = temp;
        drawStandaloneEditorImage();
    });
    
    document.getElementById('rotateRight').addEventListener('click', () => {
        editorAdjustSettings.rotation = (editorAdjustSettings.rotation + 90) % 360;
        const temp = editorCanvas.width;
        editorCanvas.width = editorCanvas.height;
        editorCanvas.height = temp;
        drawStandaloneEditorImage();
    });
    
    document.getElementById('flipHorizontal').addEventListener('click', () => {
        editorAdjustSettings.flipH = !editorAdjustSettings.flipH;
        drawStandaloneEditorImage();
    });
    
    document.getElementById('flipVertical').addEventListener('click', () => {
        editorAdjustSettings.flipV = !editorAdjustSettings.flipV;
        drawStandaloneEditorImage();
    });
    
    // 应用和重置
    document.getElementById('applyAdjust').addEventListener('click', applyStandaloneAdjustments);
    document.getElementById('resetAdjust').addEventListener('click', resetStandaloneAdjustSettings);
}

// 应用调整
function applyStandaloneAdjustments() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = editorCanvas.width;
    tempCanvas.height = editorCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(editorCanvas, 0, 0);
    
    const img = new Image();
    img.onload = () => {
        editorCurrentImage = img;
        resetStandaloneAdjustSettings();
        drawStandaloneEditorImage();
    };
    img.src = tempCanvas.toDataURL();
}

// 重置调整设置
function resetStandaloneAdjustSettings() {
    editorAdjustSettings.brightness = 0;
    editorAdjustSettings.contrast = 0;
    editorAdjustSettings.saturation = 0;
    editorAdjustSettings.grayscale = false;
    editorAdjustSettings.invert = false;
    editorAdjustSettings.sepia = false;
    editorAdjustSettings.rotation = 0;
    editorAdjustSettings.flipH = false;
    editorAdjustSettings.flipV = false;
    
    document.getElementById('brightness').value = 0;
    document.getElementById('brightnessValue').textContent = '0';
    document.getElementById('contrast').value = 0;
    document.getElementById('contrastValue').textContent = '0';
    document.getElementById('saturation').value = 0;
    document.getElementById('saturationValue').textContent = '0';
    
    if (editorOriginalImage) {
        editorCanvas.width = editorOriginalImage.width;
        editorCanvas.height = editorOriginalImage.height;
        editorCurrentImage = editorOriginalImage;
        drawStandaloneEditorImage();
    }
}

// 保存编辑
function saveStandaloneImageEdit() {
    // 创建新的File对象
    editorCanvas.toBlob((blob) => {
        const fileName = editorSelectedFiles[currentEditorIndex].file.name;
        const newFile = new File([blob], fileName, { type: 'image/png' });
        
        // 更新文件列表
        editorSelectedFiles[currentEditorIndex].file = newFile;
        editorSelectedFiles[currentEditorIndex].editedBlob = blob;
        editorSelectedFiles[currentEditorIndex].status = 'edited';
        
        // 添加到已编辑文件列表
        if (!editorEditedFiles.some(item => item.id === editorSelectedFiles[currentEditorIndex].id)) {
            editorEditedFiles.push(editorSelectedFiles[currentEditorIndex]);
        }
        
        // 更新文件列表UI
        updateEditorFileList();
        
        document.getElementById('editorWorkWindow').classList.remove('active');
        showEditorStatus('图片已编辑', 'success');
    }, 'image/png');
}

// 修改 init 函数，添加独立图片编辑器初始化
const originalInit = init;
init = function() {
    originalInit.call(this);
    initStandaloneImageEditor();
};