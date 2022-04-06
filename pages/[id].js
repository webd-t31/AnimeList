const {useEffect, useState} = require("react");
const {Grid,Typography, Box, Divider,Card, CircularProgress} = require('@mui/material');
import Header from "../src/Header";

export default function AnimeDetails(){

  let [movie, setMovie] = useState({});
  let [loadingState, setLoadingState] = useState(true);

  const getAnime = function(){
    let xhr = new XMLHttpRequest();
    let animeId = window.location.pathname.slice(1);
    xhr.open("GET", "https://ghibliapi.herokuapp.com/films/"+animeId);
    xhr.responseType = "json";
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        setMovie(this.response);
        setLoadingState(false);
        console.log(this.response)
      }
    }
    xhr.send();
    setLoadingState(true);
    setMovie({});
  }

  useEffect(getAnime, []);

  return (
    <Box width="100vw" height="100vh" sx={{overflowY: "auto", backgroundColor: "#566cd633",}}>
      <Header label={"Anime : "+movie.title}></Header>
      {loadingState ? 
        (<Box width="100%" height="100%" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Card elevation={3} sx={{p: 2}}><CircularProgress color="primary"></CircularProgress></Card>
        </Box>)
        :
        (
          <Box sx={{mt: 10, fontFamily: "'Montserrat', sans-serif"}}>
          <Card elevation={0} sx={{p: 2, m: 5}}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={2}>
                <img src={movie.image} width="100%" sx={{maxWidth: "300px"}} />
              </Grid>
              <Grid item xs={12} md={9} sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
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
    </Box>
  )
}

// export async function getStaticProps({params}){
//   let animeDetail = await axios.get("https://ghibliapi.herokuapp.com/films/"+params.id, {
//     responseType: "json"
//   });
//   let res = await animeDetail.data
//   return {props: {movie: res}}
// } 