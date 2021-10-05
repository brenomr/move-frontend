import MuiButton from '@material-ui/core/Button';
import { defaultProps, IButton } from "./index.d";

const Button = (props: IButton) => {
    return <MuiButton endIcon={props.icon} {...props}>{props.children}</MuiButton>
}

Button.defaultProps = defaultProps;

export default Button;