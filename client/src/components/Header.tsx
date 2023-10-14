import { SportsEsports } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar>
          <SportsEsports sx={{ mr: 2 }} fontSize="large" />
          <Typography variant="h6">Steam Game Library Analyser</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
