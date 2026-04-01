import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useScores } from '../hooks/useScores';
import { format } from 'date-fns';

interface Props {
  currentPlayer: string;
}

const MEDALS = [
  { color: '#F59E0B', bg: '#FFFBEB' },
  { color: '#94A3B8', bg: '#F8FAFC' },
  { color: '#CD7F32', bg: '#FEF3C7' },
];

export default function HighscoreTable({ currentPlayer }: Props) {
  const scores = useScores(10);

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%', '&:last-child': { pb: 0 } }}>
        <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EmojiEventsIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.2}>
                Bestenliste
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Top 10 schnellste Reaktionen
              </Typography>
            </Box>
          </Box>
        </Box>

        <TableContainer sx={{ flexGrow: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '14%', pl: 3 }}>#</TableCell>
                <TableCell sx={{ width: '40%' }}>Spieler</TableCell>
                <TableCell sx={{ width: '26%' }} align="right">Zeit</TableCell>
                <TableCell sx={{ width: '20%', pr: 3 }} align="right">Datum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Noch keine Scores. Sei der Erste!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                scores.map((score, index) => {
                  const medal = MEDALS[index];
                  const isCurrentPlayer = score.playerName === currentPlayer;
                  return (
                    <TableRow
                      key={score.id}
                      sx={{
                        bgcolor: isCurrentPlayer ? 'rgba(79, 70, 229, 0.04)' : 'transparent',
                        '&:hover': { bgcolor: isCurrentPlayer ? 'rgba(79, 70, 229, 0.07)' : 'rgba(0,0,0,0.02)' },
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <TableCell sx={{ pl: 3 }}>
                        {medal ? (
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: medal.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: medal.color }}>
                              {index + 1}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {index + 1}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem', fontWeight: 700, bgcolor: isCurrentPlayer ? 'primary.main' : '#E2E8F0', color: isCurrentPlayer ? '#fff' : 'text.secondary' }}>
                            {score.playerName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" fontWeight={isCurrentPlayer ? 700 : 500} color={isCurrentPlayer ? 'primary.main' : 'text.primary'}>
                            {score.playerName}
                            {isCurrentPlayer && (
                              <Typography component="span" variant="caption" color="primary.main" sx={{ ml: 0.5, fontWeight: 600 }}>
                                (Du)
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <Chip
                          label={`${score.reactionTimeMs} ms`}
                          size="small"
                          sx={{ fontWeight: 700, fontSize: '0.75rem', bgcolor: index === 0 ? '#FEF3C7' : '#F1F5F9', color: index === 0 ? '#D97706' : 'text.secondary', border: 'none' }}
                        />
                      </TableCell>

                      <TableCell align="right" sx={{ pr: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(score.createdAt), 'dd.MM.')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
