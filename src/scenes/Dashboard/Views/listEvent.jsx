import events from "../data/events.json"
import types from "../data/eventTypes.json"
import status from "../data/eventStatus.json"
import EventList  from "../components/eventList"
export default function ListEvent()
{
    return(
    <>
        <EventList events={events} types={types} status={status}/>
    </>
    )
}