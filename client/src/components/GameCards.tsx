import { HourglassBottom } from '@mui/icons-material';
import { Box, Card, Grid, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Game } from '../models/game';
import api from '../api';
import GameCard from './GameCard';

interface GameCardsProps {
  playerId: string;
}

const GameCards: React.FC<GameCardsProps> = ({ playerId }) => {
  const [playerGames, setPlayerGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameNameFilter, setGameNameFilter] = useState<string>('');
  const onGameNameFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setGameNameFilter(e.target.value),
    [setGameNameFilter],
  );

  const filteredGames = useMemo(() => {
    return playerGames.filter(
      (g) =>
        !gameNameFilter ||
        g.name.toLowerCase().match(gameNameFilter.toLowerCase()),
    );
  }, [playerGames, gameNameFilter]);

  useEffect(() => {
    setIsLoading(true);
    api.getPlayerGames(playerId).then((games) => {
      setIsLoading(false);
      setPlayerGames(games);
    });
  }, [playerId]);

  return isLoading ? (
    <Card
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <HourglassBottom />
    </Card>
  ) : (
    <Box>
      <Box sx={{ mt: 1 }}>
        <TextField
          label="Filter games by name"
          placeholder="Counter-Strike"
          value={gameNameFilter}
          onChange={onGameNameFilterChange}
        />
      </Box>
      <Grid container sx={{ mt: 1 }} spacing={1}>
        {filteredGames.map((game) => (
          <Grid item xs={12} lg={6} xl={4} key={game.appID}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameCards;
