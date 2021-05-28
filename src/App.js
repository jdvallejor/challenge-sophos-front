import React from "react";
import axios from 'axios'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
}));

function App() {

  const classes = useStyles();
  const [clicks, setClicks] = React.useState(0);
  const [catalogItems, setCatalogItems] = React.useState([]);

  React.useEffect(() => {
    getAll()
  }, []);

  const updateLikes = (index) => {
    const newcatalogItems = [...catalogItems];
    newcatalogItems[index].likes = newcatalogItems[index].likes + 1;
    setCatalogItems(newcatalogItems);
  }

  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setCatalogItems(response.data)
    } catch (error) {
      alert('Ha habido un problema consultando la API')
    }
  }

  const getOnlySeries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/serie');
      setCatalogItems(response.data)
    } catch (error) {
      alert('Ha habido un problema consultando la API')
    }
  }

  const getOnlyMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pelicula');
      setCatalogItems(response.data)
    } catch (error) {
      alert('Ha habido un problema consultando la API')
    }
  }
  
  return (
    <div>
      <div className="Header-box">
        <div className="App-header">
          <img src="https://www.sophossolutions.com/wp-content/uploads/2020/11/web_logo_Sophos_Color.png" alt="logo" />
          <p>
            Solución por Juan David Vallejo
          </p>
        </div>
      </div>
      <div>
        <Grid container>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Card>
                <CardHeader
                  title="Punto 1"
                />
                <CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => { setClicks(clicks + 1) }}
                  >Oprimir</Button>
                  <p>Usted ha oprimido {clicks} veces el botón</p>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <Card>
                <CardHeader
                  title="Punto 2"
                />
                <CardContent>
                  <Grid
                    container
                    justify="space-around"
                    direction="row"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                     <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => { getAll() }}
                      >Todos</Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => { getOnlySeries() }}
                      >Solo series</Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => { getOnlyMovies() }}
                      >Solo películas</Button>
                    </Grid>
                  </Grid>
                  <br></br>
                  {catalogItems.map((catalogItem, index) => (
                    <Card variant="outlined" key={catalogItem._id}>
                      <CardContent>
                        <p><strong>Titulo:</strong> {catalogItem.title}</p>
                        <p><strong>Año:</strong> {catalogItem.year}</p>
                        <p><strong>Tipo:</strong> {catalogItem.type}</p>
                        <p><strong>id:</strong> {catalogItem._id}</p>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => { updateLikes(index) }}
                        >Me gusta</Button>
                        <p>{catalogItem.likes}</p>
                      </CardActions>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
