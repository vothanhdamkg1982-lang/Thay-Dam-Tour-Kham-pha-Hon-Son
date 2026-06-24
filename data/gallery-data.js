/**
 * ===========================================================
 * KHO ẢNH - DANH SÁCH ẢNH
 * ===========================================================
 * Đây là file DUY NHẤT bạn cần sửa khi muốn THÊM / XOÁ / SỬA ảnh.
 * Không cần biết HTML/CSS, chỉ cần copy 1 khối {...} rồi dán thêm,
 * sửa lại url, caption, category cho phù hợp.
 *
 * KHÔNG GIỚI HẠN số lượng ảnh - thêm bao nhiêu dòng cũng được.
 *
 * Mỗi ảnh gồm:
 *   url      : link ảnh (dán link trực tiếp tới file ảnh .jpg/.png/.webp)
 *   caption  : chú thích hiển thị dưới ảnh khi xem full
 *   category : nhóm ảnh để lọc (xem danh sách nhóm ở GALLERY_CATEGORIES)
 *
 * Lưu ý: nhớ đặt dấu phẩy "," sau mỗi khối {...} (trừ khối cuối cùng).
 * ===========================================================
 */

const GALLERY_CATEGORIES = [
    { id: 'all', label: 'Tất cả' },
    { id: 'beach', label: 'Biển & Bãi tắm' },
    { id: 'food', label: 'Ẩm thực' },
    { id: 'culture', label: 'Văn hoá - Tâm linh' },
    { id: 'stay', label: 'Lưu trú' },
    { id: 'activity', label: 'Hoạt động' }
];

const GALLERY_IMAGES = [
    {
        url: 'https://rootytrip.com/wp-content/uploads/2025/04/bai-bang-hon-son-phu-quoc-min.jpg',
        caption: 'Bãi biển Hòn Sơn',
        category: 'beach'
    },
    {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pDRw_H5Qyjther78slC4WvsP9JwpjGtwAQ&s',
        caption: 'Dinh Ông Nam Hải',
        category: 'culture'
    },
    {
        url: 'https://mia.vn/media/uploads/blog-du-lich/cay-dua-nghieng-bai-bang-diem-check-in-noi-tieng-hon-son-1-1669220788.jpg',
        caption: 'Bãi Bàng - Cây dừa nghiêng',
        category: 'beach'
    },
    {
        url: 'https://www.kupi.com/kland-storage/images/670x0/30x30/attractions/vn/qui-nhon/mr-moc-fresh-seafood/a5948c7f-fdd3-4033-bc6b-3ea801689f7e.webp',
        caption: 'Hải sản tươi sống',
        category: 'food'
    },
    {
        url: 'https://i.ytimg.com/vi/dNq22RsTy1A/maxresdefault.jpg',
        caption: 'Làng chài Thiên Tuế',
        category: 'culture'
    },
    {
        url: 'https://phuot3mien.com/wp-content/uploads/2024/04/trai-moi-homestay-tren-ma-thien-lanh-hon-son-ngam-hoang-hon-bao-phe-LeDF.jpg',
        caption: 'Hoàng hôn Hòn Sơn',
        category: 'beach'
    },
    {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhwxXyxuNsKYutlx0LREOifTivLb3yVx4Qw&s',
        caption: 'Bến tàu Rạch Giá',
        category: 'activity'
    },
    {
        url: 'https://i.ytimg.com/vi/rqFnxshWvik/maxresdefault.jpg',
        caption: 'Nhà hàng hải sản',
        category: 'food'
    },
    {
        url: 'https://ticotravel.com.vn/wp-content/uploads/2023/10/resort_hon_son_7.jpg',
        caption: 'Phòng nghỉ Resort',
        category: 'stay'
    },
    {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-v8tDHHAUBroBuEn0mkYMXV_cZUY1G3n05A&s',
        caption: 'Tiệc BBQ hải sản',
        category: 'food'
    },
    {
        url: 'https://i.ytimg.com/vi/dlY1rJ8riA8/maxresdefault.jpg',
        caption: 'Hải sản tươi ngon',
        category: 'food'
    },
    {
        url: 'https://i.ytimg.com/vi/LJzCHlNiCjQ/maxresdefault.jpg',
        caption: 'Khu du lịch biển',
        category: 'beach'
    }

    // ===== THÊM ẢNH MỚI Ở DƯỚI DÒNG NÀY =====
    // Copy khối mẫu dưới đây, bỏ dấu // ở đầu mỗi dòng, rồi sửa nội dung:
    //
    ,{
        url: 'https://bizweb.dktcdn.net/100/514/927/files/du-lich-hon-son-2-ngay-1-dem-tu-tuc-7.webp?v=1775027565223',
        caption: 'Bè nuôi hải sản',
        category: 'activity'
    }
      ,{
        url: 'https://i.ex-cdn.com/vntravellive.com/files/content/2025/06/04/dji_20250420150446_0022_d-1013.jpg',
        caption: 'Toàn cảnh cảng biển Hòn Sơn',
        category: 'activity'
    }
    ,{
        url: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2026/5/22/1706064/21B.jpg?w=800&h=496&crop=auto&scale=both',
        caption: 'Dọc theo bờ biển Hòn Sơn',
        category: 'activity'
    }
    ,{
        url: 'https://honson.com.vn/wp-content/uploads/2025/08/z6974321603430_861c8388f5db094379a80b46ebbf616c_result.jpg',
        caption: 'Lặn biển ngắm san hô-Chèo thuyền Kayak',
        category: 'activity'
    }
       ,{
        url: 'https://images2.thanhnien.vn/zoom/736_460/528068263637045248/2025/12/25/z736396951470253a7d07442654172182d2524ea4c0b53-17666501304761939846049-320-0-1920-2560-crop-17666505042181988640140.jpg',
        caption: 'Góc nhìn từ trên cao Hòn Sơn',
        category: 'activity'
    }
     ,{
        url: 'https://cdn3.ivivu.com/2023/03/Hon-Son-Kien-Giang.jpg',
        caption: 'Đá con rùa năm xưa',
        category: 'activity'
    }
];
