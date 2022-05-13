import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
 
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getStock,
    orderStock,
    selectStock
} from './stockSlice';

import { selectDay } from '../days/daysSlice';

import { getHerd } from '../yakshop/yakshopSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function createData( name: string, milk: number,  skins: number) {
    return { name, milk, skins };
  }


export function Stock() {
  const stock = useAppSelector(selectStock);
  const days = useAppSelector(selectDay);

  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const rows = [
    createData('', stock.milk, stock.skins)
  ];

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getStock(days.day));
  }, [dispatch]);

  const onSubmit = (data: any) => {
    const order = {
      day: days.day,
      name: data.name,
      milk: data.milk,
      skins: data.skins
    };

    dispatch(orderStock(order))
      .then(() => {
        setOpen(false);
        setOpenToast(true);
      })
  };

  return (
    <div>
        <Typography variant="h2" >
            Stock
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(getStock(days.day)).then(() => dispatch(getHerd(0)))}
        >
            Restock
        </Button>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseToast}
        >
        <Alert onClose={handleCloseToast} severity={stock.status === "success" ? "success" : "error"} sx={{ width: '100%' }}>
            {stock.status === "success" ? "Order placed successfully" : "Something went wrong while placing order. Try again later"}
        </Alert>
        </Snackbar>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Current stock</TableCell>
                    <TableCell align="right">Milk</TableCell>
                    <TableCell align="right">skins</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.milk}</TableCell>
                    <TableCell align="right">{row.skins}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Buy stock</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You cannot buy more than what is in stock.
              </DialogContentText>
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="input"
                fullWidth
                variant="standard"
                {...register('name')}
                required
              />
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                margin="dense"
                id="milk"
                label="milk"
                type="number"
                fullWidth
                variant="standard"
                {...register('milk')}
                required
              />
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                margin="dense"
                id="skins"
                label="skins"
                type="number"
                fullWidth
                variant="standard"
                {...register('skins')}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">Order</Button>
            </DialogActions>
            </form>
          </Dialog>

            <Button variant="outlined" onClick={handleClickOpen}>
              Order stock
            </Button>
    </div>
  );
}
