'use client';

import { useState, Suspense } from 'react';
import { useExploreCtx } from '@/context/ExploreCtx';
import ExploreCard from '@/components/Cards/ExploreCard';
import ExploreCardSkel from '@/components/skelton/ExploreCardSkel';
import Button from '@/components/ui/button';
import { cn } from '@/utils';

const EventsGrid = () => {
  const [limit, setLimit] = useState<number>(6);
  const { events, eventsSearchTerm, selectedcategories } = useExploreCtx();

  const filteredEvents = events.filter(
    (event) => eventsSearchTerm === '' || event.title!.toLowerCase().includes(eventsSearchTerm.toLowerCase()),
  );

  const hasSearchResults = filteredEvents.length > 0;
  return (
    <>
      <div className="max-w-[1240px] mx-auto mb-10 lg:mb-24">
        <span className="text-primary-100">Discover</span>
        <h2 className="text-3xl font-bold mb-6 mt-2 text-Grey-G700 dark:text-dark-two">Popular Events</h2>
        <div
          className={cn('font-medium flex items-center gap-x-1', {
            hidden: eventsSearchTerm.length < 3,
          })}
        >
          <span
            className={cn('text-lg font-semibold text-gray-400 dark:text-gray-100', {
              'text-primary-100 dark:text-dark-two': hasSearchResults,
            })}
          >
            {filteredEvents.length}
          </span>
          <p className={cn('font-medium text-header dark:text-gray-200')}>
            {hasSearchResults ? `Search Result${filteredEvents.length > 1 ? 's' : ''} for` : 'No Results for'}{' '}
            <b className="dark:text-primary-100">&quot;{eventsSearchTerm}&quot;</b>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 lg:gap-x-7 lg:gap-y-8 mb-8 sm:mb-12">
          {filteredEvents.slice(0, limit).map((event) => (
            <Suspense key={event.eventID} fallback={<ExploreCardSkel />}>
              <ExploreCard {...event} />
            </Suspense>
          ))}
        </div>
        {limit < events.length && (
          <Button
            variant={'secondary'}
            size={'lg'}
            className={`text-sm shrink-0 border-primary-100 dark:border-dark-two bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border grid place-content-center font-bold text-primary-100 dark:text-dark-two rounded-lg mx-auto`}
            onClick={() => setLimit((prevState) => prevState + 6)}
          >
            View More
          </Button>
        )}
      </div>
    </>
  );
};

export default EventsGrid;
