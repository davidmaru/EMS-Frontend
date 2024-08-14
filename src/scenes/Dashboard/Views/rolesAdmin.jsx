import { useState } from "react";
import { Box, CircularProgress, Typography, Divider, IconButton, List, ListItem, ListItemText, Paper, Card, CardContent, Tooltip, Alert, Tabs, Tab, Grid, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { usePermissions, useRolesDetails } from "../../../hooks/useUserQuery";
import EditDisplay from "../components/editDisplay";
import EditPermissions from "../components/editPermissions";
import { useTheme } from '../UseTheme';
import "../scss/rolesAdmin.scss";

export default function RolesAdmin() {
    const [editMode, setEditMode] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null); // No role selected by default
    const [tabValue, setTabValue] = useState(0);
    const { mode, toggleMode } = useTheme();

    const { error: rolesError, loading: rolesLoading, data: rolesData } = useRolesDetails();
    const { error: permError, loading: permLoading, data: permData } = usePermissions();

    if (rolesError || permError) {
        return (
            <Box mt={5} textAlign="center">
                <Alert severity="error" sx={{ mb: 2 }}>
                    An error has occurred. Apologies for the inconvenience.
                </Alert>
                <Typography variant="body1">
                    {rolesError?.message || permError?.message}
                </Typography>
            </Box>
        );
    }

    if (rolesLoading || permLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const roles = rolesData.rolesDetails;
    const getRole = (id) => roles.find((role) => role.id === id);
    const selectedRole = getRole(selectedRoleId);

    // Handler for save changes button
    function handleSaveChanges(updatedPermissions) {
        console.log('Permissions saved:', updatedPermissions);
        setEditMode(false);
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{ backgroundColor: mode === 'dark' ? "#1F1F1F" : "#F0F0F0", minHeight: '100vh' }}
        >
            <Paper elevation={3} sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => {
                            setTabValue(newValue);
                            setSelectedRoleId(roles[newValue]?.id || null); // Set the selected role based on tab value
                        }}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}
                    >
                        {roles.map((role) => (
                            <Tab
                                key={role.id}
                                label={
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Avatar sx={{ bgcolor: "#0288D1", width: 24, height: 24 }}>
                                                {role.roleGroup.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Grid>
                                        <Grid item sx={{ ml: 1 }}>
                                            <Typography variant="body2" sx={{ color: selectedRoleId === role.id ? "#0288D1" : "#000000" }}>
                                                {role.roleGroup}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                onClick={() => setSelectedRoleId(role.id)}
                                sx={{
                                    textTransform: 'none',
                                    borderBottom: selectedRoleId === role.id ? `2px solid #0288D1` : '2px solid transparent',
                                }}
                            />
                        ))}
                    </Tabs>

                    {/* Theme Toggle Icon */}
                    <IconButton onClick={toggleMode} color={mode === 'light' ? 'primary' : 'secondary'}>
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Box>
            </Paper>

            <Box flex="1" p={3} display="flex" flexDirection="column">
                {selectedRoleId === null ? (
                    <Box textAlign="center" mt={5}>
                        <Typography variant="h6" color="textSecondary">
                            Please select a role to start editing.
                        </Typography>
                    </Box>
                ) : selectedRole && (
                    <Card className = "Card-Edit"  
                    sx={{ backgroundColor: mode === 'dark' ? "#1E1E1E" : "#FFFFFF", boxShadow: 3 }}>
                        <CardContent>
                            <EditDisplay defaultValue={selectedRole.roleGroup} />
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" gutterBottom>
                                    Permissions
                                </Typography>
                                <Tooltip title="Edit Permissions">
                                    <IconButton onClick={() => setEditMode(!editMode)} size="small" sx={{ color: "#0288D1" }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            {editMode ? (
                                <EditPermissions permissions={permData.permissions} rolePermissions={selectedRole.permissions} handler={handleSaveChanges} />
                            ) : (
                                <List dense sx={{ ml: 2, maxHeight: 200, overflow: 'auto' }}>
                                    {selectedRole.permissions.map((perm) => (
                                        <ListItem key={perm} sx={{ borderBottom: '1px solid #E0E0E0' }}>
                                            <ListItemText primary={perm} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
}
