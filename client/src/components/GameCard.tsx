import { Box, Card, CardMedia, Typography } from '@mui/material';
import { Game } from '../models/game';
import { formatMinsAsHours } from '../utils';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        sx={{ width: 231 }}
        component="img"
        image={game.headerMediumURL}
      />
      <Box sx={{ width: 231 }}>
        <Typography variant="h6">
          <strong>{game.name}</strong>
        </Typography>
        <Typography>
          {formatMinsAsHours(game.playTime)} hours on record
        </Typography>
        <Typography>
          last played on {new Date(game.lastPlayed * 1000).toLocaleDateString()}
        </Typography>
      </Box>
    </Card>
  );
};

export default GameCard;