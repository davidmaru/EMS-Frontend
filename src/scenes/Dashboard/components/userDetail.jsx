import PropTypes from 'prop-types';
import EditDisplay from "./editDisplay";
import EditDisplayRole from "./editDisplayRole";
import {
    Box,
    Typography,
    Paper,
    Divider,
    //TextField,
    //MenuItem,
} from '@mui/material';
import "../scss/userDetail.scss";

export function UserDetail({ user, roles }) {
    return (
        <Paper className="user-detail-form" sx={{ p: 3, m: 2 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box className="details" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <EditDisplay defaultValue={user.userName} />
                <EditDisplay defaultValue={user.userEmail} />
                <EditDisplay defaultValue={"ChangePassword"} />
                <EditDisplayRole role={user.role} roles={roles} />
            </Box>
        </Paper>
    );
}

// UserDetail.propTypes = {
//     user: PropTypes.shape({
//         userName: PropTypes.string.isRequired,
//         userEmail: PropTypes.string.isRequired,
//         role: PropTypes.string.isRequired,
//     }).isRequired,
//     roles: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

