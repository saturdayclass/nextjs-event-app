import { useRouter } from 'next/router';
import { getAllEvents } from './../../dummy-data';
import EventList from './../../components/events/event-list';
import EventSearch from './../../components/events/event-search';
function AllEventPage() {
  const router = useRouter();
  const events = getAllEvents();

  const searchEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>All Events</h1>
      <EventSearch onSearch={searchEventHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventPage;
