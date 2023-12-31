import { HourglassBottom, Search } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import api from '../api';
import { isSteamId } from '../utils';

interface PlayerSearchProps {
  handleIdPrefetch: () => void;
  handleIdRetrieved: (id: string) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({
  handleIdPrefetch,
  handleIdRetrieved,
}) => {
  const [playerInput, setPlayerInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPlayerNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPlayerInput(e.target.value),
    [setPlayerInput],
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Clear existing user immediately
      handleIdPrefetch();

      // If the input is a steam id, we can directly use that. Otherwise, assume it's a
      // player's username and try and convert it via the backend
      const handleInputPromise = isSteamId(playerInput)
        ? Promise.resolve(playerInput)
        : api.getPlayerId(playerInput);

      handleInputPromise
        .then((id) => {
          handleIdRetrieved(id);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [playerInput, handleIdPrefetch, handleIdRetrieved, setIsLoading],
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
        label="Enter Steam username or Steam ID"
        placeholder="eg: xXxProHeadshotG4merxXx"
        value={playerInput}
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
