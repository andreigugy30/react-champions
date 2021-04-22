import './App.css';
import ChampionList from "./containers/ChampionList/ChampionList";

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container>
          <Grid item lg={6} xs={12} md={6}>
            <ChampionList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
