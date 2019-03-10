import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import Menu from "../../components/Menu"
import { withRouter } from 'react-router-dom'

const Header = ({ filter }) => (
  <React.Fragment>
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
          Excercises database
        </Typography>
        <Menu filter={filter}/>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withRouter(Header)
