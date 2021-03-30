import { useRouter } from 'next/router';
import { getAllEvents } from './../../helpers/api-util';
import EventList from './../../components/events/event-list';
import EventSearch from './../../components/events/event-search';
function AllEventPage(props) {
  const { events } = props;
  const router = useRouter();

  const searchEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <h1 className="center">All Events</h1>
      <EventSearch onSearch={searchEventHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventPage;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
}
