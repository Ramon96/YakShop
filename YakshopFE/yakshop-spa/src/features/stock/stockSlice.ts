import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface StockData {
    id: number;
    milk: number;
    skins: number;
}

export interface OrderData {
    id: number;
    customer: string;
    customerOrder: StockData[];
}

export const getStock = createAsyncThunk(
    'stock/getStock', 
    async(day: number) => {
        let days = day == null ? 0 : day;

        const response = await fetch(`https://localhost:7272/api/Herd/yak-shop/stock/${days}`);
        return (await response.json()) as Promise<StockData>;
    }
);

export const orderStock = createAsyncThunk(
    'stock/orderStock',
    async(order: { day: number, name: string, milk: number, skins: number }) => {
        let days = order.day == null ? 0 : order.day;
        let customer = order.name;
        let customerOrder = { milk: order.milk, skins: order.skins };

        // const response = await fetch(`https://localhost:7272/api/Herd/yak-shop/order/${days}`, {
        const response = await fetch(`https://localhost:7272/api/Herd/yak-shop/order/${days}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer,
                customerOrder
            })
        });
        return (await response.json()) as Promise<StockData>;
    }
);

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        id: 0,
        milk: 0,
        skins: 0,
        loading: false,
        status: '',
    },
    reducers: { },
    extraReducers: {
        [getStock.pending.type]: (state) => {
            state.loading = true;
        },
        [getStock.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.milk = action.payload.milk;
            state.skins = action.payload.skins;
            state.loading = false;
        },
        [getStock.rejected.type]: (state) => {
            state.loading = false;
        },
        [orderStock.pending.type]: (state) => {
            state.loading = true;
            state.status = 'pending';
        },
        [orderStock.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.milk = action.payload.milk ? state.milk - action.payload.milk : state.milk;
            state.skins = action.payload.skins ? state.skins - action.payload.skins : state.skins;
            state.loading = false;
            state.status = 'success';
        },
        [orderStock.rejected.type]: (state) => {
            state.loading = false;
            state.status = 'error';
        }
    }
});


export const selectStock = (state: RootState) => state.stock;

export default stockSlice.reducer;
