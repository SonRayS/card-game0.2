export const listUrl = "https://wedev-api.sky.pro/api/leaderboard";

export async function getListPlayer() {
  const response = await fetch(listUrl).then(response => {
    if (response.status === 400) {
      throw new Error();
    }
    return response;
  });

  const data = await response.json();
  return data;
}
