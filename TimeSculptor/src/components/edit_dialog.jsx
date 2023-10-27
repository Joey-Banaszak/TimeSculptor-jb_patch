import React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

// imports for date/time picker components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function EditDialog({open, closeFunction, editEvent, toEdit})
{
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        setName(toEdit.title);
        setDateTime(toEdit.dateAndTime);
    }, [toEdit]);

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const dateTimeChange = (date) => {
        setDateTime(date);
    };

    const formSubmit = () => {
        const newEvent = {
            id: toEdit.id,
            title: name,
            dateAndTime: dateTime,
            icon: "/assets/images/login.png"
        }

        editEvent(newEvent);

        closeFunction();
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Edit an Event</DialogTitle>
                <DialogContent>
                    <TextField
                    // text field for event name
                        id="eventName"
                        label="Event Name"
                        fullWidth
                        variant="filled"
                        value = {name}
                        onChange={nameChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        sx= {{overflow:"visible"}}
                        label="Event Date/Time"
                        disablePast
                        value={dateTime}
                        onChange={dateTimeChange}
                    />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {formSubmit}> Submit </Button>
                    <Button onClick={() => closeFunction()}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}