// 视频转换器相关变量
let videoSelectedFiles = [];
let videoConvertedFiles = [];
let videoIsConverting = false;

// 音频转换器相关变量
let audioSelectedFiles = [];
let audioConvertedFiles = [];
let audioIsConverting = false;

// 图片编辑器相关变量
let editorSelectedFiles = [];
let editorEditedFiles = [];
let currentEditorIndex = 0;
let standaloneEditorCanvas, standaloneEditorCtx;
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

// DOM 元素
let videoConverterIcon, videoConverterWindow, videoCloseButton, videoMinimizeButton, videoUploadArea, videoUploadIcon, videoUploadText, videoFileInput, videoFileList, videoTargetFormat, videoConvertButton, videoDownloadButton, videoResetButton, videoStatus, videoProgressContainer, videoProgressBar;
let audioConverterIcon, audioConverterWindow, audioCloseButton, audioMinimizeButton, audioUploadArea, audioUploadIcon, audioUploadText, audioFileInput, audioFileList, audioTargetFormat, audioConvertButton, audioDownloadButton, audioResetButton, audioStatus, audioProgressContainer, audioProgressBar;
let imageEditorIcon, imageEditorWindow, imageEditorCloseButton, imageEditorMinimizeButton;
let colorToolIcon, colorToolWindow, colorToolCloseButton, colorToolMinimizeButton;

// 窗口控制
function initWindowControls() {
    // 视频转换器窗口控制
    if (videoConverterIcon && videoConverterWindow) {
        videoConverterIcon.addEventListener('click', () => {
            videoConverterWindow.classList.add('active');
            videoConverterWindow.classList.remove('minimized');
            bringWindowToFront(videoConverterWindow);
        });
    }

    if (videoCloseButton && videoConverterWindow) {
        videoCloseButton.addEventListener('click', () => {
            if (!videoIsConverting) {
                videoConverterWindow.classList.remove('active');
                videoConverterWindow.classList.remove('minimized');
            }
        });
    }

    if (videoMinimizeButton && videoConverterWindow) {
        videoMinimizeButton.addEventListener('click', () => {
            if (!videoIsConverting) {
                videoConverterWindow.classList.remove('active');
                videoConverterWindow.classList.add('minimized');
            }
        });
    }

    // 音频转换器窗口控制
    if (audioConverterIcon && audioConverterWindow) {
        audioConverterIcon.addEventListener('click', () => {
            audioConverterWindow.classList.add('active');
            audioConverterWindow.classList.remove('minimized');
            bringWindowToFront(audioConverterWindow);
        });
    }

    if (audioCloseButton && audioConverterWindow) {
        audioCloseButton.addEventListener('click', () => {
            if (!audioIsConverting) {
                audioConverterWindow.classList.remove('active');
                audioConverterWindow.classList.remove('minimized');
            }
        });
    }

    if (audioMinimizeButton && audioConverterWindow) {
        audioMinimizeButton.addEventListener('click', () => {
            if (!audioIsConverting) {
                audioConverterWindow.classList.remove('active');
                audioConverterWindow.classList.add('minimized');
            }
        });
    }

    // 添加窗口拖动功能
    const windows = [];
    
    if (videoConverterWindow) {
        windows.push({ 
            window: videoConverterWindow, 
            titlebar: videoConverterWindow.querySelector('.window-titlebar'), 
            name: '视频格式转换器' 
        });
    }
    
    if (audioConverterWindow) {
        windows.push({ 
            window: audioConverterWindow, 
            titlebar: audioConverterWindow.querySelector('.window-titlebar'), 
            name: '音频格式转换器' 
        });
    }
    
    if (colorToolWindow) {
        windows.push({ 
            window: colorToolWindow, 
            titlebar: colorToolWindow.querySelector('.window-titlebar'), 
            name: '配色工具' 
        });
    }

    // 初始化任务栏标签功能
    initTaskbarLabels(windows);

    windows.forEach(({ window, titlebar }) => {
        if (titlebar) {
            let isDragging = false;
            let startX, startY, initialLeft, initialTop;

            titlebar.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                
                // 获取当前窗口的实际位置
                const rect = window.getBoundingClientRect();
                initialLeft = rect.left;
                initialTop = rect.top;
                
                // 确保当前窗口在最前面
                bringWindowToFront(window);
                window.style.transform = 'none'; // 移除transform以使用left和top定位
                window.style.left = `${initialLeft}px`;
                window.style.top = `${initialTop}px`;
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                window.style.left = `${initialLeft + deltaX}px`;
                window.style.top = `${initialTop + deltaY}px`;
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    });
}

// 初始化事件监听
function initEventListeners() {
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
        if (!videoIsConverting && videoSelectedFiles.length === 0) {
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
        if (!audioIsConverting && audioSelectedFiles.length === 0) {
            audioFileInput.click();
        }
    });

    audioFileInput.addEventListener('change', handleAudioFileSelect);

    // 视频按钮事件
    videoConvertButton.addEventListener('click', convertAllVideos);
    videoDownloadButton.addEventListener('click', downloadAllVideos);
    videoResetButton.addEventListener('click', resetVideoForm);

    // 音频按钮事件
    audioConvertButton.addEventListener('click', convertAllAudios);
    audioDownloadButton.addEventListener('click', downloadAllAudios);
    audioResetButton.addEventListener('click', resetAudioForm);
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
        // 延迟移除链接和撤销URL对象，确保下载完成
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
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
        // 延迟移除链接和撤销URL对象，确保下载完成
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
    
    showAudioStatus(`已下载 ${audioConvertedFiles.length} 个音频`, 'success');
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
    console.log('Initializing application...');
    // 初始化DOM元素引用
    initDOMElements();
    console.log('DOMElements initialized:', {
        videoConverterIcon: !!videoConverterIcon,
        audioConverterIcon: !!audioConverterIcon,
        imageEditorIcon: !!imageEditorIcon,
        colorToolIcon: !!colorToolIcon,
        colorToolWindow: !!colorToolWindow
    });
    drawDesktopBackground();
    initWindowControls();
    initColorToolEvents();
    initStandaloneImageEditor();
    initEventListeners();
    console.log('Application initialization complete!');
}

// 初始化DOM元素引用
function initDOMElements() {
    // 视频转换器元素
    videoConverterIcon = document.getElementById('videoConverterIcon');
    videoConverterWindow = document.getElementById('videoConverterWindow');
    videoCloseButton = document.getElementById('videoCloseButton');
    videoMinimizeButton = document.getElementById('videoMinimizeButton');
    videoUploadArea = document.getElementById('videoUploadArea');
    videoUploadIcon = document.getElementById('videoUploadIcon');
    videoUploadText = document.getElementById('videoUploadText');
    videoFileInput = document.getElementById('videoFileInput');
    videoFileList = document.getElementById('videoFileList');
    videoTargetFormat = document.getElementById('videoTargetFormat');
    videoConvertButton = document.getElementById('videoConvertButton');
    videoDownloadButton = document.getElementById('videoDownloadButton');
    videoResetButton = document.getElementById('videoResetButton');
    videoStatus = document.getElementById('videoStatus');
    videoProgressContainer = document.getElementById('videoProgressContainer');
    videoProgressBar = document.getElementById('videoProgressBar');

    // 音频转换器元素
    audioConverterIcon = document.getElementById('audioConverterIcon');
    audioConverterWindow = document.getElementById('audioConverterWindow');
    audioCloseButton = document.getElementById('audioCloseButton');
    audioMinimizeButton = document.getElementById('audioMinimizeButton');
    audioUploadArea = document.getElementById('audioUploadArea');
    audioUploadIcon = document.getElementById('audioUploadIcon');
    audioUploadText = document.getElementById('audioUploadText');
    audioFileInput = document.getElementById('audioFileInput');
    audioFileList = document.getElementById('audioFileList');
    audioTargetFormat = document.getElementById('audioTargetFormat');
    audioConvertButton = document.getElementById('audioConvertButton');
    audioDownloadButton = document.getElementById('audioDownloadButton');
    audioResetButton = document.getElementById('audioResetButton');
    audioStatus = document.getElementById('audioStatus');
    audioProgressContainer = document.getElementById('audioProgressContainer');
    audioProgressBar = document.getElementById('audioProgressBar');

    // 图片编辑器元素
    imageEditorIcon = document.getElementById('imageEditorIcon');
    imageEditorWindow = document.getElementById('imageEditorWindow');
    imageEditorCloseButton = document.getElementById('imageEditorCloseButton');
    imageEditorMinimizeButton = document.getElementById('imageEditorMinButton');

    // 配色工具元素
    colorToolIcon = document.getElementById('colorToolIcon');
    colorToolWindow = document.getElementById('colorToolWindow');
    colorToolCloseButton = document.getElementById('colorToolCloseButton');
    colorToolMinimizeButton = document.getElementById('colorToolMinimizeButton');
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

// 启动时钟更新
setInterval(updateClock, 60000);
updateClock();

// 图片编辑器功能
function generateImagePreview(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 60;
                canvas.height = 60;
                
                const scale = Math.min(60 / img.width, 60 / img.height);
                const x = (60 - img.width * scale) / 2;
                const y = (60 - img.height * scale) / 2;
                
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                resolve(canvas.toDataURL());
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function initStandaloneImageEditor() {
    const imageEditorIconEl = document.getElementById('imageEditorIcon');
    const imageEditorWindowEl = document.getElementById('imageEditorWindow');
    const imageEditorCloseButtonEl = document.getElementById('imageEditorCloseButton');
    const imageEditorMinButtonEl = document.getElementById('imageEditorMinButton');
    const editorUploadAreaEl = document.getElementById('editorUploadArea');
    const editorFileInputEl = document.getElementById('editorFileInput');
    const openEditorButtonEl = document.getElementById('openEditorButton');
    const editorDownloadButtonEl = document.getElementById('editorDownloadButton');
    const editorResetButtonEl = document.getElementById('editorResetButton');
    const editorWorkWindowEl = document.getElementById('editorWorkWindow');
    const editorWorkCloseButtonEl = document.getElementById('editorWorkCloseButton');
    const editorWorkMinButtonEl = document.getElementById('editorWorkMinButton');
    const saveEditorButtonEl = document.getElementById('saveEditor');
    const cancelEditorButtonEl = document.getElementById('cancelEditor');
    
    // 初始化canvas
    standaloneEditorCanvas = document.getElementById('editorCanvas');
    standaloneEditorCtx = standaloneEditorCanvas.getContext('2d');
    
    // 添加快捷键支持
    addEditorKeyboardShortcuts();
    
    // 图片编辑器窗口控制
    if (imageEditorIconEl && imageEditorWindowEl) {
        imageEditorIconEl.addEventListener('click', () => {
            imageEditorWindowEl.classList.add('active');
            bringWindowToFront(imageEditorWindowEl);
        });
    }

    if (imageEditorCloseButtonEl && imageEditorWindowEl) {
        imageEditorCloseButtonEl.addEventListener('click', () => {
            imageEditorWindowEl.classList.remove('active');
        });
    }

    if (imageEditorMinButtonEl && imageEditorWindowEl) {
        imageEditorMinButtonEl.addEventListener('click', () => {
            imageEditorWindowEl.classList.remove('active');
        });
    }
    
    // 编辑工作区窗口控制
    if (editorWorkCloseButtonEl && editorWorkWindowEl) {
        editorWorkCloseButtonEl.addEventListener('click', () => {
            editorWorkWindowEl.classList.remove('active');
        });
    }

    if (editorWorkMinButtonEl && editorWorkWindowEl) {
        editorWorkMinButtonEl.addEventListener('click', () => {
            editorWorkWindowEl.classList.remove('active');
        });
    }
    
    // 上传事件
    if (editorUploadAreaEl) {
        editorUploadAreaEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            editorUploadAreaEl.style.borderColor = '#000080';
        });

        editorUploadAreaEl.addEventListener('dragleave', () => {
            editorUploadAreaEl.style.borderColor = '#808080';
        });

        editorUploadAreaEl.addEventListener('drop', (e) => {
            e.preventDefault();
            editorUploadAreaEl.style.borderColor = '#808080';
            if (e.dataTransfer.files.length > 0) {
                const files = Array.from(e.dataTransfer.files);
                handleEditorFilesAndOpen(files);
            }
        });

        editorUploadAreaEl.addEventListener('click', () => {
            if (editorFileInputEl) editorFileInputEl.click();
        });
    }

    if (editorFileInputEl) {
        editorFileInputEl.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const files = Array.from(e.target.files);
                handleEditorFilesAndOpen(files);
            }
        });
    }
    
    // 按钮事件
    if (openEditorButtonEl) {
        openEditorButtonEl.addEventListener('click', () => {
            if (editorSelectedFiles.length === 0) {
                showEditorStatus('请先选择图片', 'error');
                return;
            }
            currentEditorIndex = 0;
            openStandaloneEditor();
        });
    }
    
    if (editorDownloadButtonEl) {
        editorDownloadButtonEl.addEventListener('click', downloadAllEditorImages);
    }
    
    if (editorResetButtonEl) {
        editorResetButtonEl.addEventListener('click', resetEditorForm);
    }
    
    // 保存和取消
    if (saveEditorButtonEl) {
        saveEditorButtonEl.addEventListener('click', saveStandaloneImageEdit);
    }
    
    if (cancelEditorButtonEl && editorWorkWindowEl) {
        cancelEditorButtonEl.addEventListener('click', () => {
            editorWorkWindowEl.classList.remove('active');
        });
    }
    
    // 初始化标签页
    initStandaloneEditorTabs();
    
    // 初始化裁剪功能
    initStandaloneCropControls();
    
    // 初始化调整功能
    initStandaloneAdjustControls();
}

function handleEditorFiles(files) {
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

function handleEditorFilesAndOpen(files) {
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
    
    if (validFiles.length > 0) {
        currentEditorIndex = 0;
        openStandaloneEditor();
    }
}

async function updateEditorFileList() {
    const editorFileList = document.getElementById('editorFileList');
    if (!editorFileList) return;
    
    editorFileList.innerHTML = '';
    
    for (const item of editorSelectedFiles) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.id = item.id;

        const preview = document.createElement('img');
        preview.className = 'file-preview';
        
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
    
    if (openEditorButton) openEditorButton.disabled = editorSelectedFiles.length === 0;
    if (editorDownloadButton) editorDownloadButton.disabled = editorEditedFiles.length === 0;
    
    const editorUploadIcon = document.getElementById('editorUploadIcon');
    const editorUploadText = document.getElementById('editorUploadText');
    if (editorSelectedFiles.length > 0) {
        if (editorUploadIcon) {
            editorUploadIcon.style.opacity = '0';
            setTimeout(() => { editorUploadIcon.style.display = 'none'; }, 500);
        }
        if (editorUploadText) {
            editorUploadText.style.opacity = '0';
            setTimeout(() => { editorUploadText.style.display = 'none'; }, 500);
        }
    } else {
        if (editorUploadIcon) {
            editorUploadIcon.style.display = 'block';
            setTimeout(() => { editorUploadIcon.style.opacity = '1'; }, 100);
        }
        if (editorUploadText) {
            editorUploadText.style.display = 'block';
            setTimeout(() => { editorUploadText.style.opacity = '1'; }, 100);
        }
    }
}

function removeEditorFile(id) {
    editorSelectedFiles = editorSelectedFiles.filter(item => item.id !== id);
    editorEditedFiles = editorEditedFiles.filter(item => item.id !== id);
    updateEditorFileList();
    showEditorStatus('文件已移除', 'info');
}

function resetEditorForm() {
    editorSelectedFiles = [];
    editorEditedFiles = [];
    updateEditorFileList();
    showEditorStatus('就绪', 'info');
}

function showEditorStatus(message, type = 'info') {
    const editorStatus = document.getElementById('editorStatus');
    if (!editorStatus) return;
    
    editorStatus.textContent = message;
    if (type === 'error') {
        editorStatus.style.color = '#ff0000';
    } else if (type === 'success') {
        editorStatus.style.color = '#008000';
    } else {
        editorStatus.style.color = '#000080';
    }
}

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

function openStandaloneEditor() {
    const file = editorSelectedFiles[currentEditorIndex];
    if (!file) return;
    
    const img = new Image();
    img.onload = () => {
        editorOriginalImage = img;
        editorCurrentImage = img;
        
        standaloneEditorCanvas.width = img.width;
        standaloneEditorCanvas.height = img.height;
        
        resetStandaloneAdjustSettings();
        drawStandaloneEditorImage();
        initStandaloneCropBox();
        
        const editorWorkWindow = document.getElementById('editorWorkWindow');
        if (editorWorkWindow) {
            editorWorkWindow.classList.add('active');
            bringWindowToFront(editorWorkWindow);
        }
    };
    
    img.src = URL.createObjectURL(file.file);
}

function drawStandaloneEditorImage() {
    if (!editorCurrentImage || !standaloneEditorCtx) return;
    
    standaloneEditorCtx.save();
    standaloneEditorCtx.clearRect(0, 0, standaloneEditorCanvas.width, standaloneEditorCanvas.height);
    
    const centerX = standaloneEditorCanvas.width / 2;
    const centerY = standaloneEditorCanvas.height / 2;
    
    standaloneEditorCtx.translate(centerX, centerY);
    standaloneEditorCtx.rotate((editorAdjustSettings.rotation * Math.PI) / 180);
    standaloneEditorCtx.scale(editorAdjustSettings.flipH ? -1 : 1, editorAdjustSettings.flipV ? -1 : 1);
    standaloneEditorCtx.drawImage(editorCurrentImage, -editorCurrentImage.width / 2, -editorCurrentImage.height / 2);
    
    standaloneEditorCtx.restore();
    applyStandaloneFilters();
}

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
        tempCanvas.width = standaloneEditorCanvas.width;
        tempCanvas.height = standaloneEditorCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.filter = filterString.trim();
        tempCtx.drawImage(standaloneEditorCanvas, 0, 0);
        
        standaloneEditorCtx.clearRect(0, 0, standaloneEditorCanvas.width, standaloneEditorCanvas.height);
        standaloneEditorCtx.drawImage(tempCanvas, 0, 0);
    }
}

function initStandaloneEditorTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(`${tabName}Panel`);
            if (panel) panel.classList.add('active');
            
            const cropOverlay = document.getElementById('cropOverlay');
            if (cropOverlay) {
                cropOverlay.style.display = tabName === 'crop' ? 'block' : 'none';
            }
        });
    });
}

function initStandaloneCropBox() {
    editorCropBox = {
        x: standaloneEditorCanvas.width * 0.1,
        y: standaloneEditorCanvas.height * 0.1,
        width: standaloneEditorCanvas.width * 0.8,
        height: standaloneEditorCanvas.height * 0.8
    };
    updateStandaloneCropBoxUI();
}

function updateStandaloneCropBoxUI() {
    const cropBoxElement = document.getElementById('cropBox');
    if (!cropBoxElement) return;
    
    cropBoxElement.innerHTML = '';
    
    cropBoxElement.style.left = `${editorCropBox.x}px`;
    cropBoxElement.style.top = `${editorCropBox.y}px`;
    cropBoxElement.style.width = `${editorCropBox.width}px`;
    cropBoxElement.style.height = `${editorCropBox.height}px`;
    
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

function initStandaloneCropControls() {
    const cropOverlay = document.getElementById('cropOverlay');
    const cropBoxElement = document.getElementById('cropBox');
    const cropRatioSelect = document.getElementById('cropRatio');
    const cropPresetSelect = document.getElementById('cropPreset');
    const applyCropBtn = document.getElementById('applyCrop');
    const resetCropBtn = document.getElementById('resetCrop');
    
    if (cropRatioSelect) {
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
    }
    
    if (cropPresetSelect) {
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
                    if (cropRatioSelect) cropRatioSelect.value = 'free';
                    updateStandaloneCropBoxFromRatio();
                }
            }
        });
    }
    
    if (applyCropBtn) {
        applyCropBtn.addEventListener('click', applyStandaloneCrop);
    }
    
    if (resetCropBtn) {
        resetCropBtn.addEventListener('click', () => {
            initStandaloneCropBox();
        });
    }
    
    if (cropBoxElement) {
        cropBoxElement.addEventListener('mousedown', startStandaloneCropDrag);
    }
    
    if (cropOverlay) {
        cropOverlay.addEventListener('mousedown', startStandaloneCropDraw);
    }
}

function updateStandaloneCropBoxFromRatio() {
    if (!editorCropRatio) return;
    
    const canvasWidth = standaloneEditorCanvas.width;
    const canvasHeight = standaloneEditorCanvas.height;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    let targetWidth = canvasWidth * 0.8;
    let targetHeight = targetWidth / editorCropRatio;
    
    if (targetHeight > canvasHeight) {
        targetHeight = canvasHeight * 0.8;
        targetWidth = targetHeight * editorCropRatio;
    }
    
    let scale = 1;
    if (targetWidth > canvasWidth || targetHeight > canvasHeight) {
        const widthScale = canvasWidth / targetWidth;
        const heightScale = canvasHeight / targetHeight;
        scale = Math.min(widthScale, heightScale) * 0.9;
    }
    
    if (scale < 1) {
        targetWidth *= scale;
        targetHeight *= scale;
    }
    
    editorCropBox = {
        x: centerX - targetWidth / 2,
        y: centerY - targetHeight / 2,
        width: targetWidth,
        height: targetHeight
    };
    
    editorCropBox.x = Math.max(0, Math.min(canvasWidth - editorCropBox.width, editorCropBox.x));
    editorCropBox.y = Math.max(0, Math.min(canvasHeight - editorCropBox.height, editorCropBox.y));
    
    updateStandaloneCropBoxUI();
}

function startStandaloneCropDraw(e) {
    const cropOverlay = document.getElementById('cropOverlay');
    if (e.target !== cropOverlay) return;
    
    const rect = cropOverlay.getBoundingClientRect();
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

function onStandaloneCropDraw(e) {
    if (!editorIsCropping) return;
    
    const cropOverlay = document.getElementById('cropOverlay');
    if (!cropOverlay) return;
    
    const rect = cropOverlay.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    editorCropBox.x = Math.min(editorCropStart.x, currentX);
    editorCropBox.y = Math.min(editorCropStart.y, currentY);
    editorCropBox.width = Math.abs(currentX - editorCropStart.x);
    editorCropBox.height = Math.abs(currentY - editorCropStart.y);
    
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

function stopStandaloneCrop() {
    editorIsCropping = false;
    document.removeEventListener('mousemove', onStandaloneCropDraw);
    document.removeEventListener('mouseup', stopStandaloneCrop);
}

function startStandaloneCropDrag(e) {
    if (e.target.classList.contains('crop-handle')) return;
    
    const cropOverlay = document.getElementById('cropOverlay');
    if (!cropOverlay) return;
    
    const rect = cropOverlay.getBoundingClientRect();
    editorCropStart = {
        x: e.clientX - rect.left - editorCropBox.x,
        y: e.clientY - rect.top - editorCropBox.y
    };
    
    document.addEventListener('mousemove', onStandaloneCropDrag);
    document.addEventListener('mouseup', stopStandaloneCropDrag);
}

function onStandaloneCropDrag(e) {
    const cropOverlay = document.getElementById('cropOverlay');
    if (!cropOverlay) return;
    
    const rect = cropOverlay.getBoundingClientRect();
    editorCropBox.x = e.clientX - rect.left - editorCropStart.x;
    editorCropBox.y = e.clientY - rect.top - editorCropStart.y;
    updateStandaloneCropBoxUI();
}

function stopStandaloneCropDrag() {
    document.removeEventListener('mousemove', onStandaloneCropDrag);
    document.removeEventListener('mouseup', stopStandaloneCropDrag);
}

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

function onStandaloneResizeCrop(e) {
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

function stopStandaloneResizeCrop() {
    editorResizeHandle = null;
    document.removeEventListener('mousemove', onStandaloneResizeCrop);
    document.removeEventListener('mouseup', stopStandaloneResizeCrop);
}

function applyStandaloneCrop() {
    if (editorCropBox.width < 10 || editorCropBox.height < 10) {
        alert('裁剪区域太小');
        return;
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = editorCropBox.width;
    tempCanvas.height = editorCropBox.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(standaloneEditorCanvas, editorCropBox.x, editorCropBox.y, editorCropBox.width, editorCropBox.height, 0, 0, editorCropBox.width, editorCropBox.height);
    
    standaloneEditorCanvas.width = editorCropBox.width;
    standaloneEditorCanvas.height = editorCropBox.height;
    standaloneEditorCtx.drawImage(tempCanvas, 0, 0);
    
    const img = new Image();
    img.onload = () => {
        editorCurrentImage = img;
        initStandaloneCropBox();
    };
    img.src = tempCanvas.toDataURL();
}

function initStandaloneAdjustControls() {
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', (e) => {
            editorAdjustSettings.brightness = parseInt(e.target.value);
            const brightnessValue = document.getElementById('brightnessValue');
            if (brightnessValue) brightnessValue.textContent = e.target.value;
            drawStandaloneEditorImage();
        });
    }
    
    if (contrastSlider) {
        contrastSlider.addEventListener('input', (e) => {
            editorAdjustSettings.contrast = parseInt(e.target.value);
            const contrastValue = document.getElementById('contrastValue');
            if (contrastValue) contrastValue.textContent = e.target.value;
            drawStandaloneEditorImage();
        });
    }
    
    if (saturationSlider) {
        saturationSlider.addEventListener('input', (e) => {
            editorAdjustSettings.saturation = parseInt(e.target.value);
            const saturationValue = document.getElementById('saturationValue');
            if (saturationValue) saturationValue.textContent = e.target.value;
            drawStandaloneEditorImage();
        });
    }
    
    const grayscaleBtn = document.getElementById('grayscaleEffect');
    if (grayscaleBtn) {
        grayscaleBtn.addEventListener('click', () => {
            editorAdjustSettings.grayscale = !editorAdjustSettings.grayscale;
            drawStandaloneEditorImage();
        });
    }
    
    const invertBtn = document.getElementById('invertEffect');
    if (invertBtn) {
        invertBtn.addEventListener('click', () => {
            editorAdjustSettings.invert = !editorAdjustSettings.invert;
            drawStandaloneEditorImage();
        });
    }
    
    const sepiaBtn = document.getElementById('sepiaEffect');
    if (sepiaBtn) {
        sepiaBtn.addEventListener('click', () => {
            editorAdjustSettings.sepia = !editorAdjustSettings.sepia;
            drawStandaloneEditorImage();
        });
    }
    
    const rotateLeftBtn = document.getElementById('rotateLeft');
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', () => {
            editorAdjustSettings.rotation = (editorAdjustSettings.rotation - 90) % 360;
            const temp = standaloneEditorCanvas.width;
            standaloneEditorCanvas.width = standaloneEditorCanvas.height;
            standaloneEditorCanvas.height = temp;
            drawStandaloneEditorImage();
        });
    }
    
    const rotateRightBtn = document.getElementById('rotateRight');
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', () => {
            editorAdjustSettings.rotation = (editorAdjustSettings.rotation + 90) % 360;
            const temp = standaloneEditorCanvas.width;
            standaloneEditorCanvas.width = standaloneEditorCanvas.height;
            standaloneEditorCanvas.height = temp;
            drawStandaloneEditorImage();
        });
    }
    
    const flipHorizontalBtn = document.getElementById('flipHorizontal');
    if (flipHorizontalBtn) {
        flipHorizontalBtn.addEventListener('click', () => {
            editorAdjustSettings.flipH = !editorAdjustSettings.flipH;
            drawStandaloneEditorImage();
        });
    }
    
    const flipVerticalBtn = document.getElementById('flipVertical');
    if (flipVerticalBtn) {
        flipVerticalBtn.addEventListener('click', () => {
            editorAdjustSettings.flipV = !editorAdjustSettings.flipV;
            drawStandaloneEditorImage();
        });
    }
    
    const applyAdjustBtn = document.getElementById('applyAdjust');
    if (applyAdjustBtn) {
        applyAdjustBtn.addEventListener('click', applyStandaloneAdjustments);
    }
    
    const resetAdjustBtn = document.getElementById('resetAdjust');
    if (resetAdjustBtn) {
        resetAdjustBtn.addEventListener('click', resetStandaloneAdjustSettings);
    }
}

function applyStandaloneAdjustments() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = standaloneEditorCanvas.width;
    tempCanvas.height = standaloneEditorCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(standaloneEditorCanvas, 0, 0);
    
    const img = new Image();
    img.onload = () => {
        editorCurrentImage = img;
        resetStandaloneAdjustSettings();
        drawStandaloneEditorImage();
    };
    img.src = tempCanvas.toDataURL();
}

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
    
    const brightnessSlider = document.getElementById('brightness');
    if (brightnessSlider) brightnessSlider.value = 0;
    const brightnessValue = document.getElementById('brightnessValue');
    if (brightnessValue) brightnessValue.textContent = '0';
    
    const contrastSlider = document.getElementById('contrast');
    if (contrastSlider) contrastSlider.value = 0;
    const contrastValue = document.getElementById('contrastValue');
    if (contrastValue) contrastValue.textContent = '0';
    
    const saturationSlider = document.getElementById('saturation');
    if (saturationSlider) saturationSlider.value = 0;
    const saturationValue = document.getElementById('saturationValue');
    if (saturationValue) saturationValue.textContent = '0';
    
    if (editorOriginalImage) {
        standaloneEditorCanvas.width = editorOriginalImage.width;
        standaloneEditorCanvas.height = editorOriginalImage.height;
        editorCurrentImage = editorOriginalImage;
        drawStandaloneEditorImage();
    }
}

function saveStandaloneImageEdit() {
    standaloneEditorCanvas.toBlob((blob) => {
        const fileName = editorSelectedFiles[currentEditorIndex].file.name;
        const newFile = new File([blob], fileName, { type: 'image/png' });
        
        editorSelectedFiles[currentEditorIndex].file = newFile;
        editorSelectedFiles[currentEditorIndex].editedBlob = blob;
        editorSelectedFiles[currentEditorIndex].status = 'edited';
        
        if (!editorEditedFiles.some(item => item.id === editorSelectedFiles[currentEditorIndex].id)) {
            editorEditedFiles.push(editorSelectedFiles[currentEditorIndex]);
        }
        
        updateEditorFileList();
        
        const editorWorkWindow = document.getElementById('editorWorkWindow');
        if (editorWorkWindow) {
            editorWorkWindow.classList.remove('active');
        }
        showEditorStatus('图片已编辑', 'success');
    }, 'image/png');
}

function addEditorKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const editorWorkWindow = document.getElementById('editorWorkWindow');
        if (!editorWorkWindow || !editorWorkWindow.classList.contains('active')) return;
        
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveStandaloneImageEdit();
        }
        
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            resetStandaloneAdjustSettings();
        }
        
        if (e.key === 'Escape') {
            e.preventDefault();
            editorWorkWindow.classList.remove('active');
        }
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const step = e.shiftKey ? 10 : 1;
            
            switch (e.key) {
                case 'ArrowUp':
                    editorCropBox.y = Math.max(0, editorCropBox.y - step);
                    break;
                case 'ArrowDown':
                    editorCropBox.y = Math.min(standaloneEditorCanvas.height - editorCropBox.height, editorCropBox.y + step);
                    break;
                case 'ArrowLeft':
                    editorCropBox.x = Math.max(0, editorCropBox.x - step);
                    break;
                case 'ArrowRight':
                    editorCropBox.x = Math.min(standaloneEditorCanvas.width - editorCropBox.width, editorCropBox.x + step);
                    break;
            }
            
            updateStandaloneCropBoxUI();
        }
    });
}

// 配色工具功能
let colorToolInitialized = false;
function initColorTool() {
    if (colorToolInitialized) return;
    colorToolInitialized = true;
    
    const colorWheelCanvas = document.getElementById('colorWheelCanvas');
    const colorWheelMarker = document.getElementById('colorWheelMarker');
    const colorPreview = document.getElementById('colorPreview');
    const hexInput = document.getElementById('hexInput');
    const rgbRInput = document.getElementById('rgbRInput');
    const rgbGInput = document.getElementById('rgbGInput');
    const rgbBInput = document.getElementById('rgbBInput');
    const hslHInput = document.getElementById('hslHInput');
    const hslSInput = document.getElementById('hslSInput');
    const hslLInput = document.getElementById('hslLInput');
    const colorSchemeSelect = document.getElementById('colorSchemeSelect');
    const colorCountDisplay = document.getElementById('colorCountDisplay');
    const decreaseColorCount = document.getElementById('decreaseColorCount');
    const increaseColorCount = document.getElementById('increaseColorCount');
    const colorSchemeColors = document.getElementById('colorSchemeColors');
    const copyColorCodes = document.getElementById('copyColorCodes');
    const exportColorSVG = document.getElementById('exportColorSVG');
    const colorToolStatus = document.getElementById('colorToolStatus');
    
    let currentColor = { r: 255, g: 87, b: 51 };
    let colorCount = 3;
    
    // 绘制色轮
    function drawColorWheel() {
        const ctx = colorWheelCanvas.getContext('2d');
        const centerX = colorWheelCanvas.width / 2;
        const centerY = colorWheelCanvas.height / 2;
        const radius = Math.min(centerX, centerY) - 2;
        
        ctx.clearRect(0, 0, colorWheelCanvas.width, colorWheelCanvas.height);
        
        // 绘制色轮
        for (let angle = 0; angle < 360; angle += 1) {
            const startAngle = (angle - 1) * Math.PI / 180;
            const endAngle = (angle + 1) * Math.PI / 180;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, `hsl(${angle}, 10%, 90%)`);
            gradient.addColorStop(0.5, `hsl(${angle}, 70%, 60%)`);
            gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // RGB转HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    // HSL转RGB
    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    
    // RGB转HEX
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }
    
    // HEX转RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // 更新颜色显示
    function updateColorDisplay() {
        const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        
        colorPreview.style.backgroundColor = hex;
        hexInput.value = hex;
        rgbRInput.value = currentColor.r;
        rgbGInput.value = currentColor.g;
        rgbBInput.value = currentColor.b;
        hslHInput.value = hsl.h;
        hslSInput.value = hsl.s;
        hslLInput.value = hsl.l;
        
        updateColorScheme();
    }
    
    // 生成配色方案
    function generateColorScheme(h, s, l, scheme, count) {
        const colors = [];
        
        switch (scheme) {
            case 'complementary':
                colors.push({ h, s, l });
                colors.push({ h: (h + 180) % 360, s, l });
                break;
                
            case 'triadic':
                colors.push({ h, s, l });
                colors.push({ h: (h + 120) % 360, s, l });
                colors.push({ h: (h + 240) % 360, s, l });
                break;
                
            case 'analogous':
                const step = 30;
                const startH = (h - Math.floor(count / 2) * step + 360) % 360;
                for (let i = 0; i < count; i++) {
                    colors.push({ h: (startH + i * step) % 360, s, l });
                }
                break;
                
            case 'split-complementary':
                colors.push({ h, s, l });
                colors.push({ h: (h + 150) % 360, s, l });
                colors.push({ h: (h + 210) % 360, s, l });
                break;
                
            case 'tetradic':
                colors.push({ h, s, l });
                colors.push({ h: (h + 90) % 360, s, l });
                colors.push({ h: (h + 180) % 360, s, l });
                colors.push({ h: (h + 270) % 360, s, l });
                break;
                
            case 'monochromatic':
                const lStep = 80 / (count + 1);
                for (let i = 1; i <= count; i++) {
                    colors.push({ h, s, l: 10 + i * lStep });
                }
                break;
        }
        
        return colors.map(c => hslToRgb(c.h, c.s, c.l));
    }
    
    // 更新配色方案显示
    function updateColorScheme() {
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        const scheme = colorSchemeSelect.value;
        const colors = generateColorScheme(hsl.h, hsl.s, hsl.l, scheme, colorCount);
        
        colorSchemeColors.innerHTML = '';
        
        colors.forEach(color => {
            const hex = rgbToHex(color.r, color.g, color.b);
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.innerHTML = `
                <div class="color-swatch-box" style="background-color: ${hex}"></div>
                <div class="color-swatch-info">${hex}</div>
            `;
            swatch.addEventListener('click', () => {
                navigator.clipboard.writeText(hex).then(() => {
                    colorToolStatus.textContent = `已复制: ${hex}`;
                    setTimeout(() => {
                        colorToolStatus.textContent = '就绪';
                    }, 2000);
                });
            });
            colorSchemeColors.appendChild(swatch);
        });
    }
    
    // 色轮点击事件
    colorWheelCanvas.addEventListener('click', (e) => {
        const rect = colorWheelCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = colorWheelCanvas.width / 2;
        const centerY = colorWheelCanvas.height / 2;
        
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = Math.min(centerX, centerY) - 2;
        
        if (distance <= radius) {
            let angle = Math.atan2(dy, dx) * 180 / Math.PI;
            if (angle < 0) angle += 360;
            
            const saturation = Math.min(100, (distance / radius) * 100);
            const lightness = 50;
            
            const rgb = hslToRgb(angle, saturation, lightness);
            currentColor = rgb;
            
            colorWheelMarker.style.left = `${x}px`;
            colorWheelMarker.style.top = `${y}px`;
            colorWheelMarker.style.backgroundColor = rgbToHex(rgb.r, rgb.g, rgb.b);
            
            updateColorDisplay();
        }
    });
    
    // HEX输入
    hexInput.addEventListener('change', () => {
        const rgb = hexToRgb(hexInput.value);
        if (rgb) {
            currentColor = rgb;
            updateColorDisplay();
        }
    });
    
    // RGB输入
    [rgbRInput, rgbGInput, rgbBInput].forEach(input => {
        input.addEventListener('change', () => {
            currentColor = {
                r: parseInt(rgbRInput.value) || 0,
                g: parseInt(rgbGInput.value) || 0,
                b: parseInt(rgbBInput.value) || 0
            };
            updateColorDisplay();
        });
    });
    
    // HSL输入
    [hslHInput, hslSInput, hslLInput].forEach(input => {
        input.addEventListener('change', () => {
            const rgb = hslToRgb(
                parseInt(hslHInput.value) || 0,
                parseInt(hslSInput.value) || 0,
                parseInt(hslLInput.value) || 0
            );
            currentColor = rgb;
            updateColorDisplay();
        });
    });
    
    // 配色方案选择
    colorSchemeSelect.addEventListener('change', updateColorScheme);
    
    // 配色数量控制
    decreaseColorCount.addEventListener('click', () => {
        if (colorCount > 2) {
            colorCount--;
            colorCountDisplay.textContent = colorCount;
            updateColorScheme();
        }
    });
    
    increaseColorCount.addEventListener('click', () => {
        if (colorCount < 12) {
            colorCount++;
            colorCountDisplay.textContent = colorCount;
            updateColorScheme();
        }
    });
    
    // 复制颜色代码
    copyColorCodes.addEventListener('click', () => {
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        const scheme = colorSchemeSelect.value;
        const colors = generateColorScheme(hsl.h, hsl.s, hsl.l, scheme, colorCount);
        const codes = colors.map(c => rgbToHex(c.r, c.g, c.b)).join('\n');
        
        navigator.clipboard.writeText(codes).then(() => {
            colorToolStatus.textContent = '已复制所有颜色代码';
            setTimeout(() => {
                colorToolStatus.textContent = '就绪';
            }, 2000);
        });
    });
    
    // 导出SVG
    exportColorSVG.addEventListener('click', () => {
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        const scheme = colorSchemeSelect.value;
        const colors = generateColorScheme(hsl.h, hsl.s, hsl.l, scheme, colorCount);
        
        const svgWidth = 800;
        const svgHeight = 400;
        const colorWidth = svgWidth / colors.length;
        
        let svgContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        svgContent += `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n`;
        svgContent += `  <rect width="${svgWidth}" height="${svgHeight}" fill="#f0f0f0"/>\n`;
        
        colors.forEach((color, index) => {
            const hex = rgbToHex(color.r, color.g, color.b);
            const x = index * colorWidth;
            
            svgContent += `  <rect x="${x}" y="50" width="${colorWidth}" height="200" fill="${hex}"/>\n`;
            svgContent += `  <text x="${x + colorWidth/2}" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="#000">${hex}</text>\n`;
            svgContent += `  <text x="${x + colorWidth/2}" y="300" text-anchor="middle" font-family="Arial" font-size="11" fill="#666">RGB(${color.r}, ${color.g}, ${color.b})</text>\n`;
        });
        
        svgContent += `  <text x="${svgWidth/2}" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#000">配色方案: ${colorSchemeSelect.options[colorSchemeSelect.selectedIndex].text}</text>\n`;
        svgContent += `</svg>`;
        
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `color-scheme-${Date.now()}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        
        colorToolStatus.textContent = 'SVG已导出';
        setTimeout(() => {
            colorToolStatus.textContent = '就绪';
        }, 2000);
    });
    
    // 初始化
    drawColorWheel();
    updateColorDisplay();
}

// 配色工具窗口控制（在 init() 中调用 initColorToolEvents）
function initColorToolEvents() {
    console.log('initColorToolEvents called:', {
        colorToolIcon: !!colorToolIcon,
        colorToolWindow: !!colorToolWindow,
        colorToolCloseButton: !!colorToolCloseButton,
        colorToolMinimizeButton: !!colorToolMinimizeButton
    });
    
    if (colorToolIcon && colorToolWindow) {
        colorToolIcon.addEventListener('click', () => {
            console.log('Color tool icon clicked!');
            try {
                colorToolWindow.classList.add('active');
                colorToolWindow.classList.remove('minimized');
                bringWindowToFront(colorToolWindow);
                initColorTool();
                console.log('Color tool window opened successfully');
            } catch (e) {
                console.error('Error opening color tool:', e);
            }
        });
        console.log('Color tool icon click handler bound');
    } else {
        console.error('Cannot bind color tool events: missing elements');
    }

    if (colorToolCloseButton && colorToolWindow) {
        colorToolCloseButton.addEventListener('click', () => {
            colorToolWindow.classList.remove('active');
            colorToolWindow.classList.remove('minimized');
        });
    }

    if (colorToolMinimizeButton && colorToolWindow) {
        colorToolMinimizeButton.addEventListener('click', () => {
            colorToolWindow.classList.remove('active');
            colorToolWindow.classList.add('minimized');
        });
    }
}

// 将窗口置于最前
function bringWindowToFront(targetWindow) {
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 10;
    windows.forEach(w => {
        const zIndex = parseInt(window.getComputedStyle(w).zIndex);
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    });
    targetWindow.style.zIndex = maxZIndex + 1;
}

// 绘制桌面背景
function drawDesktopBackground() {
    const canvas = document.getElementById('desktopCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#5D8FD8');
    gradient.addColorStop(0.5, '#75B4E8');
    gradient.addColorStop(1, '#A6D9F2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制云朵
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    drawCloud(ctx, canvas.width * 0.2, canvas.height * 0.3, 60);
    drawCloud(ctx, canvas.width * 0.8, canvas.height * 0.2, 50);
    drawCloud(ctx, canvas.width * 0.5, canvas.height * 0.8, 70);
    
    // 绘制草地
    ctx.fillStyle = 'rgba(120, 180, 100, 0.6)';
    ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);
}

// 绘制云朵
function drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y + size * 0.2, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
}

// 初始化任务栏标签功能
function initTaskbarLabels(windows) {
    const taskbarItems = document.getElementById('taskbarItems');
    
    windows.forEach(({ window, name }) => {
        if (!window) return;
        
        // 观察窗口的显示状态变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = window.classList.contains('active');
                    const isMinimized = window.classList.contains('minimized');
                    
                    // 查找或创建任务栏项
                    let taskbarItem = taskbarItems.querySelector(`[data-window="${window.id}"]`);
                    
                    if (isActive && !isMinimized) {
                        if (!taskbarItem) {
                            taskbarItem = document.createElement('div');
                            taskbarItem.className = 'taskbar-item active';
                            taskbarItem.dataset.window = window.id;
                            taskbarItem.textContent = name;
                            taskbarItem.addEventListener('click', () => {
                                window.classList.remove('active');
                                window.classList.add('minimized');
                            });
                            taskbarItems.appendChild(taskbarItem);
                        }
                    } else if (!isActive || isMinimized) {
                        if (taskbarItem) {
                            taskbarItem.remove();
                        }
                    }
                }
            });
        });
        
        observer.observe(window, { attributes: true, attributeFilter: ['class'] });
    });
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    init();
});
