import Link from 'next/link';
function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('id-ID');

  const formatedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={`${image}`} alt={title} />
      <section>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </section>
    </li>
  );
}

export default EventItem;
