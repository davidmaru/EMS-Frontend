import { useState } from "react";
import { Button, Container, Typography, Paper, Stack, CircularProgress } from '@mui/material';
import EventList from "../components/eventList";
import { UserDetail } from "../components/userDetail";
import "../scss/eventDetails.scss";
import { useParams } from "react-router-dom";
import { useEvents, useEventStatuses, useEventTypes, useRolesQuery, useUserQuery } from "../../../hooks/useUserQuery";

export default function UserDetails() {
    const [organizedMode, setOrganizedMode] = useState(true);
    const { error: statusError, loading: statusLoading, data: statusData } = useEventStatuses()
    const { error: typesError, loading: typesLoading, data: typesData } = useEventTypes()
    const { error: eventsError, loading: eventsLoading, data: eventsData } = useEvents()
    const { error: userError, loading: userLoading, data: userData, refetch: userRefetch } = useUserQuery(parseInt(useParams().id))
    const { error: rolesError, loading: rolesLoading, data: rolesData } = useRolesQuery()

    if (statusError || typesError || eventsError || userError || rolesError) {
        return (<><p>Error has occured</p> <p>{statusError.message || typesError.message || eventsError.message || userError.message || rolesError.message}</p></>)
    }
    if (statusLoading || typesLoading || eventsLoading || userLoading || rolesLoading) {
        return <CircularProgress />
    }

    const status = statusData.eventStatuses;
    const types = typesData.eventTypes;
    const events = eventsData.events;
    const user = userData.user
    const roles = rolesData.roles;

    function eventsAttended() {
        const count = 15;
        const eventz = [];
        const preventDuplicate = [];
        let i = 0;
        while (i < count) {
            const index = Math.floor(Math.random() * 100);
            if (preventDuplicate.includes(index)) {
                continue;
            }
            preventDuplicate.push(index);
            eventz[i] = events[index];
            i++;
        }
        return eventz;
    }

    function eventsOrganized() {
        return events.filter(e => e.organizerId === user.id);
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    User Details
                </Typography>
                {/* <UserDetail user={users.users.find(u => u.id == 99935) || user_details} roles={roles.roles} /> */}
                <UserDetail user={user} roles={roles} trigger={() => { userRefetch() }} />
            </Paper>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                    <Button
                        variant={!organizedMode ? "contained" : "outlined"}
                        onClick={() => setOrganizedMode(false)}
                    >
                        Attended
                    </Button>
                    <Button
                        variant={organizedMode ? "contained" : "outlined"}
                        onClick={() => setOrganizedMode(true)}
                    >
                        Organized
                    </Button>
                </Stack>
                <EventList
                    events={organizedMode ? eventsOrganized() : eventsAttended()}
                    types={types}
                    status={status}
                />
            </Paper>
        </Container>
    );
}
