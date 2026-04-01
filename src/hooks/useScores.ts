import { useState, useEffect } from 'react';

export interface Score {
  id: string;
  playerName: string;
  reactionTimeMs: number;
  createdAt: string;
}

const STORAGE_KEY = 'scores';

export function getScores(): Score[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addScore(playerName: string, reactionTimeMs: number): Score {
  const scores = getScores();
  const newScore: Score = {
    id: Date.now().toString(),
    playerName,
    reactionTimeMs,
    createdAt: new Date().toISOString(),
  };
  scores.push(newScore);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  window.dispatchEvent(new Event('scores-updated'));
  return newScore;
}

export function useScores(limit = 10): Score[] {
  const [scores, setScores] = useState<Score[]>([]);

  const load = () => {
    const all = getScores();
    all.sort((a, b) => a.reactionTimeMs - b.reactionTimeMs);
    setScores(all.slice(0, limit));
  };

  useEffect(() => {
    load();
    window.addEventListener('scores-updated', load);
    return () => window.removeEventListener('scores-updated', load);
  }, []);

  return scores;
}
