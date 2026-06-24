// ============================================================
// ---- Header scroll effect ----
// ============================================================
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================================
// ---- Mobile menu toggle ----
// ============================================================
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('open');
}

// ============================================================
// ---- Tab switching (load nội dung lịch trình từ file riêng) ----
// ============================================================
// Mỗi ngày được tách thành 1 file HTML riêng trong thư mục itinerary/
// để dễ chỉnh sửa mà không cần đụng vào trang chính.
const ITINERARY_SOURCES = {
    day1: 'itinerary/day1.html',
    day2: 'itinerary/day2.html'
};

// Cache lại nội dung đã tải để không phải fetch lại mỗi lần bấm tab
const itineraryCache = {};

async function loadItineraryTab(tabId) {
    const container = document.getElementById(tabId);
    if (!container) return;

    // Nếu đã tải rồi thì dùng lại cache, không gọi lại fetch
    if (itineraryCache[tabId]) {
        container.innerHTML = itineraryCache[tabId];
        return;
    }

    container.innerHTML = '<p class="itinerary-loading"><i class="fas fa-spinner fa-spin"></i> Đang tải lịch trình...</p>';

    try {
        const response = await fetch(ITINERARY_SOURCES[tabId]);
        if (!response.ok) throw new Error('Không tải được nội dung');
        const html = await response.text();
        itineraryCache[tabId] = html;
        container.innerHTML = html;
    } catch (error) {
        console.error('Lỗi tải lịch trình:', error);
        container.innerHTML = '<p class="itinerary-loading">⚠️ Không tải được lịch trình, vui lòng thử lại sau.</p>';
    }
}

function showTab(tabId, btnEl) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // btnEl được truyền vào từ onclick="showTab('day1', this)"
    if (btnEl) {
        btnEl.classList.add('active');
    }

    loadItineraryTab(tabId);
}

// Tải sẵn nội dung Ngày 1 khi trang vừa load xong
document.addEventListener('DOMContentLoaded', function () {
    loadItineraryTab('day1');
});

// ============================================================
// ---- Close mobile menu on link click ----
// ============================================================
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('navMenu').classList.remove('open');
    });
});

// ============================================================
// ---- Smooth scroll for all anchor links ----
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
// ---- Animation on scroll ----
// ============================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.intro-card, .timeline-item, .service-box, .menu-card, .policy-box, .gallery-item, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================================
// ---- FILE UPLOAD: preview, validate, and rebuild FormData ----
// ============================================================
const MAX_FILES = 5;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB mỗi tệp
const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const fileInput = document.getElementById('fileInput');
const uploadLabel = document.getElementById('uploadLabel');
const uploadLabelText = document.getElementById('uploadLabelText');
const filePreviewList = document.getElementById('filePreviewList');
const fileErrorMsg = document.getElementById('fileErrorMsg');

// Danh sách file hiện đang được giữ (tách biệt với input.files để có thể xoá từng cái)
let selectedFiles = [];

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showFileError(message) {
    fileErrorMsg.textContent = message;
    fileErrorMsg.classList.add('show');
}

function clearFileError() {
    fileErrorMsg.textContent = '';
    fileErrorMsg.classList.remove('show');
}

function getFileIcon(file) {
    if (file.type === 'application/pdf') return 'fa-file-pdf';
    if (file.type.includes('word')) return 'fa-file-word';
    return 'fa-file';
}

function renderFilePreviews() {
    filePreviewList.innerHTML = '';

    if (selectedFiles.length === 0) {
        uploadLabel.classList.remove('has-files');
        uploadLabelText.textContent = 'Đính kèm hình ảnh / tệp tin (nếu có)';
        return;
    }

    uploadLabel.classList.add('has-files');
    uploadLabelText.textContent = selectedFiles.length + ' tệp đã chọn (bấm để thêm)';

    selectedFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';

        let thumbHtml = '';
        if (file.type.startsWith('image/')) {
            thumbHtml = `<img class="thumb" id="thumb-${index}" alt="${file.name}">`;
        } else {
            thumbHtml = `<div class="file-icon"><i class="fas ${getFileIcon(file)}"></i></div>`;
        }

        item.innerHTML = `
            ${thumbHtml}
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button type="button" class="file-remove" data-index="${index}" title="Xoá tệp">
                <i class="fas fa-times"></i>
            </button>
        `;
        filePreviewList.appendChild(item);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const thumbEl = document.getElementById('thumb-' + index);
                if (thumbEl) thumbEl.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Gắn lại sự kiện xoá cho từng nút (vì innerHTML đã render lại toàn bộ)
    filePreviewList.querySelectorAll('.file-remove').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            selectedFiles.splice(idx, 1);
            syncFileInput();
            renderFilePreviews();
        });
    });
}

// Đồng bộ lại input[type=file] thật từ mảng selectedFiles,
// để khi submit form, FormData lấy đúng danh sách hiện tại (sau khi đã xoá bớt).
function syncFileInput() {
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
}

fileInput.addEventListener('change', function () {
    clearFileError();
    const incoming = Array.from(fileInput.files);

    for (const file of incoming) {
        if (selectedFiles.length >= MAX_FILES) {
            showFileError('Chỉ được đính kèm tối đa ' + MAX_FILES + ' tệp.');
            break;
        }
        if (file.size > MAX_FILE_SIZE) {
            showFileError('Tệp "' + file.name + '" vượt quá 8MB, vui lòng chọn tệp nhỏ hơn.');
            continue;
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            showFileError('Tệp "' + file.name + '" không đúng định dạng cho phép (ảnh, PDF, Word).');
            continue;
        }
        // tránh thêm trùng tên + kích thước
        const isDuplicate = selectedFiles.some(f => f.name === file.name && f.size === file.size);
        if (!isDuplicate) {
            selectedFiles.push(file);
        }
    }

    syncFileInput();
    renderFilePreviews();
});

// ============================================================
// ---- Handle contact form submission with Formspree ----
// ============================================================
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const form = this;

    // Vô hiệu hóa nút và hiển thị trạng thái "đang gửi"
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    showStatus('Đang gửi thông tin...', 'info');

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                showStatus('✅ Gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
                form.reset();
                selectedFiles = [];
                renderFilePreviews();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi';
                submitBtn.disabled = false;
            } else {
                response.json().then(data => {
                    showStatus('❌ ' + (data.error || 'Có lỗi xảy ra. Vui lòng thử lại.'), 'error');
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi yêu cầu';
                    submitBtn.disabled = false;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showStatus('❌ Lỗi kết nối. Vui lòng thử lại.', 'error');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi yêu cầu';
            submitBtn.disabled = false;
        });
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('formStatus');
    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    statusDiv.className = type;
}
