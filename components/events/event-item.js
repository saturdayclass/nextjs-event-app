import Link from 'next/link';
import classes from './event-item.module.css';
function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('id-ID');

  const formatedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`${image}`} alt={title} />
      <section className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.action}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </section>
    </li>
  );
}

export default EventItem;
