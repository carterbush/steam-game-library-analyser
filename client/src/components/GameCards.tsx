import { HourglassBottom } from '@mui/icons-material';
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
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
  const [orderByTimePlayed, setOrderByTimePlayed] = useState<boolean>(false);

  const onGameNameFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setGameNameFilter(e.target.value),
    [setGameNameFilter],
  );

  const onOrderByTimePlayedChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setOrderByTimePlayed(e.target.checked);
    },
    [setOrderByTimePlayed],
  );

  const filteredAndSortedGames = useMemo(() => {
    const filteredGames = playerGames.filter(
      (g) =>
        !gameNameFilter ||
        g.name.toLowerCase().match(gameNameFilter.toLowerCase()),
    );

    const sortedGames = filteredGames.sort((a, b) =>
      orderByTimePlayed ? b.playTime - a.playTime : 0,
    );

    return sortedGames;
  }, [playerGames, gameNameFilter, orderByTimePlayed]);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <TextField
          label="Filter games by name"
          placeholder="Counter-Strike"
          value={gameNameFilter}
          onChange={onGameNameFilterChange}
        />
        <Box sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={orderByTimePlayed}
                onChange={onOrderByTimePlayedChange}
              />
            }
            label="Order by time played"
          />
        </Box>
      </Box>
      <Grid container sx={{ mt: 1 }} spacing={1}>
        {filteredAndSortedGames.map((game) => (
          <Grid item xs={12} lg={6} xl={4} key={game.appID}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameCards;
