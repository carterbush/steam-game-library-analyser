import { HourglassBottom, Search } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import api from '../api';

interface PlayerSearchProps {
  handleIdRetrieved: (id: string) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ handleIdRetrieved }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPlayerNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value),
    [setPlayerName],
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      setIsLoading(true);
      api
        .getPlayerId(playerName)
        .then((id) => {
          handleIdRetrieved(id);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [playerName, handleIdRetrieved, setIsLoading],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{ mr: 1, flexGrow: 1 }}
        label="Enter Steam username"
        placeholder="eg: xXxProHeadshotG4merxXx"
        value={playerName}
        onChange={onPlayerNameChange}
      />
      <Button
        sx={{ flexGrow: 0 }}
        variant="contained"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <HourglassBottom /> : <Search />}
      </Button>
    </Box>
  );
};

export default PlayerSearch;
