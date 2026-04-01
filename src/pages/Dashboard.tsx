import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'wouter';
import ReactionGame from '../components/ReactionGame';
import HighscoreTable from '../components/HighscoreTable';

export default function Dashboard() {
  const [playerName, setPlayerName] = useState('');
  const [, setLocation] = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('playerName');
    if (!stored) {
      setLocation('/');
      return;
    }
    setPlayerName(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('playerName');
    setLocation('/');
  };

  if (!playerName) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="inherit" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <SpeedIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ flexGrow: 1 }}>
            Reaktionstest
          </Typography>

          <Chip
            avatar={
              <Avatar sx={{ bgcolor: 'primary.light', color: '#fff !important', fontWeight: 700, fontSize: '0.75rem' }}>
                {playerName.charAt(0).toUpperCase()}
              </Avatar>
            }
            label={playerName}
            variant="outlined"
            sx={{ fontWeight: 600, borderColor: 'divider' }}
          />

          <Button
            size="small"
            color="inherit"
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            Wechseln
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <ReactionGame playerName={playerName} />
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <HighscoreTable currentPlayer={playerName} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
