import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { Game } from '../models/game';
import { formatMinsAsHours } from '../utils';
import { Info } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import GameDetailsView from './GameDetailsView';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <Card sx={{ display: 'flex', height: '100%' }}>
        <Grid container sx={{ flexGrow: 1, alignContent: 'flex-start' }}>
          <Grid item xs={12} sm="auto">
            <CardMedia
              sx={{ maxWidth: 231, maxHeight: 87 }}
              component="img"
              image={game.headerMediumURL}
            />
          </Grid>
          <Grid item sx={{ ml: 1, flexGrow: 1 }} xs={6}>
            <Typography variant="h6">
              <strong>{game.name}</strong>
            </Typography>
            <Typography>
              {formatMinsAsHours(game.playTime)} hours on record
            </Typography>
            {!!game.lastPlayed && (
              <Typography>
                last played on{' '}
                {new Date(game.lastPlayed * 1000).toLocaleDateString()}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Box>
          <IconButton onClick={openModal}>
            <Info />
          </IconButton>
        </Box>
      </Card>
      <Modal
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        open={isModalOpen}
        onClose={closeModal}
      >
        <div>
          <GameDetailsView gameId={game.appID} />
        </div>
      </Modal>
    </>
  );
};

export default GameCard;
