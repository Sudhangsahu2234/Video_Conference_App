'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-gradient-to-br from-indigo-1 to-violet-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px] backdrop-blur-md">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-lg font-normal text-gray-200">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
