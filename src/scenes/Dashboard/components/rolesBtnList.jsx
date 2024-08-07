import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import "../scss/rolesBtnList.scss";
import PropTypes from 'prop-types'; // Import PropTypes


export default function RolesBtnList({ roles, handler = () => {} }) {
    const theme = useTheme();

    return (
        <Box 
            className="roles-btn-list"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1, // Space between buttons
                '& .btn': {
                    borderRadius: 2, // Rounded corners
                    padding: '0.5rem 1rem', // Button padding
                    textTransform: 'capitalize', // Capitalize text
                    '&.active': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
            }}
        >
            <Button
                className="btn"
                onClick={() => handler({ roleGroup: "" })}
            >
                All
            </Button>
            {roles.map((role) => (
                <Button
                    key={role.id}
                    className={`btn ${role.roleGroup.toLowerCase()}`}
                    onClick={() => handler(role)}
                >
                    {role.roleGroup}
                </Button>
            ))}
        </Box>
    );
}
// Define PropTypes
RolesBtnList.propTypes = {
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        roleGroup: PropTypes.string.isRequired,
      })
    ).isRequired, // roles is an array of objects with id and roleGroup properties
    handler: PropTypes.func, // handler is a function
  };