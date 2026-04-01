import { Box, Typography, Button } from '@mui/material';
  import { useLocation } from 'wouter';

  export default function NotFound() {
    const [, setLocation] = useLocation();
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Typography variant="h2" fontWeight={800} color="text.primary">404</Typography>
        <Typography variant="body1" color="text.secondary">Seite nicht gefunden.</Typography>
        <Button variant="outlined" onClick={() => setLocation('/')}>Zurück</Button>
      </Box>
    );
  }
  