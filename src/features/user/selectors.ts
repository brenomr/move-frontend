import { IUserState } from "./index.d";
import { IRootState } from "../../state/reducer";

export const selectUser = (state: IRootState): IUserState => state.user;