import { HourglassBottom } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api';
import { GameDetails } from '../models/gameDetails';

interface GameDetailsProps {
  gameId: number;
}

const GameDetailsView: React.FC<GameDetailsProps> = ({ gameId }) => {
  const [gameDetails, setGameDetails] = useState<GameDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    api.getGameDetails(gameId).then((gameDetails) => {
      setIsLoading(false);
      setGameDetails(gameDetails);
    });
  }, [gameId]);

  return isLoading ? (
    <Card>
      <HourglassBottom />
    </Card>
  ) : (
    <Card
      sx={{
        backgroundImage: `url(${gameDetails?.background})`,
        p: 4,
        maxWidth: 1438,
        maxHeight: 810,
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          sx={{ width: 460, height: 215 }}
          component="img"
          image={gameDetails?.header_image}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mb: 1 }}>
          <Typography variant="h3" color="lightgrey">
            {gameDetails?.name}
          </Typography>
          <Typography variant="h6" color="grey">
            Release date: {gameDetails?.release_date?.date}
          </Typography>
          <Typography color="grey" sx={{ flexGrow: 1, mt: 1 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: gameDetails?.detailed_description ?? '',
              }}
            />
          </Typography>
          <Box sx={{ mt: 1 }}>
            {gameDetails?.genres?.map((genre) => (
              <Chip
                sx={{ color: 'grey', mr: 2 }}
                label={genre?.description}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {gameDetails?.screenshots?.map((screenshot) => (
          <CardMedia
            key={screenshot.id}
            sx={{ maxWidth: 150, mt: 1, mr: 1 }}
            component="img"
            image={screenshot.path_thumbnail}
          />
        ))}
      </Box>
    </Card>
  );
};

export default GameDetailsView;
