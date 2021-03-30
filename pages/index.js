import { getFeaturedEvents } from './../helpers/api-util';
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

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
  };
}
