import React, { Component } from 'react'
import Show from '../Show'

export default class ManageShows extends Component {
    state = {
        show: {
            name: "",
            rating: -1,
            image: "",
        }


    }



    handleOnChange = (event) => {
        if (event.target.id === "nameInput") {
            this.setState({
                newShowName: event.target.value
            })
        }

        else if (event.target.id === "ratingInput") {
            this.setState({
                newShowRating: event.target.value
            })
        }

        else if (event.target.id === "previewImage") {
            this.setState({
                newShowImage: event.target.value
            })

        }
    }

    handleOnClick = () => {
        this.setState((previousState) => {
            return {
                show: {
                    name: previousState.newShowName,
                    rating: previousState.newShowRating,
                    image: previousState.newShowImage,
                }
            }
        })
    }



    render() {
        console.log(this.state)
        return (
            <div>
                <section className="viewAllShows">
                    <header><h1>All Shows</h1></header>
                    <div>
                        <Show name={this.state.show.name} rating={this.state.show.rating} previewImage={this.state.show.image} />
                        {/* <Show name="Show Name"/> */}

                    </div>
                </section>
                <section className="createShow">
                    <header><h1>New Show</h1></header>
                    <div>
                        <div><label>Name:</label><input id='nameInput' onChange={this.handleOnChange} /></div>
                        <div><label>Rating:</label><input id='ratingInput' onChange={this.handleOnChange} /></div>
                        <div><label>Preview Image:</label><input id='previewImage' onChange={this.handleOnChange} /></div>
                        <button onClick={this.handleOnClick}>Create</button>
                    </div>
                </section>
            </div>

        )
    }
}
