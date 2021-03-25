import EventItem from './event-item';
import classes from './event-list.module.css';
function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item, i) => (
        <EventItem
          key={i}
          date={item.date}
          id={item.id}
          title={item.title}
          image={item.image}
          location={item.location}
          address={item.address}
        />
      ))}
    </ul>
  );
}

export default EventList;
