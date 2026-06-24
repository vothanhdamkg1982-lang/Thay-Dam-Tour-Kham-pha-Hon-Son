/**
 * ===========================================================
 * KHO VIDEO - DANH SÁCH VIDEO
 * ===========================================================
 * File DUY NHẤT cần sửa khi muốn THÊM / XOÁ video.
 * KHÔNG GIỚI HẠN số lượng video - thêm bao nhiêu dòng cũng được.
 *
 * Hỗ trợ 2 loại video, dùng field "type" để phân biệt:
 *
 * 1) type: 'youtube'
 *    -> chỉ cần dán "id" là mã video YouTube
 *       (lấy từ link: https://www.youtube.com/watch?v=ID_NẰM_Ở_ĐÂY)
 *
 * 2) type: 'file'
 *    -> dán "url" là link trực tiếp tới file video (.mp4)
 *       Video được tải từ link này, KHÔNG giới hạn dung lượng file
 *       vì đây là link tới video đã host sẵn (không phải upload qua form).
 *       Có thể để video trên hosting của bạn, Google Drive (link share trực tiếp),
 *       hoặc bất kỳ dịch vụ lưu trữ video nào hỗ trợ link trực tiếp .mp4.
 *
 * Mỗi video gồm:
 *   type     : 'youtube' hoặc 'file'
 *   id       : (chỉ dùng cho youtube) mã video
 *   url      : (chỉ dùng cho file) link trực tiếp .mp4
 *   poster   : (chỉ dùng cho file) ảnh đại diện hiển thị trước khi bấm play
 *   title    : tên video hiển thị
 *   category : nhóm video để lọc
 * ===========================================================
 */

const VIDEO_CATEGORIES = [
    { id: 'all', label: 'Tất cả' },
    { id: 'review', label: 'Review tour' },
    { id: 'flycam', label: 'Flycam toàn cảnh' },
    { id: 'food', label: 'Ẩm thực' },
    { id: 'guide', label: 'Hướng dẫn di chuyển' }
];

const VIDEO_LIST = [
    {
        type: 'youtube',
        id: 'dNq22RsTy1A',
        title: 'Khám phá làng chài Thiên Tuế - Hòn Sơn',
        category: 'review'
    },
    {
        type: 'youtube',
        id: 'rqFnxshWvik',
        title: 'Thưởng thức hải sản tươi sống tại Hòn Sơn',
        category: 'food'
    },
    {
        type: 'youtube',
        id: 'dlY1rJ8riA8',
        title: 'Tiệc BBQ hải sản đêm trên đảo',
        category: 'food'
    },
    {
        type: 'youtube',
        id: 'LJzCHlNiCjQ',
        title: 'Toàn cảnh khu du lịch biển Hòn Sơn',
        category: 'flycam'
    }

    // ===== THÊM VIDEO YOUTUBE Ở DƯỚI DÒNG NÀY =====
    // ,{
    //     type: 'youtube',
    //     id: 'MÃ_VIDEO_YOUTUBE',
    //     title: 'Tên video của bạn',
    //     category: 'guide'
    // }
     ,{
        type: 'youtube',
        id: '81Q-OSHgS4g',
        title: 'Hướng dẫn di chuyển đến Hòn Sơn từ TP HCM-Rạch Giá',
        category: 'guide'
    }
     // ===== THÊM VIDEO FILE (.mp4) Ở DƯỚI DÒNG NÀY =====
    // ,{
    //     type: 'file',
    //     url: 'https://duong-dan-toi-video-cua-ban.mp4',
    //     poster: 'https://duong-dan-toi-anh-dai-dien.jpg',
    //     title: 'Tên video của bạn',
    //     category: 'review'
    // }
];
