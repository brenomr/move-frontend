import { ListItem, ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import { ISideMenuOption } from "./index.d";

const SideMenuOption = (props: ISideMenuOption) => {

    const Icon = props.icon;
    return (
        <ListItem className="listItem">
            <MenuItem key={props.link} className="menuItem">
                <ListItemIcon>
                    <Icon/>
                </ListItemIcon>
                <ListItemText primary={props.label}/>
            </MenuItem>
        </ListItem>
    )
}

export default SideMenuOption;