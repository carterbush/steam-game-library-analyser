import axios from 'axios';
import { Game } from '../models/game';
import { PlayerOverview } from '../models/playerOverview';
import { PlayerSummary } from '../models/playerSummary';
import { GameDetails } from '../models/gameDetails';

const host = import.meta.env.VITE_BACKEND_HOST;

const api = {
  getGameDetails: (appid: number): Promise<GameDetails> =>
    axios
      .get(`${host}/steam/game/${appid}/details`)
      .then((res) => res.data as GameDetails),

  getPlayerId: (username: string): Promise<string> =>
    axios
      .get(`${host}/steam/player/${username}`, { transformResponse: [] })
      .then((res) => res.data as string),

  getPlayerGames: (userid: string): Promise<Game[]> =>
    axios
      .get(`${host}/steam/player/${userid}/games`)
      .then((res) => res.data as Game[]),

  getPlayerOverview: (userid: string): Promise<PlayerOverview> =>
    axios
      .get(`${host}/steam/player/${userid}/overview`)
      .then((res) => res.data as PlayerOverview),

  getPlayerSummary: (userid: string): Promise<PlayerSummary> =>
    axios
      .get(`${host}/steam/player/${userid}/summary`)
      .then((res) => res.data as PlayerSummary),
};

export default api;
