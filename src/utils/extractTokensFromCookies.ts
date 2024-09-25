export const extractTokensFromCookies = (cookies: string[]) => {
  let accessToken: string = "";
  let refreshToken: string = "";

  const cookieArray = Array.isArray(cookies) ? cookies : [cookies];

  cookieArray.forEach((cookieString) => {
    const individualCookies = cookieString.split(", ");

    individualCookies.forEach((cookie) => {
      const [keyValue] = cookie.split(";");
      const [key, value] = keyValue.split("=");

      if (key.trim() === "access_token") {
        accessToken = value;
      } else if (key.trim() === "refresh_token") {
        refreshToken = value;
      }
    });
  });

  return { accessToken, refreshToken };
};
