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

// 图片编辑器相关变量
let imageSelectedFiles = [];
let imageConvertedFiles = [];

// DOM 元素
const imageEditorIcon = document.getElementById('imageEditorIcon');
const imageEditorWindow = document.getElementById('imageEditorWindow');
const imageEditorCloseButton = document.getElementById('imageEditorCloseButton');
const imageEditorMinButton = document.getElementById('imageEditorMinButton');
const imageUploadArea = document.getElementById('imageUploadArea');
const imageUploadIcon = document.getElementById('imageUploadIcon');
const imageUploadText = document.getElementById('imageUploadText');
const imageFileInput = document.getElementById('imageFileInput');
const imageFileList = document.getElementById('imageFileList');
const imageEditButton = document.getElementById('imageEditButton');
const imageDownloadButton = document.getElementById('imageDownloadButton');
const imageResetButton = document.getElementById('imageResetButton');
const imageStatus = document.getElementById('imageStatus');

// 编辑器相关变量
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

// 窗口控制
function initWindowControls() {
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

    // 编辑器窗口控制
    const editorWindow = document.getElementById('editorWindow');
    const editorCloseButton = document.getElementById('editorCloseButton');
    const editorMinButton = document.getElementById('editorMinButton');

    editorCloseButton.addEventListener('click', () => {
        editorWindow.classList.remove('active');
    });

    editorMinButton.addEventListener('click', () => {
        editorWindow.classList.remove('active');
    });
}

// 初始化事件监听
function initEventListeners() {
    // 图片上传事件
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '#000080';
    });

    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = '#808080';
    });

    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '#808080';
        if (e.dataTransfer.files.length > 0) {
            handleImageFiles(Array.from(e.dataTransfer.files));
        }
    });

    imageUploadArea.addEventListener('click', () => {
        imageFileInput.click();
    });

    imageFileInput.addEventListener('change', handleImageFileSelect);

    // 按钮事件
    imageEditButton.addEventListener('click', () => {
        if (imageSelectedFiles.length === 0) {
            showImageStatus('请先选择图片', 'error');
            return;
        }
        currentEditIndex = 0;
        openImageEditor();
    });

    imageDownloadButton.addEventListener('click', downloadAllImages);
    imageResetButton.addEventListener('click', resetImageForm);
}

// 处理图片文件选择
function handleImageFileSelect(e) {
    if (e.target.files.length > 0) {
        handleImageFiles(Array.from(e.target.files));
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
            fileStatus.textContent = '待编辑';
        } else if (item.status === 'success') {
            fileStatus.className = 'file-status success';
            fileStatus.textContent = '编辑完成';
        }

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeImageFile(item.id));

        fileItem.appendChild(preview);
        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);

        imageFileList.appendChild(fileItem);
    }

    imageEditButton.disabled = imageSelectedFiles.length === 0;
    imageDownloadButton.disabled = imageConvertedFiles.length === 0;
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

// 移除图片文件
function removeImageFile(id) {
    imageSelectedFiles = imageSelectedFiles.filter(item => item.id !== id);
    imageConvertedFiles = imageConvertedFiles.filter(item => item.id !== id);
    updateImageFileList();
    showImageStatus('文件已移除', 'info');
}

// 下载所有图片
function downloadAllImages() {
    if (imageConvertedFiles.length === 0) {
        showImageStatus('没有可下载的文件', 'error');
        return;
    }
    
    imageConvertedFiles.forEach(item => {
        const fileName = item.file.name.replace(/\.[^/.]+$/, '') + '.png';
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

// 重置图片表单
function resetImageForm() {
    imageSelectedFiles = [];
    imageConvertedFiles = [];
    imageEditButton.disabled = true;
    imageDownloadButton.disabled = true;
    updateImageFileList();
    showImageStatus('就绪', 'info');
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

// 初始化编辑器
function initImageEditor() {
    const editorWindow = document.getElementById('editorWindow');
    const saveEditorButton = document.getElementById('saveEditor');
    const cancelEditorButton = document.getElementById('cancelEditor');
    
    // 初始化canvas
    editorCanvas = document.getElementById('editorCanvas');
    editorCtx = editorCanvas.getContext('2d');
    
    // 保存和取消
    saveEditorButton.addEventListener('click', saveImageEdit);
    cancelEditorButton.addEventListener('click', () => {
        editorWindow.classList.remove('active');
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
        
        document.getElementById('editorWindow').classList.add('active');
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
        imageSelectedFiles[currentEditIndex].status = 'success';
        
        // 添加到转换文件列表
        if (!imageConvertedFiles.some(item => item.id === imageSelectedFiles[currentEditIndex].id)) {
            imageConvertedFiles.push(imageSelectedFiles[currentEditIndex]);
        }
        
        // 更新文件列表UI
        updateImageFileList();
        
        document.getElementById('editorWindow').classList.remove('active');
        showImageStatus('图片已编辑', 'success');
    }, 'image/png');
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

// 初始化
function init() {
    drawDesktopBackground();
    initWindowControls();
    initEventListeners();
    initImageEditor();
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
    init();
    updateClock();
    setInterval(updateClock, 1000);
});