export const SESSION_KEY = "x-session-token";

function getCookie(cookieHeader: string, name: string): string | null {
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
}

export function getToken(request: Request): string | null {
  const tokenFromHeaders = request.headers.get(SESSION_KEY) ?? null;
  if (tokenFromHeaders) {
    return tokenFromHeaders;
  }

  const cookies = request.headers.get("cookie");
  if (!cookies) {
    return null;
  }

  return getCookie(cookies, SESSION_KEY);
}
