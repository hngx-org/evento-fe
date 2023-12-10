import { Menu, Transition } from '@headlessui/react';
import { ArrowCircleLeft, Story, ArrowCircleRight } from 'iconsax-react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { Fragment, useState } from 'react';
import { Event } from '@/@types';
import Image from 'next/image';
import { eventType } from '@/http/profileapi';

// const events: Event[] = [
//   {
//     id: 1,
//     name: 'Leslie Alexander',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2023-12-09T13:00',
//     endDatetime: '2023-12-12T14:30',
//   },
//   {
//     id: 2,
//     name: 'Michael Foster',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2023-12-20T09:00',
//     endDatetime: '2023-12-20T12:30',
//   },
//   {
//     id: 3,
//     name: 'Dries Vincent',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2023-12-20T17:00',
//     endDatetime: '2023-12-20T18:30',
//   },
//   {
//     id: 4,
//     name: 'Leslie Alexander',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2023-06-09T13:00',
//     endDatetime: '2023-06-09T14:30',
//   },
//   {
//     id: 5,
//     name: 'Michael Foster',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2023-12-13T14:00',
//     endDatetime: '2023-12-13T14:30',
//   },
// ];

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface CalendarProps {
  events: eventType[];
}

// const ProfileEvent: React.FC<CalendarProps>;
const EventCalender3: React.FC<CalendarProps> = ({ events }) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth(): void {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth(): void {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const selectedDayevents = events.filter((meeting) => {
    const startDateString = meeting.startDate; // Extract startDate
    if (startDateString && typeof startDateString === 'string') {
      const startDate = parseISO(startDateString);
      if (startDate) {
        // Check if startDate is valid before using isSameDay
        return isSameDay(startDate, selectedDay);
      }
    }
    return false; // Return false for invalid or undefined startDate
  });

  return (
    <div className="">
      <div className=" ">
        <div className=" w-fit">
          <div className="w-[366px]">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">{format(firstDayCurrentMonth, 'MMMM yyyy')}</h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ArrowCircleLeft size="32" color="#FF8A65" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ArrowCircleRight size="32" color="#FF8A65" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5')}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) && isToday(day) && 'text-primary-100',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-primary-100',
                      isEqual(day, selectedDay) && !isToday(day) && 'bg-secondary-100',
                      !isEqual(day, selectedDay) && 'hover:bg-secondary-100',
                      (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {events.some((meeting) => {
                      if (meeting.startDate) {
                        const startDate = parseISO(meeting.startDate);
                        return startDate && isSameDay(startDate, day);
                      }
                      return false;
                    }) && <div className="w-1 h-1 rounded-full bg-primary-100"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <section className="mt-12 md:mt-0 md:pl-14 ">
            <h2 className="font-semibold text-gray-900">
              Events Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyy')}</time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayevents.length > 0 ? (
                // i hid it first
                selectedDayevents.map((meeting) => <Meeting event={meeting} key={meeting.id} />)
              ) : (
                <p>No events for today.</p>
              )}
            </ol>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default EventCalender3;

interface EventProps {
  event: Event;
}

function Meeting({ event }: EventProps): JSX.Element {
  const startDateTime = parseISO(event.startDatetime);
  const endDateTime = parseISO(event.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <Image src={event.imageUrl} alt="" width={30} height={20} className="flex-none w-10 h-10 rounded-full" />
      <div className="flex-auto">
        <p className="text-gray-900">{event.name}</p>
        <p className="mt-0.5">
          <time dateTime={event.startDatetime}>{format(startDateTime, 'h:mm a')}</time> -{' '}
          <time dateTime={event.endDatetime}>{format(endDateTime, 'h:mm a')}</time>
        </p>
      </div>
      <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <Story size="12" color="#FF8A65" variant="Bold" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];
