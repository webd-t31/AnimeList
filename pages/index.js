// import * as React from 'react';
import style from "./Index.module.css";
import Header from "../src/Header";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState, useEffect} from 'react'

const {Container, Grid, ListItemButton, List, Typography, Box, Divider, Paper, Button, Card, CircularProgress, TextField, Accordion, AccordionSummary, AccordionDetails} = require('@mui/material');

export default function Index() {
  let [animeList, setAnimeList] = useState([]);
  let [filteredAnime, setFilteredAnime] = useState([]);
  let [selIndex, setSelIndex] = useState(-1);
  let [movie, setMovie] = useState({});
  let [loading, setLoadingState] = useState(false);
  let [listExp, toggleList] = useState(true);

  useEffect(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ghibliapi.herokuapp.com/films");
    xhr.responseType = "json";
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        if(this.status == 200){
          setAnimeList(this.response);
          setFilteredAnime(this.response);
        }
      }
    }
    xhr.send()
  }, [])

  const selectAnime = async function(id, i){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", animeList[i].image);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        setLoadingState(false);
        setSelIndex(i);
        setMovie(animeList[i]);
      }
    }
    xhr.send();
    setMovie({});
    setLoadingState(true);
    toggleList(false)
  }

  function filter(ev){
    let val = ev.target.value;
    if(val.length == 0){
      setFilteredAnime(animeList);
      return;
    }
    setFilteredAnime(animeList.filter( anime => {
      return anime.title.toLowerCase().search(val.toString()) > -1;
    }))
  }

  return (
    <Box width="100%" height="100%" position="fixed" flex flexDirection={"column"} sx={{fontFamily: "'Montserrat', sans-serif", backgroundColor: "#566cd677"}}>
      <Header></Header>
      <Container fluid maxWidth={{xs: "100%", md: "80%"}} sx={{overflowY: "scroll"}}>

      <Grid container spacing={2} sx={{mt: 7}}>
        <Grid item display={{xs: "block", md: "none"}} xs={12} md={4} lg={4}>
          <Card sx={{p: 1}} >
            {/* <Typography variant="h5" sx={{fontWeight: "bold", margin: "10px auto", textAlign: "center"}}>Anime Movies</Typography>
            <Divider /> */}
            <Accordion elevation={0} expanded={listExp} onClick={()=>toggleList(!listExp)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                  Anime List
              </AccordionSummary>
              <AccordionDetails sx={{height: "80vh"}}>
                <TextField id="search" onChange={filter} sx={{mt: 1}} fullWidth label="Search"/>
                <Box sx={{ height: "90%", p: 1, mt: 2, overflowY: "Scroll"}}>
                  {filteredAnime.length ? filteredAnime.map( (it, i) => {
                    return (
                      <Paper sx={{px: 2, py: 1, my: 1, cursor: "pointer"}} className={selIndex == i ? style.selected : ""} elevation={selIndex == i ? 6 : 0} key={i} onClick={selectAnime.bind(this, it.id, i)}>
                        {it.title}
                      </Paper>
                    )
                  }) : <Paper elevation={0} sx={{textAlign: "center"}}>No Match</Paper>}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>

        <Grid item display={{xs: "none", md: "flex"}} xs={12} md={4} lg={4}>
          <Card sx={{p: 2}}>
            <TextField id="search" onChange={filter} fullWidth label="Search"/>
            <Box fluid sx={{overflowY: "scroll", height: "80vh", p: 1, mt: 1}}>
              {filteredAnime.length ? filteredAnime.map( (it, i) => {
                return (
                  <div>
                    <Paper sx={{px: 2, py: 1, my: 1, cursor: "pointer"}} className={selIndex == i ? style.selected : ""} elevation={selIndex == i ? 6 : 0} key={i} onClick={selectAnime.bind(this, it.id, i)}>
                      {it.title}
                    </Paper>
                    <Divider />
                  </div>
                )
              }) : <Paper elevation={0} sx={{textAlign: "center"}}>No Match</Paper>}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} lg={8} sx={{height: "92vh", overflowY: "auto"}}>
            {!movie.id ? (
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                {loading ? (
                  <Card elevation={3} sx={{p: 2}}><CircularProgress color="primary"></CircularProgress></Card>
                ) : (<Typography sx={{color: "#000", textTransform: "uppercase"}}>Select a title to get details</Typography>)}
              </Box>
              ) : (
                <Box sx={{mr: 1, fontFamily: "'Montserrat', sans-serif", height: {xs: "85%", md: "auto"}, overflowY: {xs: "auto", md: "hidden"}}}>
                  {/* sx={{backgroundImage: `url(${movie.movie_banner})`, backgroundSize: "auto 100%"}} */}
                  <Card elevation={3} sx={{p: 2}}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} lg={2}>
                        <img src={movie.image} width="100%" sx={{maxWidth: "300px"}} />
                      </Grid>
                      <Grid item xs={12} lg={9} sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Typography sx={{fontSize: "1.8rem", fontWeight: "bold", fontFamily: "Montserrat"}}>{movie.title}</Typography>
                        <Typography sx={{fontSize: "1rem", fontWeight: "bold"}}>({movie.original_title})</Typography>
                        <Typography sx={{fontSize: "1.2rem", mt: 2}}>{Math.floor(movie.running_time/60)}h {movie.running_time%60}min</Typography>
                        <Typography sx={{fontSize: "1.2rem",}}>{movie.release_date}</Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{my: 3}} />
                    <Box>
                      {movie.description}
                    </Box>
                  </Card>
                </Box>
              )}
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}
