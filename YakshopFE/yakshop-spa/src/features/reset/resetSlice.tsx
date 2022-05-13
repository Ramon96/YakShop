import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { HerdData } from '../yakshop/yakshopApi';

export interface Reset {
    id: number;
    yaks: HerdData[];
}

export const reset = createAsyncThunk(
    'reset/reset',
    async( yaks: []) => {
        const response = await fetch(`https://localhost:7272/api/Herd/yak-shop/load`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                yaks: yaks
            })
        });
        return (await response.json()) as Promise<Reset>;
    }
);

export const resetSlice = createSlice({
    name: 'reset',
    initialState: {
        status: '',
    },
    reducers: { },
    extraReducers: {
        [reset.pending.type]: (state, action: PayloadAction<Reset>) => {
            state.status = 'loading';
        },
        [reset.fulfilled.type]: (state, action: PayloadAction<Reset>) => {
            state.status = 'success';
        },
        [reset.rejected.type]: (state, action: PayloadAction<Reset>) => {
            state.status = 'error';
        }
    }
});


 export const resetStatus = (state: RootState) => state.reset.status;

export default resetSlice.reducer;
