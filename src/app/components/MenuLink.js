import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuLink = ({filter, children}) => {
    return(
        <NavLink to={filter===''?'':filter} activeStyle={{textDecoration:'none', color: 'black'}}>
            {children}
        </NavLink>
    )
}

export default MenuLink