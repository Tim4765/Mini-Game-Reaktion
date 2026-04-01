import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Fade,
  Chip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import { addScore } from '../hooks/useScores';

type GameState = 'idle' | 'countdown' | 'waiting' | 'ready' | 'result';

interface Props {
  playerName: string;
}

export default function ReactionGame({ playerName }: Props) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [tooEarly, setTooEarly] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => () => cleanup(), []);

  const startGame = () => {
    setGameState('countdown');
    setCountdown(3);
    setReactionTime(null);
    setTooEarly(false);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setGameState('waiting');
        const delay = Math.random() * 3000 + 1000;
        timeoutRef.current = setTimeout(() => {
          setGameState('ready');
          startTimeRef.current = performance.now();
        }, delay);
      }
    }, 1000);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      cleanup();
      setTooEarly(true);
      setGameState('result');
    } else if (gameState === 'ready') {
      const ms = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(ms);
      setGameState('result');
      addScore(playerName, ms);
    }
  };

  const gameAreaColor =
    gameState === 'ready' ? '#4F46E5' :
    gameState === 'waiting' ? '#94A3B8' :
    gameState === 'countdown' ? '#E2E8F0' :
    '#F1F5F9';

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Reaktionstest
          </Typography>
          {gameState === 'idle' && (
            <Chip label={playerName} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary', fontWeight: 500 }} />
          )}
        </Box>

        {gameState === 'idle' && (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              bgcolor: '#F8FAFC',
              borderRadius: 3,
              border: '2px dashed #E2E8F0',
              p: 4,
            }}
          >
            <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 320 }}>
              Klicke auf die Fläche, sobald sie blau wird. Reagiere so schnell wie möglich.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={startGame}
              sx={{ minWidth: 180 }}
            >
              Starten
            </Button>
          </Box>
        )}

        {gameState !== 'idle' && (
          <Box
            onClick={handleClick}
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              minHeight: 280,
              cursor: (gameState === 'waiting' || gameState === 'ready') ? 'pointer' : 'default',
              bgcolor: gameAreaColor,
              transition: 'background-color 0.15s ease',
              userSelect: 'none',
            }}
          >
            {gameState === 'countdown' && (
              <Fade in key={countdown}>
                <Box textAlign="center">
                  <Typography sx={{ fontSize: '6rem', fontWeight: 800, color: '#4F46E5', lineHeight: 1 }}>
                    {countdown}
                  </Typography>
                </Box>
              </Fade>
            )}

            {gameState === 'waiting' && (
              <Box textAlign="center">
                <Typography variant="h4" sx={{ color: '#475569', fontWeight: 700 }}>
                  Warten...
                </Typography>
              </Box>
            )}

            {gameState === 'ready' && (
              <Fade in>
                <Box textAlign="center">
                  <Typography sx={{ fontSize: '5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                    JETZT!
                  </Typography>
                </Box>
              </Fade>
            )}

            {gameState === 'result' && (
              <Box textAlign="center" p={4}>
                {tooEarly ? (
                  <>
                    <Typography variant="h5" fontWeight={700} color="error" gutterBottom>
                      Zu früh geklickt
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                      Warte, bis die Fläche blau wird.
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
                    {reactionTime} ms
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ReplayIcon />}
                  onClick={startGame}
                >
                  Nochmal
                </Button>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
