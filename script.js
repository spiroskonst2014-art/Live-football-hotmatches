async function fetchMatches() {
  try {
    const res = await fetch(`${CONFIG.BASE_URL}fixtures?live=all`, {
      headers: { "x-apisports-key": CONFIG.API_KEY }
    });
    const data = await res.json();
    const container = document.getElementById("matches");
    container.innerHTML = "";
    (data.response || []).forEach(m => {
      const div = document.createElement("div");
      div.className = "mb-3 p-2 bg-gray-800 rounded";
      const teams = `${m.teams.home.name} vs ${m.teams.away.name}`;
      const score = `${m.goals.home} - ${m.goals.away}`;
      div.innerHTML = `<b>${teams}</b> | Score: ${score}`;
      container.appendChild(div);
    });
  } catch(e) {
    console.error(e);
  }
}
fetchMatches();
setInterval(fetchMatches, CONFIG.REFRESH_MS);
