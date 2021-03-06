import { List } from "@material-ui/core";
import { ISideMenu } from "./index.d";
import SideMenuOption from "./option";
import { XListContainer } from "./styles";
import Logo from 'assets/images/logo.jpg';


const SideMenu = ({ options }: ISideMenu) => {
    return (
        <XListContainer>
            <img src={Logo} alt="logo" />
            {options.map(category => (
                <>
                    <p>{category.label}</p>
                    <List>
                        {category.options.map(SideMenuOption)}
                    </List>
                </>
            ))}

        </XListContainer>
    )
}

export default SideMenu;