import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';
import { RootState } from '../../app/store';
import { HerdData } from './yakshopApi';

export const getHerd = createAsyncThunk(
    'yakshop/getHerd', 
    async(day: number) => {
        let days = day == null ? 0 : day;

        const response = await fetch(`https://localhost:7272/api/Herd/yak-shop/herd/${days}`);
        return (await response.json()) as Promise<HerdData>;
    }
);

export const yakshopSlice = createSlice({
    name: 'yakshop',
    initialState: {
        herd: [{
            id: 0,
            yaks: [{
                id: 0,
                name: '',
                age: 0,
                sex: '',
                ageLastShaved: 0,
                herdId: 0
            }],
        }],
        loading: false
    },
    reducers: { },
    extraReducers: {
        [getHerd.pending.type]: (state) => {
            state.loading = true;
        },
        [getHerd.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.herd = action.payload;
            state.loading = false;
        },
        [getHerd.rejected.type]: (state) => {
            state.loading = false;
        }
    }
});


export const selectHerd = (state: RootState) => state.yakshop;

export default yakshopSlice.reducer;
