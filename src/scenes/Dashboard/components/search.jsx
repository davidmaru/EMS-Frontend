import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import { useTheme } from '../UseTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export default function Search({ handler = () => {} }) {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    const { mode, toggleMode } = useTheme();


    function handleIconClick() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    function handleClearClick() {
        setValue("");
        inputRef.current.focus();
    }

    useEffect(() => {
        handler(value);
    }, [value, handler]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <TextField
                variant="outlined"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputRef={inputRef}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleIconClick} edge="start">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {value && (
                                <IconButton onClick={handleClearClick} edge="end">
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
                sx={{
                    width: '300px', // Adjust width as needed
                    maxWidth: '100%', // Ensure it doesn't exceed the container width
                    borderRadius: 2, // Rounded corners
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2, // Match rounded corners
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Change border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Change border color on focus
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '0.5rem', // Increase padding
                        fontSize: '1rem', // Increase font size
                    },
                }}
            />
            <IconButton onClick={toggleMode} color={mode === 'light' ? 'primary' : 'secondary'}>
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
        </Box>
    );
}

// Define PropTypes
Search.propTypes = {
    handler: PropTypes.func, // The handler prop is expected to be a function
  };
