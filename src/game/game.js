import React, {Component} from 'react';
import './game.css'

class Game extends Component {

    render() {

        return (
            <section>
                <h2>Game Name</h2>
                <p>An image will go here</p>
                <ul>
                    <li>Alternate names</li>
                    <li>Number of players</li>
                    <li>Minimum age</li>
                    <li>Description</li>
                    <li>Categories</li>
                    <li>Year published</li>
                </ul>
                <h3>User reviews</h3>
                <ul>
                    <li>User reviews go here</li>
                </ul>
            </section>
        )
    }
}

export default Game;