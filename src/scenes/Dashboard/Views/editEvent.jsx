// import events from "../data/events.json"
// import types from "../data/eventTypes.json"
// import status from "../data/eventStatus.json"
import EditEventForm from "../components/editEventForm"
import "../scss/editEvent.scss"
// eslint-disable-next-line no-unused-vars
import { useEvents, useEventStatuses, useEventTypes, useGetEvent } from "../../../hooks/useUserQuery"
import { CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"

export default function EditEvent() {
    const {id} = useParams()
    const { error: statusError, loading: statusLoading, data: statusData } = useEventStatuses()
    const { error: typesError, loading: typesLoading, data: typesData } = useEventTypes()
    const { error: eventsError, loading: eventsLoading, data: eventsData, refetch: eventRefetched } = useGetEvent(parseInt(id))

    if (statusError || typesError || eventsError) {
        return (<><p>Error has occured</p> <p>{statusError.message || typesError.message || eventsData}</p></>)
    }
    if (statusLoading || typesLoading || eventsLoading) {
        return <CircularProgress />
    }
    function raiseFlag()
    {
        eventRefetched()
    }
    const status = statusData.eventStatuses;
    const types = typesData.eventTypes;
    const event = eventsData.event;
    // console.log(event)
    return (
        <div className="edit-event">
            {/* <div className="form"> */}
            <h2>
                Edit Event Details
            </h2>
            <EditEventForm event={event} status={status} types={types} raiseFlag={raiseFlag}/>
            {/* </div>?
            <div className="btns">
                <button>Save Changes</button>
                <button>Discard Changes</button>
            </div> */}
        </div>
    )

}