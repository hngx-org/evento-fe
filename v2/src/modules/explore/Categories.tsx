'use client';

import React from 'react';
import { useExploreCtx } from '@/context/ExploreCtx';
import { IoFootballOutline } from 'react-icons/io5';
import { CiBasketball } from 'react-icons/ci';
import { FaVolleyballBall, FaTableTennis } from 'react-icons/fa';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import { TbPlayHandball, TbSwimming } from 'react-icons/tb';
import { MdOutlineSportsRugby, MdOutlineGolfCourse, MdSportsCricket, MdOutlineSportsTennis } from 'react-icons/md';
import { IoBicycle } from 'react-icons/io5';
import { RiSailboatFill } from 'react-icons/ri';
import { GrRun } from 'react-icons/gr';
import Button from '@/components/ui/button';
import { cn } from '@/utils';

const Categories = () => {
  const catergoryIcon = [
    { name: 'Basketball', icon: <CiBasketball /> },
    { name: 'Table Tennis', icon: <FaTableTennis /> },
    { name: 'Volleyball', icon: <FaVolleyballBall /> },
    { name: 'Wrestling', icon: <GiBoxingGlove /> },
    { name: 'Cricket', icon: <MdSportsCricket /> },
    { name: 'Handball', icon: <TbPlayHandball /> },
    { name: 'Weightlifting', icon: <GiWeightLiftingUp /> },
    { name: 'Badminton', icon: <GrRun /> },
    { name: 'Taekwondo', icon: <GrRun /> },
    { name: 'Judo', icon: <GrRun /> },
    { name: 'Tennis', icon: <MdOutlineSportsTennis /> },
    { name: 'Swimming', icon: <TbSwimming /> },
    { name: 'Rugby', icon: <MdOutlineSportsRugby /> },
    { name: 'Cycling', icon: <IoBicycle /> },
    { name: 'Golf', icon: <MdOutlineGolfCourse /> },
    { name: 'Dambe', icon: <GrRun /> },
    { name: 'Canoeing', icon: <RiSailboatFill /> },
    { name: 'Football', icon: <IoFootballOutline /> },
    { name: 'Athletics', icon: <GrRun /> },
    { name: 'Boxing', icon: <GiBoxingGlove /> },
  ];

  const getCategoryIcon = (categoryTitle: string) => {
    const category = catergoryIcon.find((cat) => cat.name === categoryTitle);
    return category ? category.icon : <GrRun />;
  };

  const { categories, setSelectedcategories } = useExploreCtx();
  return (
    <main className="max-w-[1240px] mx-auto px-4">
      <section className="py-10 sm:pt-16 sm:pb-20">
        <h2 className="hidden sm:block text-3xl font-bold mb-7 text-Grey-G700 dark:text-dark-two font-montserrat">
          Category
        </h2>
        <div className="flex no-scrollbar flex-nowrap overflow-scroll md:flex-wrap md:justify-center md:p-2 gap-x-4 lg:gap-x-3 gap-y-4">
          {categories.map((category) => (
            <Button
              key={category.categoryID}
              leftIcon={getCategoryIcon(category.name)}
              variant={'secondary'}
              size={'sm'}
              className={cn(
                'rounded-full py-2 text-sm shrink-0 border-primary-100 bg-transparent border font-bold font-nunito dark:border-dark-two',
              )}
              //   className={`${nunito.className} ${
              //     // selectedCategory === item.categoryID ? 'bg-primary-100 text-white-100' : ''
              //   }`}
              onClick={() => setSelectedcategories(category.categoryID)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Categories;
