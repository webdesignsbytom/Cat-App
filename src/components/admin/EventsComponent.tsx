// Api
import { useEffect, useState } from 'react';
import client from '../../api/client';
// Constants
import { EVENTS_GETALL_URL } from '../../utils/contstants/Constants';
// Events
import { EventItem, EventType } from '../../utils/app/AppInterface';

const EventsComponent: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');

  const getAllEvents = async () => {
    client
      .getAuth(`${EVENTS_GETALL_URL}`)
      .then((res) => {
        console.log('RES', res.data);
        setEvents(res.data.data.events);
        setFilteredEvents(res.data.data.events);
      })

      .catch((err) => {
        console.error('Unable to get all events', err);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (filterType === 'ALL') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.type === filterType));
    }
  }, [filterType, events]);

  return (
    <div className='grid grid-rows-reg overflow-hidden h-full w-full'>
      
      {/* Filters */}
      <section className='flex justify-between mb-4 p-4'>
        <h1 className='text-2xl font-bold'>Events</h1>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as EventType | 'ALL')}
          className='border p-2 rounded'
        >
          <option value='ALL'>All</option>
          <option value='ERROR'>Error</option>
          <option value='USER'>User</option>
          <option value='ADMIN'>Admin</option>
          <option value='VISITOR'>Visitor</option>
          <option value='DEVELOPER'>Developer</option>
          <option value='PURCHASE'>Purchase</option>
          <option value='MINING'>Mining</option>
          <option value='TEST'>Test</option>
        </select>
      </section>

      {/* Reviews */}
      <section className='grid overflow-hidden h-full w-full p-2'>
        <div className='grid overflow-y-auto h-full w-full'>
          {filteredEvents.map((event) => (
            <article key={event.id} className='border p-2 mb-2 rounded text-sm'>
              <h2 className='text-xl'>{event.topic}</h2>
              <p>Type: {event.type}</p>
              <p>Code: {event.code}</p>
              <p>Content: {event.content}</p>
              <p>Created By: {event.createdById}</p>
              <p>Received By: {event.receivedById}</p>
              <p>Viewed: {event.viewed ? 'Yes' : 'No'}</p>
              <p>Created At: {new Date(event.createdAt).toLocaleString()}</p>
              <p>
                Updated At:{' '}
                {event.updatedAt
                  ? new Date(event.updatedAt).toLocaleString()
                  : 'N/A'}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsComponent;
