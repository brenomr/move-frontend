import SideMenu from "components/SideMenu";
import menuOptions from "constants/menuOptions";
import { XMain, XRight } from "./styles";
import { IMainLayout } from "./index.d";
import TopMenu from "components/TopMenu";

const MainLayout = ({ children }: IMainLayout) => {

    return (
        <XMain>
            <SideMenu options={menuOptions} />
            <XRight>
                <TopMenu />
                {children}
            </XRight>
        </XMain>
    );
}

export default MainLayout;