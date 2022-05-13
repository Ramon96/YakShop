import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../app/hooks';
import {
    reset
} from './resetSlice';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import Grid from '@mui/material/Grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

export function Reset() {
    const [open, setOpen] = useState(false);
    const [yakForms, setYakForms] = useState([] as any);
    const { register, handleSubmit } = useForm();

    const dispatch = useAppDispatch();


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const YakForm = (props) => {
        return (
            <Grid container spacing={1}>
                 <Grid item xs={4}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        {...register(`yak.${props.id}.name.value`)}
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="age"
                        label="age"
                        variant="outlined"
                        required
                        type="number"
                        InputProps={{ inputProps : { min: 0, max: 10 }}}
                        {...register(`yak.${props.id}.age.value`)}
                    />
                </Grid>
                 <Grid item xs={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Male</Typography>
                        <AntSwitch 
                            defaultChecked 
                            inputProps={{ 'aria-label': 'ant design' }} 
                            {...register(`yak.${props.id}.sex.value`)} 
                        />
                        <Typography>Female</Typography>
                    </Stack>
                </Grid>
            </Grid>
        )
    }

    const addYakForm = () => {
        setYakForms(yakForms.concat(<YakForm key={yakForms.length} id={yakForms.length} />));
    };

    const onSubmit = (data: any) => {
        let yaks = data.yak.map((yak: any) => {
            return {name: yak.name.value, age: yak.age.value, sex: yak.sex.value ? "FEMALE" : "MALE", ageLastShaved: yak.age.value}
        });

        dispatch(reset(yaks))
            .then(() => {
                window.location.reload();
            })
    };


  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Reset Herd</DialogTitle>
                <DialogContent>
                <Stack direction="column" spacing={2}>
                    {yakForms}
                </Stack>
                <IconButton aria-label="delete" onClick={addYakForm}>
                    <AddCircleIcon />
                </IconButton>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' type="submit">Reset</Button>
                </DialogActions>
            </form>
        </Dialog>

        <Button variant="outlined" onClick={handleClickOpen}>
              Reset content
        </Button>
    </div>
  );
}
