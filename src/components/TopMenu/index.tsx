import { Menu, MenuItem, IconButton, Badge, Box, AppBar, Toolbar } from '@material-ui/core';
import { AccountCircle, Mail, More, Notifications, MenuOutlined, ExitToApp } from '@material-ui/icons';
import useLogout from 'hooks/useLogout';
import * as React from 'react';
import theme from 'styles/theme';

export default function TopMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logout = useLogout();

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
            <MenuItem onClick={handleMenuClose}>Meu perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
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
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="medium"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={logout}
                            color="inherit"
                        >
                            <ExitToApp />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </Box >
    );
}