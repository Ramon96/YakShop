import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getHerd,
  selectHerd
} from './yakshopSlice';

import { selectDay } from '../days/daysSlice';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export function YakShop() {
  const herd = useAppSelector(selectHerd);
  
  const dispatch = useAppDispatch();

  const days = useAppSelector(selectDay);
  
  useEffect(() => {
    dispatch(getHerd(days.day));
  }, [dispatch]);


  return (
    <div>
      <Typography variant="h2" >
          Herd
      </Typography>
      {herd.herd.map((CurHerd) => {
        return(
            <Grid container spacing={2} key={CurHerd.id}> 
            {CurHerd.yaks.map(CurYak => (
                <Grid item key={CurYak.id} xs={4}>
                  <Card key={CurYak.id}>
                    {/* TODO fetch random yak img from yak api? */}
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Corbis-42-33333324_ofysml.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {CurYak.name} ({CurYak.age})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sex: {CurYak.sex}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Part of herd number: {CurHerd.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last shave: {CurYak.ageLastShaved}
                        </Typography>
                      </CardContent>
                    </Card>
                </Grid>
                 ))}
            </Grid>
          )
      })}
    </div>
  );
}
