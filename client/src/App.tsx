import { useCallback, useState } from 'react';
import PlayerOverviewCard from './components/PlayerOverviewCard';
import PlayerSearch from './components/PlayerSearch';
import './App.css';
import { Box, Paper } from '@mui/material';
import GameCards from './components/GameCards';
import Header from './components/Header';

function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const clearPlayerId = useCallback(() => setPlayerId(''), [setPlayerId]);

  return (
    <>
      <Header />
      <Paper sx={{ padding: 4 }}>
        <PlayerSearch
          handleIdPrefetch={clearPlayerId}
          handleIdRetrieved={setPlayerId}
        />
        {playerId && (
          <Box sx={{ mt: 1 }}>
            <PlayerOverviewCard playerId={playerId} />
          </Box>
        )}
        {playerId && (
          <Box sx={{ mt: 1 }}>
            <GameCards playerId={playerId} />
          </Box>
        )}
      </Paper>
    </>
  );
}

export default App;
