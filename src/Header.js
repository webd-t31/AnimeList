const { AppBar, Typography } = require("@mui/material");

export default function Header(){
  return (
    <AppBar color="primary">
      <Typography variant="h6" sx={{color: "white", fontFamily: "Montserrat", fontWight:"bold", m: 1.5}}>AnimeList</Typography>
    </AppBar>
  )
} 