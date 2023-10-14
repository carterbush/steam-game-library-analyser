import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { HourglassBottom } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import api from '../api';
import { PlayerOverview } from '../models/playerOverview';
import { PlayerSummary } from '../models/playerSummary';
import { formatMinsAsHours } from '../utils';

interface PlayerOverviewCardProps {
  playerId: string;
}

const PlayerOverviewCard: React.FC<PlayerOverviewCardProps> = ({
  playerId,
}) => {
  const [playerOverview, setPlayerOverview] = useState<PlayerOverview>();
  const [playerSummary, setPlayerSummary] = useState<PlayerSummary>();

  useEffect(() => {
    Promise.all([
      api.getPlayerOverview(playerId),
      api.getPlayerSummary(playerId),
    ]).then(([overview, summary]) => {
      setPlayerOverview(overview);
      setPlayerSummary(summary);
    });
  }, [playerId]);

  return (
    <Card>
      {!playerOverview || !playerSummary ? (
        <HourglassBottom />
      ) : (
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            sx={{ width: 184 }}
            component="img"
            image={playerSummary.avatar.large}
          />
          <Box sx={{ margin: 1 }}>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4">{playerSummary.nickname}</Typography>
              <Typography color="#808080" variant="h6">
                {playerSummary.steamID}
              </Typography>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography>
                Has {playerOverview.totalGames} games in their library
              </Typography>
              <Typography>
                Has played {formatMinsAsHours(playerOverview.totalPlayTime)}{' '}
                hours of games
              </Typography>
              {playerOverview.mostPlayedGame && (
                <Typography>
                  Most played game is {playerOverview.mostPlayedGame.name}, with{' '}
                  {formatMinsAsHours(playerOverview.mostPlayedGame.playTime)}{' '}
                  hours played
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default PlayerOverviewCard;
