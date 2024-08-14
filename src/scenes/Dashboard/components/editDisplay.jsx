/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import "../scss/edit-display.scss"
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes


export default function EditDisplay({ defaultValue = "", handler = () => { }, discardController = null, displayClick=()=>{} }) {
    const [ setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [editMode, setEditMode] = useState(false)
    const input = useRef(null)

    const handleCrossClick = () => {
        if (input.current) {
            setValue(defaultValue)
            input.current.focus()
        }
        setEditMode(false)
    }
    const handleSaveClick = (event) => {
        // event.stopPropagation(); 
        // if (value == defaultValue) return;
        handler(value)
        setEditMode(false)
        // setIsEditing(false);
    };

    const handleEditClick = (event) => {
        // event.stopPropagation(); // Prevent row click
        setEditMode(true);
    };

    useEffect(() => {
        // handleCrossClick()
        setValue(defaultValue)
        // console.log("discard")
    }, [defaultValue, discardController])
    return (
        <div className="edit-display">
            {
                !editMode ? (<>
                    <p className='display' onClick={displayClick}>
                        {
                            value
                        }
                    </p>
                    <EditIcon sx={{ cursor: 'pointer'}}fontSize='small' onClick={handleEditClick}/>
                </>) : (<>
                    <input
                        type="text"
                        className='edit'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        ref={input}
                    />
                    <span className='cross' onClick={() => handleCrossClick()}>
                        &#10005;
                    </span>
                    <SaveIcon fontSize={"small"} className='icon' onClick={() => { handleSaveClick() }} />
                </>)
            }

        </div>
    )
}
// Define PropTypes
EditDisplay.propTypes = {
    defaultValue: PropTypes.string,
    handler: PropTypes.func,
    discardController: PropTypes.any, // You can use PropTypes.any if discardController can be any type
};