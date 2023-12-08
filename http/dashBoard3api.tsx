import AuthInstance from './AuthInstance';
import { eventType, getAuthToken, getUserId } from './profileapi';

const BaseUrl = 'https://evento-qo6d.onrender.com/api/v1';

//evento-qo6d.onrender.com/api/v1
const $AuthHttp = AuthInstance(BaseUrl);

export const getUserEvents = async () =>
  // setEvents: React.Dispatch<React.SetStateAction<eventType[]>>
  {
    const authToken = getAuthToken();
    const userId = getUserId();

    try {
      const response = await $AuthHttp.get(`/events/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const events = response.data.data;
      console.log(events);

      // const filteredEvents = events.filter((event: any) => event.organizerID === 'ab73f292-9267-4167-81f2-d85e9bd950d3');
      const currentTime = new Date();
      const pastEvents = events.filter((event: eventType) => {
        const endDateString = event.endDate;

        if (endDateString && typeof endDateString === 'string') {
          const endDate = new Date(endDateString);

          return endDate < currentTime;
        }

        return false;
      });

      const createdEvents = events
        .filter((event: any) => event.organizerID === userId)
        .filter((event: any) => {
          const endDateString = event.endDate;

          // Check if endDate exists and is a valid string
          if (endDateString && typeof endDateString === 'string') {
            const endDate = new Date(endDateString);

            return endDate >= currentTime;
          }

          return false;
        });

      // Filter for upcoming events where the user is a participant and remove past events
      const upcomingEvents = events
        .filter((event: eventType) => event.participants?.some((item) => item.userID === userId))
        .filter((event: eventType) => {
          const endDateString = event.endDate;

          if (endDateString && typeof endDateString === 'string') {
            const endDate = new Date(endDateString);

            return endDate >= currentTime;
          }

          return false;
        });

      console.log(createdEvents, upcomingEvents);

      if (response.status === 200) {
        console.log('Events gotten successfully');
      } else {
        console.error('Error fetching events', response.status, response.statusText);
      }
    } catch (error) {}
  };