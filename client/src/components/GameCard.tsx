import {
  Box,
  Card,
  CardMedia,
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
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          sx={{ width: 231, height: 87 }}
          component="img"
          image={game.headerMediumURL}
        />
        <Box sx={{ ml: 1, flexGrow: 1 }}>
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
        </Box>
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
