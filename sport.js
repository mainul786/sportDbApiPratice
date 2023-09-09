const loadSportData = async () => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`;
    const res = await fetch(url);
    const data = await (res.json());
    console.log(data);
    displayLeagues(data.leagues);
}

const displayLeagues = leagues => {
    const sports = leagues.slice(0, 50);
    console.log(sports);
    const sportContainer = document.getElementById('sports');
    sports.forEach(sport => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="playerDisplay('${sport.idLeague}')" class="card">
        <div class="card-body">
          <h5 class="card-title">${sport.strLeague ? sport.strLeague : 'not found data'}</h5>
          <p class="card-text">${sport.strLeagueAlternate
            ? sport.strLeagueAlternate
            : 'no-data'}</p>
            </div>
            </div>
        `;
        sportContainer.appendChild(div);
    })
}

const playerDisplay =async (playerId) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${playerId}`;
    const res = await fetch(url);
    const data = await(res.json());
    displaySeason(data.table);
}

const displaySeason = seasons =>{
    console.log(seasons);
    // const totalSeasons = seasons.slice(0, 10);
    const seasonDetails = document.getElementById('seasonDetails');
    seasons.forEach(seson =>{
        
        seasonDetails.innerHTML = `
        <p>Leaguage Teams: ${seson.strTeam}</p>
        <p>Team Rank: ${seson.intRank}</p>
        <img src='${seson.strTeamBadge}' />
        `;
    })

}

loadSportData();