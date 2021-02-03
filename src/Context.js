import React from 'react';
import dummyData from './dummyData';

const Context = React.createContext({
    currentUserId: null,
    currentUsername: "",
    gamesData: dummyData.games
})

export default Context;