const fs = require('fs'); // Require the file system module

var dummyMatches = [
  // Existing 6 matches
  {
    id: "1",
    homeTeam: "SOU",
    awayTeam: "MUN",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/536/598/png-clipart-southampton-fc-logo-southampton-fc-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/997/289/png-clipart-manchester-united-logo-food-text-thumbnail.png",
    date: "SEP 14",
    time: "17:00",
    points: 2100,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Southampton",
    awayTeamName: "Manchester United",
  },
  {
    id: "2",
    homeTeam: "MCI",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 14",
    time: "19:30",
    points: 2100,
    status: "live",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Chelsea",
  },
  {
    id: "6",
    homeTeam: "MCI",
    awayTeam: "LIV",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 14",
    time: "16:30",
    points: 2100,
    status: "live",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Liverpool",
  },
  {
    id: "3",
    homeTeam: "LIV",
    awayTeam: "BAR",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/59/955/png-clipart-f-c-barcelona-logo-fc-barcelona-handbol-uefa-champions-league-la-liga-fc-barcelona-logo-text-logo-thumbnail.png",
    date: "SEP 14",
    time: "19:30",
    points: 2100,
    status: "upcoming",
    league: "Champions League",
    homeTeamName: "Liverpool",
    awayTeamName: "Barcelona",
  },
  {
    id: "7",
    homeTeam: "LIV",
    awayTeam: "RMA",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    date: "SEP 17",
    time: "19:30",
    points: 2100,
    status: "upcoming",
    league: "Champions League",
    homeTeamName: "Liverpool",
    awayTeamName: "Real Madrid",
  },
  {
    id: "4",
    homeTeam: "TOT",
    awayTeam: "ARS",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    date: "SEP 13",
    time: "18:30",
    points: 5100,
    status: "completed",
    league: "Premier League",
    homeTeamName: "Tottenham Hotspur",
    awayTeamName: "Arsenal",
  },
  // 34 more entries
  {
    id: "5",
    homeTeam: "BAR",
    awayTeam: "RMA",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/59/955/png-clipart-f-c-barcelona-logo-fc-barcelona-handbol-uefa-champions-league-la-liga-fc-barcelona-logo-text-logo-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    date: "SEP 15",
    time: "20:00",
    points: 3000,
    status: "completed",
    league: "La Liga",
    homeTeamName: "Barcelona",
    awayTeamName: "Real Madrid",
  },
  {
    id: "6",
    homeTeam: "MCI",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 14",
    time: "19:30",
    points: 2100,
    status: "live",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Chelsea",
  },
  {
    id: "7",
    homeTeam: "LIV",
    awayTeam: "BAR",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/59/955/png-clipart-f-c-barcelona-logo-fc-barcelona-handbol-uefa-champions-league-la-liga-fc-barcelona-logo-text-logo-thumbnail.png",
    date: "SEP 14",
    time: "19:30",
    points: 2100,
    status: "upcoming",
    league: "Champions League",
    homeTeamName: "Liverpool",
    awayTeamName: "Barcelona",
  },
  {
    id: "8",
    homeTeam: "PSG",
    awayTeam: "LIL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/104/696/png-clipart-paris-saint-germain-f-c-football-ligue-1-paris-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/249/380/png-clipart-lille-osc-logos-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 16",
    time: "18:00",
    points: 3200,
    status: "upcoming",
    league: "Ligue 1",
    homeTeamName: "Paris Saint-Germain",
    awayTeamName: "Lille",
  },
  {
    id: "8",
    homeTeam: "PSG",
    awayTeam: "LIL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/104/696/png-clipart-paris-saint-germain-f-c-football-ligue-1-paris-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/249/380/png-clipart-lille-osc-logos-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 16",
    time: "18:00",
    points: 3200,
    status: "upcoming",
    league: "Ligue 1",
    homeTeamName: "Paris Saint-Germain",
    awayTeamName: "Lille",
  },
  {
    id: "9",
    homeTeam: "ATL",
    awayTeam: "RMA",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/796/953/png-clipart-atletico-madrid-logo-football-club-atletico-madrid-s-a-d-football-logos-icons-logos-emojis-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    date: "SEP 14",
    time: "21:00",
    points: 3300,
    status: "upcoming",
    league: "La Liga",
    homeTeamName: "Atletico Madrid",
    awayTeamName: "Real Madrid",
  },
  {
    id: "10",
    homeTeam: "JUV",
    awayTeam: "NAP",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/279/292/png-clipart-juventus-f-c-logo-juventus-f-c-premier-league-dream-league-soccer-football-juventus-logo-angle-emblem-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/80/211/png-clipart-napoli-juventus-uefa-europa-league-uefa-champions-league-football-juventus-logo-football-logo-thumbnail.png",
    date: "SEP 13",
    time: "20:00",
    points: 2900,
    status: "completed",
    league: "Serie A",
    homeTeamName: "Juventus",
    awayTeamName: "Napoli",
  },
  {
    id: "11",
    homeTeam: "INT",
    awayTeam: "ROM",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/806/102/png-clipart-inter-milan-logo-fc-internazionale-milano-2018-19-uefa-champions-league-football-football-league-emblem-label-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/442/33/png-clipart-a-s-roma-logo-serie-a-football-as-roma-label-emblem-thumbnail.png",
    date: "SEP 16",
    time: "18:30",
    points: 3500,
    status: "live",
    league: "Serie A",
    homeTeamName: "Inter Milan",
    awayTeamName: "Roma",
  },
  {
    id: "12",
    homeTeam: "MUN",
    awayTeam: "ARS",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/997/289/png-clipart-manchester-united-logo-food-text-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    date: "SEP 14",
    time: "16:30",
    points: 3200,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester United",
    awayTeamName: "Arsenal",
  },
  {
    id: "13",
    homeTeam: "TOT",
    awayTeam: "EVE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/79/773/png-clipart-everton-f-c-logo-premier-league-dream-league-soccer-football-everton-logo-text-logo-thumbnail.png",
    date: "SEP 15",
    time: "17:30",
    points: 4000,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Tottenham Hotspur",
    awayTeamName: "Everton",
  },
  {
    id: "14",
    homeTeam: "BAR",
    awayTeam: "VIL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/59/955/png-clipart-f-c-barcelona-logo-fc-barcelona-handbol-uefa-champions-league-la-liga-fc-barcelona-logo-text-logo-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    date: "SEP 14",
    time: "18:00",
    points: 3400,
    status: "live",
    league: "La Liga",
    homeTeamName: "Barcelona",
    awayTeamName: "Villarreal",
  },
  {
    id: "15",
    homeTeam: "SEV",
    awayTeam: "VIL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/142/934/png-clipart-sevilla-fc-football-uefa-europa-league-la-liga-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/588/848/png-clipart-villarreal-cf-football-logo-futbol-club-barcelona-la-liga-football-logo-thumbnail.png",
    date: "SEP 17",
    time: "21:00",
    points: 3000,
    status: "upcoming",
    league: "La Liga",
    homeTeamName: "Sevilla",
    awayTeamName: "Villarreal",
  },
  {
    id: "16",
    homeTeam: "RMA",
    awayTeam: "FCB",
    homeTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/59/955/png-clipart-f-c-barcelona-logo-fc-barcelona-handbol-uefa-champions-league-la-liga-fc-barcelona-logo-text-logo-thumbnail.png",
    date: "SEP 20",
    time: "20:30",
    points: 3800,
    status: "upcoming",
    league: "La Liga",
    homeTeamName: "Real Madrid",
    awayTeamName: "Barcelona",
  },
  {
    id: "17",
    homeTeam: "BAY",
    awayTeam: "PSG",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/179/785/png-clipart-fc-bayern-munchen-fc-bayern-munchen-logo-fifa-17-fc-bayern-munchen-text-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/104/696/png-clipart-paris-saint-germain-f-c-football-ligue-1-paris-logo-thumbnail.png",
    date: "SEP 14",
    time: "19:45",
    points: 4000,
    status: "completed",
    league: "Champions League",
    homeTeamName: "Bayern Munich",
    awayTeamName: "Paris Saint-Germain",
  },
  {
    id: "18",
    homeTeam: "BVB",
    awayTeam: "RBL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/373/223/png-clipart-borussia-dortmund-logo-bundesliga-football-club-football-club-angle-text-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/612/856/png-clipart-rb-leipzig-german-football-league-fu%C3%9Fball-bundesliga-football-club-logo-football-league-thumbnail.png",
    date: "SEP 19",
    time: "19:45",
    points: 3800,
    status: "upcoming",
    league: "Bundesliga",
    homeTeamName: "Borussia Dortmund",
    awayTeamName: "RB Leipzig",
  },
  {
    id: "19",
    homeTeam: "ROM",
    awayTeam: "LIL",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/442/33/png-clipart-a-s-roma-logo-serie-a-football-as-roma-label-emblem-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/249/380/png-clipart-lille-osc-logos-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 18",
    time: "19:00",
    points: 4100,
    status: "live",
    league: "Serie A",
    homeTeamName: "Roma",
    awayTeamName: "Lille",
  },
  {
    id: "20",
    homeTeam: "MCI",
    awayTeam: "BVB",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/373/223/png-clipart-borussia-dortmund-logo-bundesliga-football-club-football-club-angle-text-thumbnail.png",
    date: "SEP 20",
    time: "20:30",
    points: 3700,
    status: "upcoming",
    league: "Champions League",
    homeTeamName: "Manchester City",
    awayTeamName: "Borussia Dortmund",
  },
  {
    id: "21",
    homeTeam: "ARS",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    date: "SEP 20",
    time: "20:30",
    points: 3900,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Arsenal",
    awayTeamName: "Chelsea",
  },
  {
    id: "22",
    homeTeam: "LIV",
    awayTeam: "MUN",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/997/289/png-clipart-manchester-united-logo-food-text-thumbnail.png",
    date: "SEP 21",
    time: "20:30",
    points: 4100,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Manchester United",
  },
  {
    id: "23",
    homeTeam: "TOT",
    awayTeam: "MCI",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    date: "SEP 22",
    time: "20:30",
    points: 4200,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Tottenham Hotspur",
    awayTeamName: "Manchester City",
  },

  {
    id: "24",
    homeTeam: "ARS",
    awayTeam: "LIV",
    homeTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 23",
    time: "20:30",
    points: 4300,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Arsenal",
    awayTeamName: "Liverpool",
  },
  {
    id: "25",
    homeTeam: "MUN",
    awayTeam: "MCI",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/997/289/png-clipart-manchester-united-logo-food-text-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    date: "SEP 24",
    time: "20:30",
    points: 4400,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester United",
    awayTeamName: "Manchester City",
  },
  {
    id: "26",
    homeTeam: "CHE",
    awayTeam: "TOT",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 25",
    time: "20:30",
    points: 4500,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Chelsea",
    awayTeamName: "Tottenham Hotspur",
  },
  {
    id: "27",
    homeTeam: "LIV",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 26",
    time: "20:30",
    points: 4600,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Chelsea",
  },
  {
    id: "28",
    homeTeam: "MCI",
    awayTeam: "LIV",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 27",
    time: "20:30",
    points: 4700,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Liverpool",
  },
  {
    id: "29",
    homeTeam: "TOT",
    awayTeam: "ARS",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    date: "SEP 28",
    time: "20:30",
    points: 4800,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Tottenham Hotspur",
    awayTeamName: "Arsenal",
  },
  {
    id: "30",
    homeTeam: "ARS",
    awayTeam: "MCI",
    homeTeamLogo:
      "https://www.thesportsdb.com/images/media/team/badge/vrtrtp1448813175.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    date: "SEP 29",
    time: "20:30",
    points: 4900,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Arsenal",
    awayTeamName: "Manchester City",
  },
  {
    id: "31",
    homeTeam: "LIV",
    awayTeam: "TOT",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 30",
    time: "20:30",
    points: 5000,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Tottenham Hotspur",
  },
  {
    id: "32",
    homeTeam: "MCI",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    date: "SEP 31",
    time: "20:30",
    points: 5100,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Chelsea",
  },
  {
    id: "33",
    homeTeam: "LIV",
    awayTeam: "ARS",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/943/239/png-clipart-arsenal-logo-emirates-stadium-arsenal-f-c-premier-league-dream-league-soccer-arsenal-stadium-arsenal-f-c-emblem-label-thumbnail.png",
    date: "OCT 1",
    time: "20:30",
    points: 5200,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Arsenal",
  },
  {
    id: "34",
    homeTeam: "CHE",
    awayTeam: "LIV",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    date: "OCT 2",
    time: "20:30",
    points: 5300,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Chelsea",
    awayTeamName: "Liverpool",
  },
  {
    id: "35",
    homeTeam: "ARS",
    awayTeam: "MCI",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/943/239/png-clipart-arsenal-logo-emirates-stadium-arsenal-f-c-premier-league-dream-league-soccer-arsenal-stadium-arsenal-f-c-emblem-label-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    date: "OCT 3",
    time: "20:30",
    points: 5400,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Arsenal",
    awayTeamName: "Manchester City",
  },
  {
    id: "36",
    homeTeam: "LIV",
    awayTeam: "TOT",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    date: "OCT 4",
    time: "20:30",
    points: 5500,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Tottenham Hotspur",
  },
  {
    id: "37",
    homeTeam: "MCI",
    awayTeam: "CHE",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/866/692/png-clipart-chelsea-football-club-logo-chelsea-logo-icons-logos-emojis-football-thumbnail.png",
    date: "OCT 5",
    time: "20:30",
    points: 5600,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Chelsea",
  },
  {
    id: "38",
    homeTeam: "LIV",
    awayTeam: "MCI",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/800/35/png-clipart-est-1892-liverpool-football-club-logo-liverpool-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    date: "OCT 6",
    time: "20:30",
    points: 5700,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Liverpool",
    awayTeamName: "Manchester City",
  },
  {
    id: "39",
    homeTeam: "TOT",
    awayTeam: "ARS",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/943/239/png-clipart-arsenal-logo-emirates-stadium-arsenal-f-c-premier-league-dream-league-soccer-arsenal-stadium-arsenal-f-c-emblem-label-thumbnail.png",
    date: "OCT 7",
    time: "20:30",
    points: 5800,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Tottenham Hotspur",
    awayTeamName: "Arsenal",
  },
  {
    id: "40",
    homeTeam: "ARS",
    awayTeam: "TOT",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/943/239/png-clipart-arsenal-logo-emirates-stadium-arsenal-f-c-premier-league-dream-league-soccer-arsenal-stadium-arsenal-f-c-emblem-label-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    date: "OCT 8",
    time: "20:30",
    points: 5900,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Arsenal",
    awayTeamName: "Tottenham Hotspur",
  },
  {
    id: "41",
    homeTeam: "MCI",
    awayTeam: "TOT",
    homeTeamLogo:
      "https://e7.pngegg.com/pngimages/71/951/png-clipart-manchester-city-illustration-manchester-city-f-c-eds-and-academy-city-of-manchester-stadium-sunderland-a-f-c-ladies-others-city-logo-thumbnail.png",
    awayTeamLogo:
      "https://e7.pngegg.com/pngimages/92/822/png-clipart-tottenham-hotspur-logo-tottenham-hotspur-logo-icons-logos-emojis-football-thumbnail.png",
    date: "OCT 9",
    time: "20:30",
    points: 6000,
    status: "upcoming",
    league: "Premier League",
    homeTeamName: "Manchester City",
    awayTeamName: "Tottenham Hotspur",
  },
];

function updateHomeTeamLogo(homeTeamName, newLogoUrl) {
  for (let match of dummyMatches) {
    if (match.homeTeamName === homeTeamName) {
      match.homeTeamLogo = newLogoUrl;
      console.log(`Updated ${homeTeamName}'s logo to: ${newLogoUrl}`);
      saveUpdatedMatches(); // Call the function to save the updated matches
      return; // Exit after updating
    }
  }
  console.log(`Match for home team ${homeTeamName} not found.`);
}

// Function to save or update the existing matches
function saveUpdatedMatches() {
  // Check if the file exists
  fs.readFile('newUpdatedMatch.json', 'utf8', (err, data) => {
    let existingMatches = [];

    // If the file exists, parse the existing data
    if (!err) {
      existingMatches = JSON.parse(data);
      // Merge with the updated matches, preventing duplicates
      existingMatches.forEach(existingMatch => {
        const matchIndex = dummyMatches.findIndex(
          match => match.id === existingMatch.id
        );
        if (matchIndex !== -1) {
          existingMatches[existingMatch.id - 1] = dummyMatches[matchIndex]; // Update existing match
        }
      });
    }

    // Write the updated data back to the file
    fs.writeFile('newUpdatedMatch.json', JSON.stringify(existingMatches.concat(dummyMatches.filter(match => !existingMatches.some(existingMatch => existingMatch.id === match.id))), null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Updated matches saved to newUpdatedMatch.json');
      }
    });
  });
}

// Example usage: Update Southampton's logo
// updateHomeTeamLogo(
//   "Southampton",
//   "https://www.thesportsdb.com/images/media/team/badge/ggqtd01621593274.png/medium"
// );

// Example usage: Update Southampton's logo
updateHomeTeamLogo(
  "Manchester United",
  "https://www.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png/medium"
);


