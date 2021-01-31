import React, {Component} from 'react';
import './my-games.css'

//This should be broken up into more components than this

class MyGames extends Component {

    render() {

        return (
            <section>
                <h2>My Games Log</h2>
                <h3>Filter</h3>
                <form>
                    <label htmlFor="genre">Genre: </label>
                    <select name="genre" id="genre">
                        <option value="0">All</option>
                    </select>
                    <label htmlFor="players">Minimum players: </label>
                    <select name="players" id="players">
                        <option value="0">1</option>
                    </select>
                    <label htmlFor="age">Age range: </label>
                    <select name="age" id="age">
                        <option value="0">All</option>
                    </select>
                    <label htmlFor="genre">Order by: </label>
                    <select name="players" id="players">
                        <option value="0">My rating</option>
                    </select>
                    <input type="submit" value="Submit"/>
                </form>
                <h3>My games closet</h3>
                <ul>
                    <li>All games the player has played, ordered by the user's ratings by default</li>
                    <li>There'll be some indication showing which games the user owns.</li>
                </ul>
                <h3>My dream games</h3>
                <ul>
                    <li>All games the player wants to play someday</li>
                </ul>
            </section>
        )
    }
}

export default MyGames;