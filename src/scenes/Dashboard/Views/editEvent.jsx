import events from "../data/events.json"
import types from "../data/eventTypes.json"
import status from "../data/eventStatus.json"
import EditEventForm from "../components/editEventForm"
import "../scss/editEvent.scss"

export default function EditEvent() {
    // console.log(events.)
    return (
        <div className="edit-event">
            {/* <div className="form"> */}
            <h2>
                Edit Event Details
            </h2>
            <EditEventForm events={events[0]} status={status} types={types} />
            {/* </div>?
            <div className="btns">
                <button>Save Changes</button>
                <button>Discard Changes</button>
            </div> */}
        </div>
    )

}