import React from 'react';
import dummyData from './dummyData';

const Context = React.createContext({
    currentUserId: null,
    currentUsername: "",
    allGamesData: dummyData[0].games,
    userGames: dummyData[0].users_games,
    history: {
        location: {
            pathname: "/"
        }
    }
})

export default Context;