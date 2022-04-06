const { AppBar, Typography } = require("@mui/material");

export default function Header({label}){
  return (
    <AppBar color="primary">
      <Typography variant="h6" sx={{color: "white", fontFamily: "Montserrat", fontWight:"bold", m: 1.5}}>{label}</Typography>
    </AppBar>
  )
} 