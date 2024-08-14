/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import "../scss/editPermissions.scss";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EditPermissions({ permissions, rolePermissions }) {
    const [selectedPerm, setSelectedPerm] = useState(rolePermissions);

    useEffect(() => {
        if (rolePermissions) {
            setSelectedPerm(rolePermissions);
        }
    }, [rolePermissions]);

    function handleChange(perm) {
        setSelectedPerm((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    }

    

    return (
        <Box className="edit-permissions">
            <Box className="boxes">
                {permissions.map((perm) => (
                    <FormControlLabel
                        key={perm}
                        control={
                            <Checkbox
                                checked={selectedPerm.includes(perm)}
                                onChange={() => handleChange(perm)}
                                color="primary"
                            />
                        }
                        label={<Typography>{perm}</Typography>}
                    />
                ))}
            </Box>
            <Box className="btns" sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    //onClick={handleSave}
                    startIcon={<SaveIcon />}
                    sx={{ mr: 1 }}
                >
                    Save Changes
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSelectedPerm(rolePermissions)}
                    startIcon={<CancelIcon />}
                >
                    Discard Changes
                </Button>
            </Box>
        </Box>
    );
}
