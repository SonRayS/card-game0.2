export const listUrl = "https://wedev-api.sky.pro/api/v2/leaderboard";

export async function getListPlayer() {
  const response = await fetch(listUrl, {
    method: "GET",
  }).then(response => {
    if (response.status === 400) {
      throw new Error();
    }
    return response;
  });

  const data = await response.json();
  return data;
}
