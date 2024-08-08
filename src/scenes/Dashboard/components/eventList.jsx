import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Search from "./search.jsx";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Divider,
    Stack,
    TablePagination,
    tableCellClasses,
} from '@mui/material';

import { styled } from '@mui/system';
import "../scss/eventList.scss";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function EventList({ events=[], types=[], status=[] }) {
    const [eventList, setEventList] = useState(events);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ setEditingId] = useState(null); // Track which row is being edited
    const navigate = useNavigate()

    useEffect(() => {
        setEventList(events);
    }, [events]);

    const filterType = (type) => {
        if (type === "All") {
            setEventList(events);
            return;
        }
        const list = events.filter((event) => event.eventType === type);
        setEventList(list);
    };

    const filterStatus = (status) => {
        if (status === "All") {
            setEventList(events);
            return;
        }
        const list = events.filter((event) => event.status === status);
        setEventList(list);
    };

    const handleSearch = (value) => {
        if (value !== null) {
            const searchString = value.toLowerCase();
            const searchResult = events
                .filter((event) => event.eventName.toLowerCase().includes(searchString));
            setEventList(searchResult);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRowClick = (event, id) => {
        // Prevent navigation if the click is on the edit button
        if (event.target.closest('.edit-icon')) return;
        navigate(`/dashboard/event/${id}`);
    };
    const handleEditClick = (event, id) => {
        event.stopPropagation(); // Prevent row click
        setEditingId(id); // Set the editing row ID
    };


    return (
        <Box className="event-list" sx={{ p: 2 }}>
            <Box className="event-search" sx={{ mb: 2 }}>
                <Search handler={handleSearch} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={2} className="select-btns" sx={{ mb: 2 }}>
                <Box className="types">
                    <Typography variant="h6">Types</Typography>
                    <Stack direction="row" spacing={1} className="btns">
                        <Button variant="contained" onClick={() => filterType("All")}>All</Button>
                        {
                            types.map((type, index) => (
                                <Button variant="contained" key={index} onClick={() => filterType(type)}>
                                    {type}
                                </Button>
                            ))
                        }
                    </Stack>
                </Box>
                <Box className="status">
                    <Typography variant="h6">Status</Typography>
                    <Stack direction="row" spacing={1} className="btns">
                        <Button variant="contained" onClick={() => filterStatus("All")}>All</Button>
                        {
                            status.map((statu, index) => (
                                <Button variant="contained" key={index} onClick={() => filterStatus(statu)}>
                                    {statu}
                                </Button>
                            ))
                        }
                    </Stack>
                </Box>
            </Stack>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table className="event-table">
                    <TableHead>
                        <TableRow
                         key={event.id}
                         className="event-item"
                         onClick={(event) => handleRowClick(event, event.id)}
                        >
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Duration</StyledTableCell>
                            <StyledTableCell>Event Type</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            eventList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
                                <StyledTableRow key={event.id} className="event-item" onClick={()=> navigate(`/dashboard/event/${event.id}`)}>
                                    <StyledTableCell>{event.id}</StyledTableCell>
                                    <StyledTableCell>{event.eventName}</StyledTableCell>
                                    <StyledTableCell>{new Date(event.startDateTime).toLocaleDateString() + " " + new Date(event.startDateTime).toLocaleTimeString()}</StyledTableCell>
                                    <StyledTableCell>{event.duration}</StyledTableCell>
                                    <StyledTableCell>{event.eventType}</StyledTableCell>
                                    <StyledTableCell>{event.status}</StyledTableCell>
                                    <StyledTableCell>
                                    <EditIcon
                                            className="edit-icon"
                                            sx={{ cursor: 'pointer' }}
                                            fontSize='small'
                                            onClick={(event) => handleEditClick(event, event.id)} // Handle edit click
                                        />
                                    </StyledTableCell>   
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={eventList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

EventList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        eventName: PropTypes.string.isRequired,
        startDateTime: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        eventType: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    })).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.arrayOf(PropTypes.string).isRequired,
};

