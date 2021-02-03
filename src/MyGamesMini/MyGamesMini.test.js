import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import MyGamesMini from './MyGamesMini';

it('renders without crashing', () => {
  const usersGamesData = {
    have_played: true,
    love: true,
    want_to_play: true
  }

  const gameData = {
    "id": "AuBvbISHR6",
    "name": "Ticket To Ride",
    "handle": "ticket-to-ride",
    "url": "https://www.boardgameatlas.com/game/AuBvbISHR6/ticket-to-ride",
    "price": "39.08",
    "price_ca": "49.95",
    "price_uk": "0.00",
    "msrp": 49.99,
    "msrps": [
        {
            "country": "US",
            "price": 49.99
        }
    ],
    "discount": "0.22",
    "min_players": 2,
    "max_players": 5,
    "min_playtime": 45,
    "max_playtime": 90,
    "min_age": 8,
    "description": "Ticket to Ride is a cross-country train adventure game. Players collect train cards that enable them to claim railway routes connecting cities throughout North America. The longer the routes, the more points they earn. Additional points come to those who can fulfill their Destination Tickets by connecting two distant cities, and to the player who builds the longest continuous railway. So climb aboard for some railroading fun and adventure. You've got a Ticket to Ride!<br />\r\n<br />\r\nOctober 2, 1900 -- it's 28 years to the day that noted London eccentric, Phileas Fogg accepted and then won a 20,000 bet that he could travel Around the World in 80 Days. Now at the dawn of the century some old friends have gathered to celebrate Fogg's impetuous and lucrative gamble -- and to propose a new wager of their own. The stakes: $1 million in a winner-takes-all competition. The objective: to see the most cities in North America -- in just 7 days. <br />\r\n<br />\r\n-Spiel Des Jahres 2004(German game of the year)<br />\r\n-As d'Or Cannes 2004 (French game of the year)<br />\r\n-Game of the year 2004 - Japan<br />\r\n-Game of the year 2004 - Sweden<br />\r\n-Game of the year 2004 - Finland<br />\r\n-Diana Jones Excellence in Gaming Award 2004<br />\r\n-Origins Award Winner - Best Board Game 2005<br />\r\n-Game of the year 2004 - Spain<br />\r\n-Parent's Choice Foundation Silver Medal 2004",
    "commentary": "",
    "thumb_url": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254202421-61wLscAHHSL.jpg",
    "image_url": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254202421-61wLscAHHSL.jpg",
    "matches_specs": null,
    "specs": [],
    "mechanics": [
        {
            "id": "wV5peB05xs"
        },
        {
            "id": "WPytek5P8l"
        },
        {
            "id": "lA3KUtVFCy"
        },
        {
            "id": "ohABM4GjbC"
        }
    ],
    "categories": [
        {
            "id": "h8wfZG0j3I"
        },
        {
            "id": "JwHcKqxh33"
        }
    ],
    "developers": [],
    "artists": [
        "Julien Delval",
        "Cyrille Daujean"
    ],
    "designers": [
        {
            "id": "yozxd5BrMc"
        }
    ],
    "publishers": [
        {
            "id": "gniNJ5XEjM"
        }
    ],
    "primary_publisher": {
        "name": "Days of Wonder",
        "id": "gniNJ5XEjM",
        "url": "https://www.boardgameatlas.com/publisher/gniNJ5XEjM/days-of-wonder"
    },
    "primary_designer": {
        "name": "Alan R. Moon",
        "id": "yozxd5BrMc",
        "url": "https://www.boardgameatlas.com/designer/yozxd5BrMc/alan-r-moon"
    },
    "names": [],
    "tags": [
        "Ticket to Ride",
        "Zug um Zug (German)",
        " Les Aventuriers du Rail (French)",
        "Aventureros al Tren (Spanish)",
        "Wsiąść do pociągu (Polish)",
        "Menolippu (Finnish)",
        "Ticket To Ride - Ding & Dent",
        "Ticket To Ride 1 Anniversary Edition",
        "Ticket To Ride: 15th Anniversary Edition",
        "Ticket To Ride: 15th Anniversary Special Edition",
        "Ticket to Ride",
        "Ticket to Ride: 15th Anniversary Edition - Ding/Dent",
        "Ticket to Ride"
    ],
    "publisher": "Days of Wonder",
    "rules_url": "https://ncdn0.daysofwonder.com/tickettoride/en/img/tt_rules_2015_en.pdf",
    "reddit_count": 1257,
    "amazon_rank": 338,
    "cs_rating": 4.5,
    "official_url": "https://www.daysofwonder.com/tickettoride/en/?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=bga_ads",
    "comment_count": 0,
    "num_user_ratings": 607,
    "average_user_rating": 3.519834278840121,
    "weight_amount": 2.8,
    "weight_units": "lbs ",
    "size_height": 11.8,
    "size_depth": 3,
    "size_units": "inches ",
    "historical_low_prices": [
        {
            "country": "US",
            "date": {
                "__type": "Date",
                "iso": "2021-01-31T19:54:05.965Z"
            },
            "price": 39.08,
            "isLow": false
        }
    ],
    "active": true,
    "bgg_id": 9209,
    "num_user_complexity_votes": 4,
    "average_learning_complexity": 2,
    "average_strategy_complexity": 2.25,
    "visits": 2640,
    "lists": 1071,
    "plays": 3797,
    "mentions": 54,
    "links": 15,
    "rank": 17,
    "type": "game",
    "trending_rank": 0,
    "listing_clicks": 9,
    "is_historical_low": false,
    "year_published": 2004,
    "msrp_text": "$49.99",
    "price_text": "$39.08",
    "images": {
        "thumb": "https://d2k4q26owzy373.cloudfront.net/40x40/games/uploaded/1559254202421-61wLscAHHSL.jpg",
        "small": "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254202421-61wLscAHHSL.jpg",
        "medium": "https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1559254202421-61wLscAHHSL.jpg",
        "large": "https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1559254202421-61wLscAHHSL.jpg",
        "original": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254202421-61wLscAHHSL.jpg"
    },
    "description_preview": "Ticket to Ride is a cross-country train adventure game. Players collect train cards that enable them to claim railway routes connecting cities throughout North America. The longer the routes, the more points they earn. Additional points come to those who can fulfill their Destination Tickets by connecting two distant cities, and to the player who builds the longest continuous railway. So climb aboard for some railroading fun and adventure. You've got a Ticket to Ride! \r\n \r\nOctober 2, 1900 -- it's 28 years to the day that noted London eccentric, Phileas Fogg accepted and then won a 20,000 bet that he could travel Around the World in 80 Days. Now at the dawn of the century some old friends have gathered to celebrate Fogg's impetuous and lucrative gamble -- and to propose a new wager of their own. The stakes: $1 million in a winner-takes-all competition. The objective: to see the most cities in North America -- in just 7 days.  \r\n \r\n-Spiel Des Jahres 2004(German game of the year) \r\n-As d'Or Cannes 2004 (French game of the year) \r\n-Game of the year 2004 - Japan \r\n-Game of the year 2004 - Sweden \r\n-Game of the year 2004 - Finland \r\n-Diana Jones Excellence in Gaming Award 2004 \r\n-Origins Award Winner - Best Board Game 2005 \r\n-Game of the year 2004 - Spain \r\n-Parent's Choice Foundation Silver Medal 2004"
}

  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <MyGamesMini usersGamesData={usersGamesData} gameData={gameData}/>,
    </MemoryRouter>,
      div
    );
  ReactDOM.unmountComponentAtNode(div);
});
