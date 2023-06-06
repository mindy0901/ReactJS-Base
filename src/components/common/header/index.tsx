import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import Spinner from '../Spinner';
import { getMe } from '../../../services/user';
import { refresh } from '../../../services/auth';
import { User } from '../../../types/authType';

const pages = [
    {
        name: 'About',
        path: 'about',
    },
    {
        name: 'Products',
        path: 'products',
    },
    {
        name: 'Help Center',
        path: 'help',
    },
];
const settings = [
    { name: 'Profile', path: 'profile' },
    { name: 'Settings', path: 'settings' },
    { name: 'Logout', path: '/' },
];

const Header = () => {
    const queryClient = useQueryClient();
    const user: User | undefined = queryClient.getQueryData(['user']);
    const token: string | null = localStorage.getItem('access_token');
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const mutation = useMutation({
        mutationFn: (refreshToken: string) => refresh(refreshToken),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.headers.access_token);
            localStorage.setItem('refresh_token', data.headers.refresh_token);
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            if (error instanceof Error && error.name === 'TokenExpiredError') {
                localStorage.clear();
                console.log('Session expired, please log in again');
            }
        },
    });

    const { fetchStatus } = useQuery({
        queryKey: ['user'],
        enabled: !!token && !user,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: () => getMe(),
        onSuccess(data) {
            queryClient.setQueryData(['user'], data.data);
        },
        onError(error) {
            if (error instanceof Error && error.name === 'TokenExpiredError') {
                const refreshToken = localStorage.getItem('refresh_token') || '';
                console.log('refresh access token...');
                mutation.mutate(refreshToken);
            }
        },
    });

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    {/* DESKTOP */}
                    <NavLink to="/">
                        {({ isActive, isPending }) => (
                            <Typography
                                sx={{
                                    mr: 10,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '0.2rem',
                                    fontSize: '2.6rem',
                                    color: isActive ? '#8bbae8' : '#fff',
                                }}
                            >
                                MALL.
                            </Typography>
                        )}
                    </NavLink>

                    <Box sx={{ display: { xs: 'none', md: 'flex', gap: 20 }, flexGrow: 1 }}>
                        {pages.map((page) => (
                            <NavLink to={page.path} key={page.path} onClick={handleCloseNavMenu}>
                                {({ isActive, isPending }) => (
                                    <Typography sx={{ fontSize: '1.6rem', color: isActive ? '#8bbae8' : '#fff' }}>
                                        {page.name}
                                    </Typography>
                                )}
                            </NavLink>
                        ))}
                    </Box>

                    {/* MOBILE */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.path} key={page.path}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', fontSize: '1.4rem' }}>
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                        <Link to="/">
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '0.2rem',
                                    fontSize: '1.6rem',
                                    color: 'white',
                                }}
                            >
                                MALL.
                            </Typography>
                        </Link>
                    </Box>
                    {/* USER PROFILE */}

                    {!user && fetchStatus === 'idle' ? (
                        <Link to="auth">
                            <Box>
                                <Button variant="outlined" sx={{ fontSize: '1.4rem', color: 'white' }}>
                                    Login
                                </Button>
                            </Box>
                        </Link>
                    ) : fetchStatus === 'fetching' ? (
                        <Spinner />
                    ) : (
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <Link to={setting.path} key={setting.path}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center', fontSize: '1.4rem' }}>
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
