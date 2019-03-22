import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MenuLink from './MenuLink'
import { Drawer, Button, List } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BurgerMenu from '@material-ui/icons/MenuRounded';
import { IconButton } from '@material-ui/core'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    list: {
        width: 250,
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

//Configure when a link is active. On wait!!!!!
const linkActive = (match, location) => {
    console.log(match)
    console.log(location)
}

const ListItemMenu = ({text, filter}) => {
    return(
        <ListItem button key={text}>
        <ListItemIcon>{filter===''? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <MenuLink filter={filter}>
                {text}
            </MenuLink>
        </ListItem>
    )
}

class Menu extends React.Component {
    state = {
        openMenu: false
    }

    toggleDrawer = () => () => {
        this.setState((state, props) => ({
            openMenu: !state.openMenu
        }))
    }

    render(){
        const  {classes, filter} = this.props

        const sideList = (
            <div className={classes.list}>
            <List>
                <ListItemMenu text='Index' filter=' '/>
                <ListItemMenu text='Exercises' filter='exercises'/>
                <ListItemMenu text='Routine' filter='routine'/>
            </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          );

    return(
        <div>
            <IconButton aria-label="Menu" color="secondary" style={{marginRight: '5px'}} onClick={this.toggleDrawer()}>
            <BurgerMenu style={{ fontSize: 25 }}/>
            </IconButton>
            <Drawer anchor="right" open={this.state.openMenu} onClose={this.toggleDrawer()}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('right', false)}
                    onKeyDown={this.toggleDrawer('right', false)}
                >
                    {sideList}
                </div>
        </Drawer>
    </div>
    )
    } 
}

export default withStyles(styles)(Menu)