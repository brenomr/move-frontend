import SideMenu from "components/SideMenu";
import menuOptions from "constants/menuOptions";
import { XContent, XMain, XRight } from "./styles";
import { IMainLayout } from "./index.d";
import TopMenu from "components/TopMenu";
import { selectUser } from 'features/user/selectors';
import { useSelector } from 'react-redux';
import { EWhoIs } from "features/user/index.d";

const MainLayout = ({ children }: IMainLayout) => {

    const { whois } = useSelector(selectUser);

    let filteredMenu;
    if (whois === EWhoIs.ADMIN)
        filteredMenu = menuOptions.filter(option => option.key === EWhoIs.PERSONAL || option.key === EWhoIs.ADMIN || option.key === 'user');

    else
        filteredMenu = menuOptions.filter(option => option.key === whois || option.key === 'user')

    return (
        <XMain>
            <SideMenu options={filteredMenu} />
            <XRight>
                <TopMenu />
                <XContent>
                    {children}
                </XContent>
            </XRight>
        </XMain>
    );
}

export default MainLayout;