import { HourglassBottom } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Game } from '../models/game';
import api from '../api';
import GameCard from './GameCard';
import { Card, Grid } from '@mui/material';

interface GameCardsProps {
  playerId: string;
}

const GameCards: React.FC<GameCardsProps> = ({ playerId }) => {
  const [playerGames, setPlayerGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <Grid container sx={{ mt: 1 }} spacing={1}>
      {playerGames.map((game) => (
        <Grid
          item
          xs={12}
          lg={6}
          xl={4}
          sx={{ marginBottom: 1 }}
          key={game.appID}
        >
          <GameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameCards;
