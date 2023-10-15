import { HourglassBottom } from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, Grid, Typography } from '@mui/material';
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
      <Grid container spacing={2}>
        <Grid item xs={12} md="auto">
          <CardMedia
            sx={{ width: 460, height: 215 }}
            component="img"
            image={gameDetails?.header_image}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
            <Typography variant="h3" color="lightgrey">
              {gameDetails?.name}
            </Typography>
            <Typography variant="h6" color="#808080">
              Release date: {gameDetails?.release_date?.date}
            </Typography>
            <Typography
              color="#808080"
              sx={{ flexGrow: 1, mt: 1 }}
              component="div"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: gameDetails?.detailed_description ?? '',
                }}
              />
            </Typography>
            <Box sx={{ mt: 1 }}>
              {gameDetails?.genres?.map((genre) => (
                <Chip
                  key={genre?.id}
                  sx={{ color: '#808080', mr: 2 }}
                  label={genre?.description}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

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
