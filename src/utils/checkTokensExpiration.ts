const checkTokensExpiration = (
  accessExpireAr: number,
  refreshExpireAt: number
): { isAccessExpired: boolean; isRefreshExpired: boolean } => {
  const milliseconds = Date.now();
  const seconds = Math.floor(milliseconds / 1000);

  return {
    isAccessExpired: seconds > accessExpireAr,
    isRefreshExpired: seconds > refreshExpireAt
  };
};

export default checkTokensExpiration;
