import React, {Component} from 'react';
import './About.css'


class About extends Component {

    render() {

        return (
            <section className="about">
                <h2>About</h2>
                <h3>The Story</h3>
                <p>Tabletop Tour is the brainchild of software engineer Kay Holten.</p>
                <p>One day, she realized how tired she was of having to remember all of the cool games she'd had seen advertisements for or had played.</p>
                <p>And, thus, Tabletop Tour was born!</p>
                <p>The site name pays homage to the board game Traveller's Tour Through the United States,
                     which was the first board game published in the United States (in 1822).</p>
                <h3>Acknowledgements</h3>
                <p>Thank you to <a href="https://www.boardgameatlas.com/">Board Game Atlas</a> for their awesome API, which provided all of the tabletop game data you'll find on this site.
                    Bless you and your amazing documentation.</p>
                <p>Happy gaming!</p>
            </section>
        )
    }
}

export default About;