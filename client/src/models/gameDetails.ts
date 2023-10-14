class GameCategory {
  id?: number;
  description?: string;
}

class GameGenre {
  id?: number;
  description?: string;
}

class GameReleaseDate {
  coming_soon?: boolean;
  date?: string;
}

class GameRequirements {
  minimum?: string;
  recommended?: string;
}

class GameScreenshot {
  id?: number;
  path_thumbnail?: string;
  path_full?: string;
}

export class GameDetails {
  type?: string;
  name?: string;
  steam_appid?: number;
  required_age?: string;
  is_free?: boolean;
  detailed_description?: string;
  about_the_game?: string;
  short_description?: string;
  supported_languages?: string;
  header_image?: string;
  capsule_image?: string;
  capsule_imagev5?: string;
  website?: string;
  pc_requirements?: GameRequirements;
  mac_requirements?: GameRequirements;
  linux_requirements?: GameRequirements;
  categories?: GameCategory[];
  genres?: GameGenre[];
  screenshots?: GameScreenshot[];
  release_date?: GameReleaseDate;
  background?: string;
}
