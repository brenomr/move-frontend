import { ListItem, ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import { ISideMenuOption } from "./index.d";
import { NavLink } from "react-router-dom"

const SideMenuOption = (props: ISideMenuOption) => {

    const Icon = props.icon;
    return (
        <NavLink to={props.link}>
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