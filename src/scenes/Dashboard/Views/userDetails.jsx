import { useState } from "react";
import { Button, Container, Typography, Paper, Stack } from '@mui/material';
import EventList from "../components/eventList";
import { UserDetail } from "../components/userDetail";
import roles from "../data/roles.json";
import users from "../data/users.json";
import events from "../data/events.json";
import types from "../data/eventTypes.json";
import status from "../data/eventStatus.json";
import "../scss/eventDetails.scss";

export default function UserDetails() {
    const [organizedMode, setOrganizedMode] = useState(true);

    const user_details = {
        id: 1,
        userName: "hello",
        userEmail: "hello@gmail.com",
        role: {
            roleGroup: "Basic",
            id: 1
        }
    };

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
        return events.filter(e => e.organizerId === 99935);
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    User Details
                </Typography>
                <UserDetail user={users.users.find(u => u.id == 99935) || user_details} roles={roles.roles} />
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
