import React from 'react'
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuLink from './MenuLink'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    nav: {
        display:'flex'
    },
    navItem: {
        textAlign: "center",
        flex: 'auto',
        listStyleType: "none",
        marginRight: '25px',

      },
    selected:{
        textAlign: "center",
        flex: 1,
        listStyleType: "none",
        padding: "10px",
        textColor: 'solid black'
      }
})


const NoMatch = () => (<div>NO MATCH</div>)

const linkActive = (match, location) => {
    console.log(match)
    console.log(location)
}

const Menu = ({classes, filter}) => {
    return(
            <div className={classes.container}>
            <nav className={classes.nav}>
                    <li className={classes.navItem}>
                        <MenuLink filter=' '>
                            Index
                        </MenuLink>
                    </li>
                    <li className={classes.navItem}>
                        <MenuLink filter='exercises'>
                            Exercises
                        </MenuLink>
                    </li>
                    <li className={classes.navItem}>
                        <MenuLink filter='routine'>
                            Routine
                        </MenuLink>
                    </li>
            </nav>
        </div>
    ) 
}

export default withStyles(styles)(Menu)