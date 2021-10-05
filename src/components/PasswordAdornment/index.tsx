import { InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { IPasswordAdornment } from "./index.d"

const PasswordAdornment = ({ showPassword, setShowPassword }: IPasswordAdornment) => {
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputAdornment position="end">
            <IconButton
                onClick={handleClickShowPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    )
}

export default PasswordAdornment