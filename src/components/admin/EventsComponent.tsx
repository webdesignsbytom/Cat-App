import { useEffect, useState } from 'react';
import client from '../../api/client';
// Constants
import {
  DELETE_EVENT_URL,
  DELETEALL_EVENT_URL,
  EVENTS_GETALL_URL,
} from '../../utils/contstants/Constants';
// Events
import { EventItem, EventType } from '../../utils/app/AppInterface';
// Icons
import { MdDelete } from 'react-icons/md';

const EventsComponent: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');

  const getAllEvents = async () => {
    client
      .getAuth(`${EVENTS_GETALL_URL}`)
      .then((res) => {
        setEvents(res.data.data.events);
        setFilteredEvents(res.data.data.events);
      })
      .catch((err) => {
        console.error('Unable to get all events', err);
      });
  };

  const deleteEvent = async (eventId: string) => {
    client
      .delete(`${DELETE_EVENT_URL}/${eventId}`)
      .then((res) => {
        console.log('RES', res.data);
        updateEvents(eventId);
      })
      .catch((err) => {
        console.error('Unable to delete event', err);
      });
  };

  const updateEvents = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  const deleteAllEvents = async () => {
    client
      .delete(`${DELETEALL_EVENT_URL}`)
      .then((res) => {
        console.log('RES', res.data);
      })
      .catch((err) => {
        console.error('Unable to delete all events', err);
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

  const getCodeClass = (code: number) => {
    if (code >= 200 && code < 300) return 'text-green-600';
    if (code >= 300 && code < 400) return 'text-green-600';
    if (code >= 400 && code < 500) return 'text-orange-600';
    if (code >= 500) return 'text-red-600';
    return '';
  };

  return (
    <div className='grid grid-rows-reg overflow-hidden h-full w-full bg-gray-100'>
      {/* Filters */}
      <section className='flex justify-between mb-4 p-4'>
        <h1 className='text-2xl font-bold'>Events</h1>

        <div className='grid grid-flow-col gap-2'>
          <div className='grid items-center'>
            <MdDelete
              className='active:scale-95'
              onClick={deleteAllEvents}
              size={25}
            />
          </div>

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
            <option value='TEST'>Test</option>
          </select>
        </div>
      </section>

      {/* Reviews */}
      <section className='grid overflow-y-scroll h-full w-full p-2'>
        <div className='grid overflow-y-scroll h-fit w-full'>
          {filteredEvents.map((event, index) => (
            <article
              key={index}
              className='relative border p-2 mb-2 rounded text-xs h-fit bg-white'
            >
              <div className='absolute right-2 top-2'>
                <MdDelete
                  className='active:scale-95'
                  onClick={() => deleteEvent(event.id)}
                  size={20}
                />
              </div>
              <h2 className='text-base'>{event.topic}</h2>
              <div className='grid grid-cols-2'>
                <p className='font-semibold'>Type: {event.type}</p>
                <div className='text-end pr-2'>
                  <p className={getCodeClass(event.code)}>
                    <span className='font-semibold'>Code: {event.code}</span>
                  </p>
                </div>
              </div>
              <p>
                <span className='font-semibold'>Content:</span> {event.content}
              </p>
              {event.createdById && (
                <p>
                  <span className='font-semibold'>Created By:</span>{' '}
                  {event.createdById}
                </p>
              )}
              {event.receivedById && (
                <p>
                  <span className='font-semibold'>Received By:</span>{' '}
                  {event.receivedById}
                </p>
              )}
              <p>
                <span className='font-semibold'>Created At:</span>{' '}
                {new Date(event.createdAt).toLocaleString()}
              </p>
              <p>
                <span className='font-semibold'>Updated At:</span>{' '}
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
