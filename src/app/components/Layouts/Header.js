import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import MainButton from "../../containers/MainButton"
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
        <MainButton />
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withRouter(Header)
