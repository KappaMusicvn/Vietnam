
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const AIPlanner: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    const handleGeneratePlan = async () => {
        if (!prompt) {
            setError('Vui lòng nhập yêu cầu của bạn.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResponse('');

        try {
            // FIX: Initialize the GoogleGenAI client with the API key as a named parameter.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            // FIX: Use the recommended 'gemini-2.5-flash' model and correct API call structure.
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Bạn là một chuyên gia du lịch Việt Nam. Hãy tạo một lịch trình du lịch chi tiết, hấp dẫn và thực tế dựa trên yêu cầu sau: "${prompt}". Gợi ý các hoạt động, địa điểm ăn uống nổi tiếng và ước tính chi phí. Trả lời bằng tiếng Việt và định dạng Markdown.`,
            });
            
            // FIX: Correctly access the text response from the result object.
            const textResponse = result.text;
            const htmlResponse = await marked.parse(textResponse);
            setResponse(htmlResponse);

        } catch (err) {
            console.error(err);
            setError('Đã xảy ra lỗi khi tạo kế hoạch. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="ai-planner" ref={ref} className="min-h-screen w-full relative flex items-center justify-center text-center p-4 sm:p-8 overflow-hidden">
             <div className={`content-container relative z-10 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-card-bg backdrop-blur-xl border border-border-color rounded-2xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 animated-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>Trợ lý Du lịch AI</h2>
                    <p className="mb-8 text-text-color/80">Lên kế hoạch cho chuyến đi trong mơ của bạn với sức mạnh từ Google Gemini.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input 
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="VD: Kế hoạch 5 ngày khám phá Đà Nẵng - Hội An"
                            className="flex-grow p-3 rounded-lg bg-white/10 border border-border-color focus:ring-2 focus:ring-primary-color focus:outline-none transition-all"
                            disabled={isLoading}
                        />
                        <button 
                            onClick={handleGeneratePlan}
                            disabled={isLoading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                        >
                            {isLoading ? 'Đang tạo...' : 'Tạo kế hoạch'}
                        </button>
                    </div>

                    {error && <p className="text-red-400 mt-4">{error}</p>}

                    {response && (
                        <div 
                            className="mt-8 p-6 bg-black/20 rounded-lg text-left prose prose-invert max-w-none prose-p:text-text-color/90 prose-headings:text-primary-color"
                            dangerouslySetInnerHTML={{ __html: response }}
                        />
                    )}
                </div>
             </div>
        </section>
    );
};

export default AIPlanner;
