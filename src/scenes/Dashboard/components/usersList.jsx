// src/components/UsersList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditDisplay from './editDisplay';
import EditDisplayRole from './editDisplayRole';

export default function UsersList({ users, roles }) {
  const [changeTracker, setChangeTracker] = useState([]);
  const [discardController, setDiscardController] = useState(false);

  const handleChange = (user, key) => {
    return function (value) {
      let changed = changeTracker.find((item) => item.id === user.id);
      let newChanges = [];
      if (key !== 'roleGroup') {
        if (changed) {
          changed = { ...changed, [key]: value };
          newChanges = changeTracker.map((item) => {
            if (item.id === user.id) {
              return changed;
            }
            return item;
          });
        } else {
          changed = { id: user.id, [key]: value.trim() };
          newChanges = [...changeTracker, changed];
        }
      } else {
        if (changed) {
          changed = { ...changed, role: { id: value, [key]: roles.find((e) => e.id === value).roleGroup } };
          newChanges = changeTracker.map((item) => {
            if (item.id === user.id) {
              return changed;
            }
            return item;
          });
        } else {
          changed = { id: user.id, role: { id: value, [key]: roles.find((e) => e.id === value).roleGroup } };
          newChanges = [...changeTracker, changed];
        }
      }
      setChangeTracker(newChanges);
    };
  };

  const handleSave = () => {
    // Save changes logic here
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box
              sx={{
                padding: 2,
                backgroundColor: 'info.main',
                color: 'white',
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6">Users Table</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <EditDisplay
                          defaultValue={user.userName}
                          handler={handleChange(user, 'userName')}
                          discardController={discardController}
                        />
                      </TableCell>
                      <TableCell>
                        <EditDisplay
                          defaultValue={user.userEmail}
                          handler={handleChange(user, 'userEmail')}
                          discardController={discardController}
                        />
                      </TableCell>
                      <TableCell>
                        <EditDisplayRole
                          role={user.role}
                          roles={roles}
                          handler={handleChange(user, 'roleGroup')}
                          discardController={discardController}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={changeTracker.length <= 0}
                onClick={handleSave}
                sx={{ marginRight: 1, cursor: 'pointer' }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                disabled={changeTracker.length <= 0}
                onClick={() => {
                  setChangeTracker([]);
                  setDiscardController(!discardController);
                }}
                sx={{ cursor: 'pointer' }}
              >
                Discard Changes
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Define PropTypes
UsersList.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        userEmail: PropTypes.string.isRequired,
        role: PropTypes.shape({
          id: PropTypes.number.isRequired,
          roleGroup: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        roleGroup: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
