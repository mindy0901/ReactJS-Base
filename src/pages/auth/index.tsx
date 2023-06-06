import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/auth';
import { loginForm } from '../../types/authType';

const AuthPage = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (form: loginForm) => login(form),
        onSuccess(data) {
            localStorage.setItem('access_token', data.headers.access_token);
            localStorage.setItem('refresh_token', data.headers.refresh_token);

            navigate('/');
        },
    });

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    width: '300px',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    py: 4,
                    px: 3,
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: '1.5rem', fontWeight: 700 }}>
                        Login
                    </Typography>

                    <Divider />

                    <Stack spacing={3} sx={{ py: 4, flex: 1 }}>
                        <TextField label="Username" variant="standard" />
                        <TextField label="Password" variant="standard" />
                    </Stack>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>WORKING...</Typography>
                    <Button
                        sx={{ width: '240px', height: '40px', fontSize: '1rem', letterSpacing: '0.03rem' }}
                        variant="outlined"
                        onClick={() => {
                            mutation.mutate({ username: 'user1', password: 'password' });
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AuthPage;
