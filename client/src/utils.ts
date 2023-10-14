export const formatMinsAsHours = (mins: number): string =>
  (mins / 60).toFixed(1);

export const isSteamId = (maybeSteamId: string): boolean => {
  try {
    // Seems a bit dodgy, but steam ids are supposed to be 64 bit numbers so...
    BigInt(maybeSteamId);
    return true;
  } catch {
    return false;
  }
};
