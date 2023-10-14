import { Avatar } from './avatar';

export interface PlayerSummary {
  profileUrl: string;
  avatar: Avatar;
  steamID: string;
  url: string;
  created?: number;
  lastLogOff?: number;
  nickname: string;
  realName?: string;
  primaryGroupID?: string;
  personaState: number;
  personaStateFlags?: number;
  commentPermission?: number;
  visibilityState: number;
  countryCode?: string;
  stateCode?: string;
  cityID?: number;
  gameServerIP?: string;
  gameServerSteamID?: string;
  gameExtraInfo?: string;
  gameID?: string;
  createdAt: Date;
  lastLogOffAt: Date;
}
