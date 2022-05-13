import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Days {
    day: number;
}

export const daysSlice = createSlice({
    name: 'Day',
    initialState: {
        day: 0
    },
    reducers: { 
        addDay: (state) => {
            state.day += 1;
        },
        removeDay: (state) => {
            state.day -= 1;
        },
        setDay: (state, action: PayloadAction<number>) => {
            state.day = action.payload;
        }

    },
    extraReducers: { }
});

export const { addDay, removeDay, setDay } = daysSlice.actions;
export const selectDay = (state: RootState) => state.days;

export default daysSlice.reducer;
