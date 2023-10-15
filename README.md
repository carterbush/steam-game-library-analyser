# Steam Game Library Analyser

This monorepo contains a client and server that allows the user to search up Steam users by either their username or steam ID and see details about their game collection

You can view the deployed product here: https://steam-game-library-analyser.vercel.app/

## Cool features

- Username lookup, rather than just steam ID
- Filtering users games based on game name
- Ordering users games based on play time
- Game details are cached

## Running locally

Built using npm v9.5.1 and node v18.16.1

### Build the backend

```bash
# Navigate to directory
cd server

# Copy env file template and fill in the Steam API key in the new .env file
cp .env.example .env

# Install
npm install

# Run
npm run start:dev

# Server available on port 3000
```

### Build the frontend

```bash
# Navigate to directory
cd client

# Copy env file template and update any values as needed
cp .env.example .env

# Install
npm install

# Run
npm run dev

# Client available on port 5173
```

## Possible Improvements and known issues

- API Pagination (user accounts with a huge library have a correspondingly huge amount of games and the application does not like the giant payload)
- API design is pretty rough, without any metadata on responses or designed very defensively
- Error handling is primitive at best
- Some of the front-end styling is pretty rough (that's timeboxing for you!)
- Deployment configuration is half in configuration files, half configured in my Vercel account. It would be nicer for it to be all configuration
- Some weird styling quirks can occur on the Game Cards; games with long titles in particular will wrap at different points causing the layout to be inconsistent
