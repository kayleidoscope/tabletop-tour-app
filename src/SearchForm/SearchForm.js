import React, {Component} from 'react';
import './SearchForm.css'

class SearchForm extends Component {
    render() {

        return (
            <section className="search">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="search-fields">
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" onChange={e => this.props.nameChanged(e.target.value)}/>
                        <label htmlFor="min-players">Min players: </label>
                        <select name="min-players" id="min-players" onChange={e => this.props.minPlayersChanged(e.target.value)}>
                            <option value="">Any</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <label htmlFor="max-players">Max players: </label>
                        <select name="max-players" id="max-players" onChange={e => this.props.maxPlayersChanged(e.target.value)}>
                            <option value="">Any</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <label htmlFor="age">Minimum age: </label>
                        <input type="number" id="age" name="age" onChange={e => this.props.ageChanged(e.target.value)} min={1}/>
                        <label htmlFor="min-playtime">Min playtime: </label>
                        <select name="min-playtime" id="min-playtime" onChange={e => this.props.minPlaytimeChanged(e.target.value)}>
                            <option value="">Any</option>
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                        </select>
                        <label htmlFor="max-playtime">Max playtime: </label>
                        <select name="max-playtime" id="max-playtime" onChange={e => this.props.maxPlaytimeChanged(e.target.value)}>
                            <option value="">Any</option>
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                        </select>
                        {/* <fieldset>
                            <legend>Categories</legend>
                            <input type="checkbox" id="abstract" name="abstract" />
                            <label htmlFor="abstract">Abstract</label>
                            <input type="checkbox" id="adventure" name="adventure" />
                            <label htmlFor="adventure">Adventure</label>
                            <input type="checkbox" id="bluffing" name="bluffing" />
                            <label htmlFor="bluffing">Bluffing</label>
                            <input type="checkbox" id="childrens" name="childrens" />
                            <label htmlFor="childrens">Childrens</label>
                            <input type="checkbox" id="combat" name="combat" />
                            <label htmlFor="combat">Combat</label>
                            <input type="checkbox" id="civilization" name="civilization" />
                            <label htmlFor="civilization">Civilization</label>
                            <input type="checkbox" id="cooperative" name="cooperative" />
                            <label htmlFor="cooperative">Cooperative</label>
                            <input type="checkbox" id="deduction" name="deduction" />
                            <label htmlFor="deduction">deduction</label>
                            <input type="checkbox" id="family" name="family" />
                            <label htmlFor="family">Family</label>
                            <input type="checkbox" id="finance" name="finance" />
                            <label htmlFor="finance">Finance</label>
                            <input type="checkbox" id="historic" name="historic" />
                            <label htmlFor="historic">Historic</label>
                            <input type="checkbox" id="memory" name="memory" />
                            <label htmlFor="memory">Memory</label>
                            <input type="checkbox" id="party" name="party" />
                            <label htmlFor="party">Party</label>
                            <input type="checkbox" id="puzzle" name="puzzle" />
                            <label htmlFor="puzzle">Puzzle</label>
                            <input type="checkbox" id="sciFi" name="sciFi" />
                            <label htmlFor="sciFi">Sci-Fi</label>
                            <input type="checkbox" id="trivia" name="trivia" />
                            <label htmlFor="trivia">Trivia</label>
                            <input type="checkbox" id="words" name="words" />
                            <label htmlFor="words">Words</label>
                        </fieldset> */}
                        <div className="random-text">
                            <input type="checkbox" id="random" onChange={this.props.randomChanged} />
                            <label htmlFor="random">Give me a single random game!</label>
                        </div>
                    </div>
                        <input type="submit" value="Submit" />
                </form>
            </section>
        )
    }
}

export default SearchForm;