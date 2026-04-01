import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useLocation } from 'wouter';

export default function NameEntry() {
  const [name, setName] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem('playerName', name.trim());
    setLocation('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F0F4FF 0%, #FAF5FF 50%, #EEF2FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
            Reaktionstest
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Wie schnell bist du?
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" fontWeight={600} mb={1} color="text.primary">
              Dein Name
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Er erscheint in der Highscore-Tabelle.
            </Typography>

            <TextField
              fullWidth
              placeholder="Name eingeben"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { fontSize: '1.05rem', bgcolor: '#F8FAFC' },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!name.trim()}
              sx={{ py: 1.8, fontSize: '1rem', fontWeight: 700 }}
            >
              Weiter
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
