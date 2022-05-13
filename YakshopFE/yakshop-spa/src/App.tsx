import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { YakShop } from './features/yakshop/Yakshop';
import { Stock } from './features/stock/stock';
import { Days } from './features/days/days';
import { Reset } from './features/reset/reset';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <div className="App">
        <CssBaseline />
        <header>
          <Typography variant="h1" >
              The Yak shop
          </Typography>
        </header>
        <Container maxWidth="md">
            <Days />
            <Stock />
            <YakShop />
            <Reset />
        </Container>
      </div>
  );
}

export default App;
