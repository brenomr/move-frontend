import { Menu, MenuItem, IconButton, Badge, Box, AppBar, Toolbar, Avatar, Typography } from '@material-ui/core';
import { AccountCircle, Mail, More, Notifications, MenuOutlined, ExitToApp } from '@material-ui/icons';
import { selectUser } from 'features/user/selectors';
import useLogout from 'hooks/useLogout';
import * as React from 'react';
import { useSelector } from 'react-redux';
import theme from 'styles/theme';
import { useHistory } from "react-router-dom";

export default function TopMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logout = useLogout();
    const { name, avatar } = useSelector(selectUser);
    const history = useHistory();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleRedirectProfile = () => {
        history.push("/perfil");
        handleMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleRedirectProfile}>Meu perfil</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
    );

    return (
        <Box >
            <AppBar position="static" style={{ background: theme.colors.primaryDark, boxShadow: 'none' }}>
                <Toolbar>
                    {/* <IconButton>
                    <MenuOutlined />
                </IconButton> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography style={{ marginRight: 10 }}>{name}</Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="medium"
                            edge="start"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={avatar} style={{ width: 40, height: 40, background: 'white' }} />
                        </IconButton>
                        {renderMenu}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}