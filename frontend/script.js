const API_BASE = window.TOPZY_API_BASE || "http://localhost:4000/api/v1";
const plannedGames = [
  ["Free Fire","Diamonds","FF"],["PUBG Mobile","UC","PUBG"],["Call of Duty Mobile","CP","COD"],
  ["Mobile Legends","Diamonds","ML"],["Genshin Impact","Genesis Crystals","GI"],["Honkai: Star Rail","Oneiric Shards","HSR"],
  ["Roblox","Robux","R"],["EA SPORTS FC Mobile","FC Points","FC"],["eFootball","Coins","EF"],
  ["Clash of Clans","Gems","COC"],["Clash Royale","Gems","CR"],["Fortnite","V-Bucks","FN"],
  ["Valorant","VP","V"],["League of Legends","RP","LOL"],["Arena of Valor","Vouchers","AOV"],
  ["Blood Strike","Gold","BS"],["Delta Force","Delta Coins","DF"],["Wuthering Waves","Lunites","WW"],
  ["Zenless Zone Zero","Monochromes","ZZZ"],["Stumble Guys","Gems","SG"]
];
const grid = document.getElementById("gamesGrid");
const search = document.getElementById("gameSearch");
function renderGames(items){
  grid.innerHTML = items.length ? items.map(([name,currency,mark]) => `
    <article class="game-card" data-game="${name.toLowerCase()}">
      <div class="game-icon">${mark}</div><div><h3>${name}</h3><p>${currency}</p></div>
    </article>`).join("") : '<p class="loading">No games match your search.</p>';
}
renderGames(plannedGames);
search.addEventListener("input",()=>renderGames(plannedGames.filter(g=>g[0].toLowerCase().includes(search.value.trim().toLowerCase()))));
document.getElementById("year").textContent = new Date().getFullYear();
const toast = document.getElementById("toast");
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600);}
document.getElementById("loginBtn").addEventListener("click",()=>showToast("Account sign-in will be enabled when authentication is connected."));
document.getElementById("signupBtn").addEventListener("click",()=>showToast("Account registration will be enabled when authentication is connected."));
// Once the backend is deployed, set window.TOPZY_API_BASE to its /api/v1 URL.
// The catalogue currently shows the planned 20 games; it does not claim live supplier availability.
