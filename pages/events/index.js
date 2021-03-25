import { getAllEvents } from './../../dummy-data';
import EventList from './../../components/events/event-list';
import EventSearch from './../../components/events/event-search';
function AllEventPage() {
  const events = getAllEvents();
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>All Events</h1>
      <EventSearch />
      <EventList items={events} />
    </div>
  );
}

export default AllEventPage;
