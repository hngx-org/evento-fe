'use client';

import React, { SetStateAction, createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { EventProps, CategoryProps } from '@/types';
import { allevent, allcategories, geteventsbycategories } from '@/actions/expore';

// Add Your Props here
interface ExploreContextProps {
  events: EventProps[];
  setevents: React.Dispatch<SetStateAction<EventProps[]>>;
  eventsSearchTerm: string;
  seteventsSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoryProps[];
  setcategories: React.Dispatch<SetStateAction<CategoryProps[]>>;
  catLoading: boolean;
  setcatLoading: React.Dispatch<React.SetStateAction<boolean>>;
  eventsLoading: boolean;
  seteventsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedcategories: string;
  setSelectedcategories: React.Dispatch<React.SetStateAction<string>>;
}

export const ExploreContext = createContext({} as ExploreContextProps);

const ExploreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setevents] = useState([] as EventProps[]);
  const [eventsSearchTerm, seteventsSearchTerm] = useState('');
  const [categories, setcategories] = useState([] as CategoryProps[]);
  const [catLoading, setcatLoading] = useState(false);
  const [eventsLoading, seteventsLoading] = useState(false);
  const [selectedcategories, setSelectedcategories] = useState('all');

  console.log(selectedcategories);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        setcatLoading(true);
        const cat = await allcategories();
        if (cat?.status === 'success') {
          setcategories(cat.categories);
        } else {
        }
      } catch (err) {
        console.log(err);
      } finally {
        setcatLoading(false);
      }
    };

    fetchUserData();
  }, [categories]);

  useLayoutEffect(() => {
    const fetchEvents = async () => {
      try {
        seteventsLoading(true);

        if (selectedcategories === 'all') {
          const allEventsResult = await allevent();
          if (allEventsResult?.status === 'success') {
            setevents(allEventsResult.events);
            seteventsLoading(false);
          }
        } else {
          const eventsByCategoryResult = await geteventsbycategories(selectedcategories);
          if (eventsByCategoryResult?.status === 'success') {
            setevents(eventsByCategoryResult.events || []);
            seteventsLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, [selectedcategories, events]);

  const value = useMemo(
    () => ({
      events,
      setevents,
      eventsSearchTerm,
      seteventsSearchTerm,
      categories,
      setcategories,
      catLoading,
      setcatLoading,
      eventsLoading,
      seteventsLoading,
      selectedcategories,
      setSelectedcategories,
    }),
    [events, eventsSearchTerm, categories, selectedcategories],
  );

  return <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>;
};

// Call this function whenever you want to use the context
export const useExploreCtx = () => {
  const ctx = useContext(ExploreContext);

  if (!ctx) {
    throw new Error('useExploreCtx must be used within a ExploreContextProvider');
  }
  return ctx;
};

export default ExploreContextProvider;
