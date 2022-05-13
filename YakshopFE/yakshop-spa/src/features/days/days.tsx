import React, { useState } from 'react';
 
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addDay,
    removeDay,
    setDay,
    selectDay
} from './daysSlice';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography, TextField } from '@mui/material';

export function Days() {
    const days = useAppSelector(selectDay);
    const dispatch = useAppDispatch();
    const [daysAmount, setDaysAmount] = useState('0');

    const dayValue = Number(daysAmount) || 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDaysAmount(event.target.value);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        Day: {days.day}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <TextField 
                    fullWidth 
                    label="days" 
                    id="days" 
                    type="number"
                    value={daysAmount}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(setDay(dayValue))}
                >
                    Add
                    </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(addDay())}
                >
                    +
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(removeDay())}
                >
                    -
                </Button>
            </Grid>
        </Grid>
    </Box>
  );
}
