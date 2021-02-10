import React, {Component} from 'react';
import './Heading.css'
import Nav from '../Nav/Nav'


class Heading extends Component {

    render() {

        return (
            <header>
                <div className="text">
                    <h1>Tabletop Tour</h1>
                    <p className="tagline">Discover. Log. Play.</p>
                </div>
                <Nav />
            </header>
        )
    }
}

export default Heading;