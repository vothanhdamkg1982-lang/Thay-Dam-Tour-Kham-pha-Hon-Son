/**
 * ===========================================================
 * KHO ẢNH - LOGIC HIỂN THỊ
 * ===========================================================
 * File này đọc dữ liệu từ data/gallery-data.js (GALLERY_IMAGES,
 * GALLERY_CATEGORIES) và tự render lưới ảnh + lightbox.
 * KHÔNG cần sửa file này khi thêm ảnh - chỉ sửa data/gallery-data.js.
 * ===========================================================
 */

let currentFilter = 'all';
let currentLightboxList = [];
let currentLightboxIndex = 0;

function getFilteredImages() {
    if (currentFilter === 'all') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(img => img.category === currentFilter);
}

function renderFilterBar() {
    const bar = document.getElementById('galleryFilterBar');
    bar.innerHTML = GALLERY_CATEGORIES.map(cat => `
        <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderPhotoGrid();
        });
    });
}

function renderPhotoGrid() {
    const grid = document.getElementById('photoGrid');
    const countEl = document.getElementById('mediaCount');
    const images = getFilteredImages();

    countEl.innerHTML = `Đang hiển thị <strong>${images.length}</strong> / ${GALLERY_IMAGES.length} ảnh`;

    if (images.length === 0) {
        grid.innerHTML = `
            <div class="media-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-images"></i>
                <p>Chưa có ảnh nào trong mục này.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = images.map((img, index) => `
        <div class="photo-card" data-index="${index}">
            <img src="${img.url}" alt="${img.caption}" loading="lazy">
            <span class="zoom-icon"><i class="fas fa-expand"></i></span>
            <div class="photo-caption">${img.caption}</div>
        </div>
    `).join('');

    grid.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            openLightbox(images, idx);
        });
    });
}

function openLightbox(list, index) {
    currentLightboxList = list;
    currentLightboxIndex = index;
    renderLightbox();
    document.getElementById('lightboxOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightboxOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function renderLightbox() {
    const item = currentLightboxList[currentLightboxIndex];
    document.getElementById('lightboxImg').src = item.url;
    document.getElementById('lightboxImg').alt = item.caption;
    document.getElementById('lightboxCaption').textContent = item.caption;
    document.getElementById('lightboxCounter').textContent =
        (currentLightboxIndex + 1) + ' / ' + currentLightboxList.length;
}

function lightboxNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxList.length;
    renderLightbox();
}

function lightboxPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxList.length) % currentLightboxList.length;
    renderLightbox();
}

document.addEventListener('DOMContentLoaded', function () {
    renderFilterBar();
    renderPhotoGrid();

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxNext').addEventListener('click', lightboxNext);
    document.getElementById('lightboxPrev').addEventListener('click', lightboxPrev);

    document.getElementById('lightboxOverlay').addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!document.getElementById('lightboxOverlay').classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxNext();
        if (e.key === 'ArrowLeft') lightboxPrev();
    });
});
