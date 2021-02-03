import React, {Component} from 'react';
import './AddReview.css'

class AddReview extends Component {

    render() {
        return (
            <div>
                <h3>Review {this.props.gameName}</h3>
                <form>
                    <fieldset>
                        <legend htmlFor="score">Score out of 5: </legend>
                        <input 
                            type="radio" 
                            id="1" 
                            name="score" 
                            value={1}
                        />
                        <label htmlFor="1">1</label>
                        <input 
                            type="radio" 
                            id="2" 
                            name="score" 
                            value={2}
                        />
                        <label htmlFor="2">2</label>
                        <input 
                            type="radio" 
                            id="3" 
                            name="score" 
                            value={3}
                        />
                        <label htmlFor="3">3</label>
                        <input 
                            type="radio" 
                            id="4" 
                            name="score" 
                            value={4}
                        />
                        <label htmlFor="4">4</label>
                        <input 
                            type="radio" 
                            id="5" 
                            name="score" 
                            value={5}
                        />
                        <label htmlFor="5">5</label>
                    </fieldset>
                    <br />
                    <label htmlFor="text">Review text: </label>
                    <textarea name="text" id="text" required />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddReview;