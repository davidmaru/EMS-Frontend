// import events from "../data/events.json"
// import types from "../data/eventTypes.json"
// import status from "../data/eventStatus.json"
import EventList from "../components/eventList"
import { useEvents, useEventStatuses, useEventTypes } from "../../../hooks/useUserQuery"
import { CircularProgress } from "@mui/material"

export default function ListEvent() {
    const { error: statusError, loading: statusLoading, data: statusData } = useEventStatuses()
    const { error: typesError, loading: typesLoading, data: typesData } = useEventTypes()
    const { error: eventsError, loading: eventsLoading, data: eventsData } = useEvents()

    if (statusError || typesError || eventsError) {
        return (<><p>Error has occured</p> <p>{statusError.message || typesError.message || eventsData}</p></>)
    }
    if (statusLoading || typesLoading || eventsLoading) {
        return <CircularProgress />
    }
    const status = statusData.eventStatuses;
    const types = typesData.eventTypes;
    const events = eventsData.events;
    return (
        <>
            <EventList events={events} types={types} status={status} />
        </>
    )
}