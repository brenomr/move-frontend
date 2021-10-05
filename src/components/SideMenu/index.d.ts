import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface ISideMenu {
    options: ISideMenuOption[]
}

export interface ISideMenuOption {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    label: string
    link: string
}