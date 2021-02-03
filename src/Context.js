import React from 'react';
import dummyData from './dummyData';

const Context = React.createContext({
    currentUserId: null,
    currentUsername: "",
    gamesData: dummyData.games,
    history: {
        location: {
            pathname: "/"
        }
    }
})

export default Context;