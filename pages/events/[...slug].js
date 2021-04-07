import Head from 'next/head';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from './../../helpers/api-util';
import ResultsTitle from './../../components/events/results-title';
import ErrorAlert from './../../components/ui/error-alert';
import Button from './../../components/ui/button';

function FilteredEventPage(props) {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${props.numMonth}/${props.numYear}`}
      />
    </Head>
  );
  if (props.hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invlid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button links="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button links="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < '01' ||
    numMonth > '12'
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      numMonth,
      numYear,
    },
  };
}
