export function savePlayerName({ name }) {
  JSON.stringify({
    name,
  });
  localStorage.setItem("userName", name);
}

export function getPlayerName() {
  const playerName = localStorage.getItem("userName");
  return playerName;
}
