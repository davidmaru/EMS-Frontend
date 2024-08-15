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
import { useEffect, useState } from 'react';
import { useUpdateUser } from '../../../hooks/useMutations';

export function UserDetail({ user, roles, trigger = () => { } }) {
    const [formDetails, setFormDetails] = useState({
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
        password: null,
        roleId: user.role.id
    })
    const [updateUser, { data: updateUserData, error: updateUserError, loading: updateUserLoading }] = useUpdateUser();
    // console.log(formDetails)
    useEffect(() => {
        if (updateUserData) {
            trigger()
        }
    }, [updateUserData])
    function createHandler(key) {

        return function handler(value) {
            setFormDetails((prev) => ({ ...prev, [key]: value }))
        }
    }
    function handleSave() {
        updateUser({variables:formDetails})
        // console.log(formDetails)
    }
    return (
        <Paper className="user-detail-form" sx={{ p: 3, m: 2 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box className="details" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <EditDisplay defaultValue={user.userName} handler={createHandler("userName")} />
                <EditDisplay defaultValue={user.userEmail} handler={createHandler("userEmail")} />
                <EditDisplay defaultValue={"Change Password"} handler={createHandler("password")} />
                <EditDisplayRole role={user.role} roles={roles} handler={createHandler("roleId")} />
                <button
                    disabled={updateUserLoading}
                    onClick={(_) => handleSave()}>
                    Save changes
                </button>
            </Box>
            {updateUserError && <p>Error has occured</p>}
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

