import Image from 'next/image';
import classes from './event-item.module.css';
import Button from './../ui/button';
import AddressIcon from './../icons/address-icon';
import ArrowRightIcon from './../icons/arrow-right-icon';
import DateIcon from './../icons/date-icon';
function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('id-ID');

  const formatedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={`${image}`} alt={title} width={250} height={160} />
      <section className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            Explore Event
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </section>
    </li>
  );
}

export default EventItem;
