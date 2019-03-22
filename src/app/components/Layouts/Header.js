import React from "react"
import { Typography } from "@material-ui/core"
import Menu from "../../components/Menu"
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

const Header = ({ filter }) => (
  <div style={{flexGrow: 1}}>
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h6" color="inherit" style={{marginLeft: '5px'}}>
          Pick up some Exercises
        </Typography>
      </Grid>
      <Grid item> 
        <Menu filter={filter}/>
      </Grid>
    </Grid>
  </div>
);

export default withRouter(Header)
