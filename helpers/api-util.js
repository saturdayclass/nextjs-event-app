export async function getAllEvents() {
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
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}
