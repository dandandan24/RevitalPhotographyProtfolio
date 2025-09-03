'use client';

interface ReviewCardProps {
  name: string;
  type: string;
  review: string;
  stars: number;
  initial: string;
}

export default function ReviewCard({ name, type, review, stars, initial }: ReviewCardProps) {
  // Generate stars based on the stars prop
  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <span key={index} className="text-yellow-400">⭐</span>
    ));
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border-l-4 border-[#F1BDAF]">
      <div className="flex items-start space-x-2 md:space-x-4 space-x-reverse">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F1BDAF] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl flex-shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-end gap-2 mb-2">
            <div className="flex">
              {renderStars(stars)}
            </div>
            <h3 className="font-semibold text-gray-900 text-base md:text-lg" dir="rtl">{name}</h3>
          </div>
          <p className="text-gray-600 text-sm md:text-base mb-3 text-right" dir="rtl">{type}</p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg text-right" dir="rtl">
            "{review}"
          </p>
        </div>
      </div>
    </div>
  );
} 