import { getFeaturedEvents } from './../dummy-data';
import EventList from './../components/events/event-list';
function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getServerSideProps(context) {
  const req = await fetch(
    'https://nextjs-data-fetching-b085e-default-rtdb.firebaseio.com/events.json'
  );
  const res = await req.json();

  const events = [];

  for (const key in res) {
    const event = {
      id: key,
      ...res[key],
    };

    events.push(event);
  }
  const featuredEvents = events.filter((event) => event.isFeatured === true);

  return {
    props: {
      featuredEvents: featuredEvents,
    },
  };
}
