import Head from 'next/head';
import { getFeaturedEvents } from './../helpers/api-util';
import NewsletterRegistration from '../components/input/newsletter-registration';
import EventList from './../components/events/event-list';
function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title>Nextjs Events App</title>
        <meta name="title" content="Nextjs Event app" />
      </Head>
      <NewsletterRegistration />

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
