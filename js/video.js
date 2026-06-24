/**
 * ===========================================================
 * KHO VIDEO - LOGIC HIỂN THỊ
 * ===========================================================
 * File này đọc dữ liệu từ data/video-data.js (VIDEO_LIST,
 * VIDEO_CATEGORIES) và tự render lưới video.
 * KHÔNG cần sửa file này khi thêm video - chỉ sửa data/video-data.js.
 *
 * Video chỉ được tải/phát khi người dùng BẤM vào nút play
 * (lazy-load) để trang không bị nặng khi có nhiều video.
 * ===========================================================
 */

let currentVideoFilter = 'all';

function getFilteredVideos() {
    if (currentVideoFilter === 'all') return VIDEO_LIST;
    return VIDEO_LIST.filter(v => v.category === currentVideoFilter);
}

function getCategoryLabel(catId) {
    const found = VIDEO_CATEGORIES.find(c => c.id === catId);
    return found ? found.label : catId;
}

function renderVideoFilterBar() {
    const bar = document.getElementById('videoFilterBar');
    bar.innerHTML = VIDEO_CATEGORIES.map(cat => `
        <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentVideoFilter = this.getAttribute('data-filter');
            renderVideoGrid();
        });
    });
}

function getYoutubeThumb(youtubeId) {
    return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    const countEl = document.getElementById('videoMediaCount');
    const videos = getFilteredVideos();

    countEl.innerHTML = `Đang hiển thị <strong>${videos.length}</strong> / ${VIDEO_LIST.length} video`;

    if (videos.length === 0) {
        grid.innerHTML = `
            <div class="media-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-video"></i>
                <p>Chưa có video nào trong mục này.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = videos.map((v, index) => {
        const thumb = v.type === 'youtube' ? getYoutubeThumb(v.id) : (v.poster || '');
        return `
        <div class="video-card">
            <div class="video-frame-wrap" data-index="${index}">
                ${thumb ? `<img class="video-thumb" src="${thumb}" alt="${v.title}" loading="lazy">` : ''}
                <span class="video-play-btn"><i class="fas fa-play"></i></span>
            </div>
            <div class="video-card-body">
                <h4>${v.title}</h4>
                <span class="video-tag">${getCategoryLabel(v.category)}</span>
            </div>
        </div>
        `;
    }).join('');

    grid.querySelectorAll('.video-frame-wrap').forEach(wrap => {
        wrap.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            playVideoInPlace(this, videos[idx]);
        });
    });
}

// Lazy-load: chỉ chèn iframe/video thật khi người dùng bấm play,
// tránh tải hàng loạt video cùng lúc khi trang có nhiều video.
function playVideoInPlace(wrapEl, videoItem) {
    if (videoItem.type === 'youtube') {
        wrapEl.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoItem.id}?autoplay=1&rel=0"
                title="${videoItem.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;
    } else if (videoItem.type === 'file') {
        wrapEl.innerHTML = `
            <video controls autoplay playsinline ${videoItem.poster ? `poster="${videoItem.poster}"` : ''}>
                <source src="${videoItem.url}" type="video/mp4">
                Trình duyệt của bạn không hỗ trợ phát video.
            </video>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderVideoFilterBar();
    renderVideoGrid();
});
