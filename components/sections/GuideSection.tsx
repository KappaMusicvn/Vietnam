
import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import type { SectionData } from '../../types';

interface GuideItemProps {
    title: string;
    content: string;
    icon: React.ReactNode;
}

const GuideItem: React.FC<GuideItemProps> = ({ title, content, icon }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-color/20 flex items-center justify-center" style={{ color: 'var(--primary-color)' }}>
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-text-color/80">{content}</p>
        </div>
    </div>
);

const GuideSection: React.FC<SectionData> = ({ title, subtitle }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    const guides = [
        {
            title: 'Tiền Tệ',
            content: 'Đơn vị tiền tệ chính thức là Việt Nam Đồng (VND). Thẻ tín dụng được chấp nhận ở các thành phố lớn, nhưng nên mang theo tiền mặt khi đi đến các vùng nông thôn.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        },
        {
            title: 'Ngôn Ngữ',
            content: 'Ngôn ngữ chính thức là tiếng Việt. Tiếng Anh được sử dụng rộng rãi trong ngành du lịch và ở các thành phố lớn.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9.5a17.903 17.903 0 01-5.696-9.5m11.392 0a17.903 17.903 0 01-5.696 9.5M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
        },
        {
            title: 'SIM & Internet',
            content: 'Bạn có thể dễ dàng mua SIM 4G tại sân bay hoặc các cửa hàng viễn thông. Wifi miễn phí có ở hầu hết các khách sạn, quán cà phê và nhà hàng.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
         {
            title: 'Thời Tiết',
            content: 'Việt Nam có khí hậu đa dạng. Miền Bắc có 4 mùa rõ rệt, trong khi miền Nam có 2 mùa mưa và khô. Hãy kiểm tra dự báo thời tiết trước chuyến đi.',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        },
    ];

    return (
        <div ref={ref} className={`content-container relative z-10 w-full transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-card-bg backdrop-blur-xl border border-border-color rounded-2xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 animated-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
                <p className="mb-8 text-text-color/80">{subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {guides.map(guide => <GuideItem key={guide.title} {...guide} />)}
                </div>
            </div>
        </div>
    );
};

export default GuideSection;
