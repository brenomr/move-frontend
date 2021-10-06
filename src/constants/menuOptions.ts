import { Group, Home } from "@material-ui/icons";
import { ISideMenuOption } from "components/SideMenu/index.d";

const menuOptions: ISideMenuOption[] = [
    { icon: Home, label: 'Home', link: '/' },
    { icon: Group, label: 'Alunos', link: '/alunos' },
]

export default menuOptions;