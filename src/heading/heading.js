import React, {Component} from 'react';
import './Heading.css'
import Nav from '../Nav/Nav'


class Heading extends Component {

    render() {

        return (
            <header>
                <Nav />
                <h1>Tabletop Tour</h1>
                <p>Discover. Record. Play.</p>
            </header>
        )
    }
}

export default Heading;