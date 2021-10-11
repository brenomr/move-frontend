import { CircularProgress } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import { defaultProps, IButton } from "./index.d";

const Button = (props: IButton) => {
    const handleClick = props.onClick ?? (() => { });

    return (
        <MuiButton
            startIcon={props.loading ? <CircularProgress size={20} color={"inherit"} /> : props.icon} {...props}
            disabled={props.loading}
            onClick={handleClick}
        >
            {props.children}
        </MuiButton>
    );
}

Button.defaultProps = defaultProps;

export default Button;