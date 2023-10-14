import { useCallback, useState } from 'react';
import PlayerOverviewCard from './components/PlayerOverviewCard';
import PlayerSearch from './components/PlayerSearch';
import './App.css';
import { Paper } from '@mui/material';
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
        ></PlayerSearch>
        {playerId && <PlayerOverviewCard playerId={playerId} />}
        {playerId && <GameCards playerId={playerId} />}
      </Paper>
    </>
  );
}

export default App;
