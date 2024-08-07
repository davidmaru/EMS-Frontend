import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { 
    IconButton,
    Select,
    MenuItem,
    Typography,
    //Stack
} from '@mui/material';
import  Box  from "@mui/material/Box"
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import "../scss/edit-display-role.scss";

export default function EditDisplayRole({ role, roles, handler=()=>{}, discardController = null }) {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(role.id);

    const handleCrossClick = () => {
        setValue(role.id);
        setEditMode(false);
    };

    const handleSaveClick = () => {
        handler(value);
        setEditMode(false);
    };

    useEffect(() => {
        setValue(role.id);
    }, [role.id, discardController]);

    return (
        <Box className="edit-display-role" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!editMode ? (
                <>
                    <Typography variant="body1" className="display">
                        {roles.find((r) => r.id === value).roleGroup}
                    </Typography>
                    <IconButton size="small" onClick={() => setEditMode(true)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </>
            ) : (
                <>
                    <Select
                        name="role"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        sx={{ minWidth: 120 }}
                    >
                        {roles.map((r) => (
                            <MenuItem value={r.id} key={r.id}>
                                {r.roleGroup}
                            </MenuItem>
                        ))}
                    </Select>
                    <IconButton size="small" onClick={handleCrossClick}>
                        <ClearIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={handleSaveClick}>
                        <SaveIcon fontSize="small" />
                    </IconButton>
                </>
            )}
        </Box>
    );
}

EditDisplayRole.propTypes = {
    role: PropTypes.shape({
        id: PropTypes.number.isRequired,
        roleGroup: PropTypes.string.isRequired
    }).isRequired,
    roles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        roleGroup: PropTypes.string.isRequired
    })).isRequired,
    handler: PropTypes.func,
    discardController: PropTypes.any
};

// EditDisplayRole.defaultProps = {
//     handler: () => {},
//     discardController: null
// };
