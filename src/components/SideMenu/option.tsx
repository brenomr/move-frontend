import { ListItem, ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import { ISideMenuOption } from "./index.d";
import { NavLink, useLocation } from "react-router-dom"

const SideMenuOption = (props: ISideMenuOption) => {

    const { pathname } = useLocation();
    const isActive = pathname === props.link;

    const Icon = props.icon;
    return (
        <NavLink to={props.link} id={isActive && 'active'}>
            <ListItem className="listItem" >
                <MenuItem key={props.link} className="menuItem">
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={props.label} />
                </MenuItem>
            </ListItem>
        </NavLink>
    )
}

export default SideMenuOption;