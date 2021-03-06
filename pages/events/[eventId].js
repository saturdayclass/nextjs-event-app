import EventSummary from './../../components/event-detail/event-summary';
import EventLogistics from './../../components/event-detail/event-logistics';
import EventContent from './../../components/event-detail/event-content';
import ErrorAlert from './../../components/ui/error-alert';
import { getEventById, getAllEvents } from './../../helpers/api-util';
import Comments from '../../components/input/comments';
import Head from 'next/head';
function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
        <meta name="image" content={event.images} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.images}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventSelected = await getEventById(eventId);
  return {
    props: {
      event: eventSelected,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true,
  };
}
