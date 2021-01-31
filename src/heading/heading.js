import React, {Component} from 'react';
import './heading.css'
import Nav from '../nav/nav'


class Heading extends Component {

    render() {

        return (
            <header>
                <Nav />
                <h1>Tabletop Tour</h1>
                {/* {isNav && <Nav />} */}
            </header>
        )
    }
}

export default Heading;