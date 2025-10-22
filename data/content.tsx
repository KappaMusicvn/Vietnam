import React from 'react';
import type { NavLinkData, SectionData } from '../types';

import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import TimelineSection from '../components/sections/TimelineSection';
import GuideSection from '../components/sections/GuideSection';
import InteractiveMap from '../components/map/InteractiveMap';

// Icons for navigation
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const NorthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>;
const CentralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SouthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const TimelineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l6-3m-6 3V7m0 10l-6-3" /></svg>;
const GuideIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-8.494h18m-18 4h18M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;


export const navLinks: NavLinkData[] = [
    { id: 'home', href: '#home', icon: <HomeIcon />, tooltip: 'Trang Chủ', color: '#1d4ed8' },
    { id: 'north', href: '#north', icon: <NorthIcon />, tooltip: 'Miền Bắc', color: '#16a34a' },
    { id: 'central', href: '#central', icon: <CentralIcon />, tooltip: 'Miền Trung', color: '#f97316' },
    { id: 'south', href: '#south', icon: <SouthIcon />, tooltip: 'Miền Nam', color: '#f59e0b' },
    { id: 'timeline', href: '#timeline', icon: <TimelineIcon />, tooltip: 'Dòng Thời Gian', color: '#6366f1' },
    { id: 'guide', href: '#guide', icon: <GuideIcon />, tooltip: 'Cẩm Nang', color: '#ec4899' },
    { id: 'map', href: '#map', icon: <MapIcon />, tooltip: 'Bản Đồ', color: '#0ea5e9' },
];

export const sectionsData: SectionData[] = [
    {
        id: 'home',
        title: 'Hành trình khám phá vẻ đẹp bất tận của Việt Nam.',
        component: HeroSection,
    },
    {
        id: 'north',
        title: 'Miền Bắc Hùng Vĩ',
        subtitle: 'Khám phá vẻ đẹp nguyên sơ, hùng vĩ của núi rừng Tây Bắc, nét cổ kính của thủ đô ngàn năm văn hiến và những vịnh biển kỳ quan thế giới.',
        readMore: 'Miền Bắc Việt Nam là nơi hội tụ của những dãy núi cao chót vót, những thửa ruộng bậc thang kỳ vĩ và nền văn hóa đa dạng của các dân tộc anh em. Từ Hà Nội cổ kính đến Vịnh Hạ Long huyền ảo, từ Sapa mờ sương đến Hà Giang cheo leo, mỗi điểm đến đều mang một câu chuyện riêng, một vẻ đẹp riêng đang chờ bạn khám phá.',
        readMoreId: 'north-more',
        videoBackground: 'https://cdn.coverr.co/videos/coverr-a-drone-shot-of-a-road-in-the-mountains-2748/1080p.mp4',
        gallery: [
            { src: 'https://images.unsplash.com/photo-1595825223706-5c5a87b69333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Vịnh Hạ Long', title: 'Vịnh Hạ Long' },
            { src: 'https://images.unsplash.com/photo-1534214526114-0ea5d21a11da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Ruộng bậc thang Sapa', title: 'Sapa' },
            { src: 'https://images.unsplash.com/photo-1558991374-2f4c3a55b9a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Phố cổ Hà Nội', title: 'Hà Nội' },
        ],
        coordinates: [21.0285, 105.8542],
        component: GallerySection,
    },
    {
        id: 'central',
        title: 'Miền Trung Di Sản',
        subtitle: 'Hành trình về với những di sản văn hóa thế giới, những bãi biển trong xanh cát trắng và nền ẩm thực tinh tế, đặc sắc.',
        readMore: 'Dải đất miền Trung hẹp nhưng chứa đựng những giá trị văn hóa và lịch sử to lớn. Từ Cố đô Huế mộng mơ, Phố cổ Hội An trầm mặc, đến những bãi biển quyến rũ ở Đà Nẵng, Nha Trang. Nơi đây còn níu chân du khách bởi những món ăn đậm đà hương vị, mang trọn vẹn tinh hoa ẩm thực Việt.',
        readMoreId: 'central-more',
        videoBackground: 'https://cdn.coverr.co/videos/coverr-a-man-in-a-conical-hat-on-a-boat-4250/1080p.mp4',
        gallery: [
            { src: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Phố cổ Hội An', title: 'Hội An' },
            { src: 'https://images.unsplash.com/photo-1560942485-b2a1a67104b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Cầu Vàng, Đà Nẵng', title: 'Đà Nẵng' },
            { src: 'https://images.unsplash.com/photo-1596422849547-2b893d3d69a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Kinh thành Huế', title: 'Huế' },
        ],
        coordinates: [16.0544, 108.2022],
        component: GallerySection,
    },
    {
        id: 'south',
        title: 'Miền Nam Sôi Động',
        subtitle: 'Trải nghiệm nhịp sống hiện đại, sôi động của Sài Gòn, khám phá sự trù phú của miền Tây sông nước và đắm mình trong làn nước biển Phú Quốc.',
        readMore: 'Miền Nam là vùng đất của sự năng động, hiện đại và phóng khoáng. Thành phố Hồ Chí Minh sầm uất, không ngủ, trái ngược với sự yên bình, giản dị của những miệt vườn cây trái ở đồng bằng sông Cửu Long. Hay bạn cũng có thể tìm đến những hòn đảo thiên đường như Phú Quốc, Côn Đảo để tận hưởng kỳ nghỉ tuyệt vời.',
        readMoreId: 'south-more',
        videoBackground: 'https://cdn.coverr.co/videos/coverr-a-woman-paddling-a-boat-on-a-river-in-a-forest-8822/1080p.mp4',
        gallery: [
            { src: 'https://images.unsplash.com/photo-1583417319070-4a69db38a430?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Chợ nổi Cái Răng', title: 'Miền Tây' },
            { src: 'https://images.unsplash.com/photo-1574360251142-3e2b21a3a370?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Bưu điện trung tâm Sài Gòn', title: 'TP. Hồ Chí Minh' },
            { src: 'https://images.unsplash.com/photo-1616574163544-73c4f52a65a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', alt: 'Bãi biển Phú Quốc', title: 'Phú Quốc' },
        ],
        coordinates: [10.8231, 106.6297],
        component: GallerySection,
    },
    {
        id: 'timeline',
        title: 'Dòng Chảy Lịch Sử',
        component: TimelineSection,
        timeline: [
            {
                id: 'tl1', date: '1010', title: 'Vua Lý Thái Tổ dời đô về Thăng Long',
                details: 'Mở đầu cho một kỷ nguyên phát triển rực rỡ của thủ đô Hà Nội ngày nay.',
                image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/43/e8/98/img-20190714-114704-largejpg.jpg?w=1200&h=-1&s=1',
                icon: <TimelineIcon />,
            },
            {
                id: 'tl2', date: '1802', title: 'Nhà Nguyễn thống nhất đất nước',
                details: 'Vua Gia Long lên ngôi, lập nên triều đại phong kiến cuối cùng của Việt Nam, đặt kinh đô tại Phú Xuân (Huế).',
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Kinh_th%C3%A0nh_Hu%E1%BA%BF_-_Ho%C3%A0ng_Th%C3%A0nh_-_Ng%E1%BB_M%C3%B4n_-_L%E1%BA%A7u_Ng%C5%A9_Ph%E1%BB%A5ng_04.JPG',
                icon: <TimelineIcon />,
            },
            {
                id: 'tl3', date: '1945', title: 'Bác Hồ đọc Tuyên ngôn Độc lập',
                details: 'Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ho_Chi_Minh_1945.jpg/800px-Ho_Chi_Minh_1945.jpg',
                icon: <TimelineIcon />,
            },
            {
                id: 'tl4', date: '1975', title: 'Giải phóng miền Nam, thống nhất đất nước',
                details: 'Chiến dịch Hồ Chí Minh toàn thắng, kết thúc 21 năm kháng chiến chống Mỹ, non sông thu về một mối.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Dinhdoclap.jpg/1200px-Dinhdoclap.jpg',
                icon: <TimelineIcon />,
            }
        ]
    },
    {
        id: 'guide',
        title: 'Cẩm Nang Du Lịch',
        subtitle: 'Những thông tin hữu ích cho chuyến đi của bạn.',
        component: GuideSection,
    },
    {
        id: 'map',
        title: 'Bản Đồ Tương Tác',
        component: InteractiveMap,
    },
];