import Header from "../src/Header";
import {useState, useEffect} from 'react'

const {Box, Divider, Paper, Card,TextField} = require('@mui/material');

export default function Index() {
  let [animeList, setAnimeList] = useState([]);
  let [filteredAnime, setFilteredAnime] = useState([]);

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

  function openAnime(id){
    window.open("/"+id, "_self");
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
    <Box width="100%" height="100%" minWidth={"400px"} position="fixed" sx={{fontFamily: "'Montserrat', sans-serif", display: "flex", justifyContent: "center", backgroundColor: "#566cd677", overflowX: "auto"}}>
      <Header label="AnimeList"></Header>
      {/* <Container fixed> */}

        <Box sx={{mt: 10}} width={{xs: "80%", lg: "50%"}}>
          <Card sx={{p: 2}}>
            <TextField id="search" onChange={filter} fullWidth label="Search"/>
            <Box fluid sx={{overflowY: "scroll", height: "80vh", p: 1, mt: 2}}>
              {filteredAnime.length ? filteredAnime.map( (it, i) => {
                return (
                  <div>
                    <Paper sx={{px: 2, py: 1, my: 1, cursor: "pointer"}} elevation={0} key={i} onClick={openAnime.bind(this, it.id)}>
                      {it.title}
                    </Paper>
                    <Divider />
                  </div>
                )
              }) : <Paper elevation={0} sx={{textAlign: "center"}}>No Match</Paper>}
            </Box>
          </Card>
        </Box>

      {/* </Container> */}
    </Box>
  );
}
