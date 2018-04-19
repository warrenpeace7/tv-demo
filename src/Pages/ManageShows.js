import React, { Component } from 'react'
import Show from '../Show'

export default class ManageShows extends Component {
    state = {
        show: {
            name: "",
            rating: -1,
            image: "",
        },
        shows: [
            {
                name: 'Game of Thrones',
                rating: 5,
                image: 'http://bronlea.com/wp-content/uploads/2017/10/2742670-game-768x384.jpg'
            }
        ]


    }



    handleOnChange = (event) => {
        if (event.target.id === "nameInput") {
            this.setState({
                newShowName: event.target.value
            })
        }

        else if (event.target.id === "ratingInput") {
            this.setState({
                newShowRating: Number(event.target.value)
            })
        }

        else if (event.target.id === "previewImage") {
            this.setState({
                newShowImage: event.target.value
            })

        }
    }

    handleOnClick = (prev) => {
        this.setState((previousState) => {
            const existingShows = previousState.shows
            existingShows.push({
                name: previousState.newShowName,
                rating: previousState.newShowRating,
                image: previousState.newShowImage,
            })
            return {
                shows: existingShows
            }
        })
    }

    renderShows = () => {
        // const showComponents = []

        // for (const show of this.state.shows) {
        // showComponents.push(
        // <Show key={0} name={show.name} rating={show.rating} previewImage={show.image} />
        // )
        // }
    //     for (let i = 0; i < this.state.shows.length; i++) {
    //         const show = this.state.shows[i];

    //         showComponents.push(
    //             <Show key={i} name={show.name} rating={show.rating} previewImage={show.image} />
    //         )

    //     }

    //     return showComponents


        return this.state.shows.map((show, i) => {
            return(
               <Show key={i} name={show.name} rating={show.rating} previewImage={show.image} />


            )
        })
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <section className="viewAllShows">
                    <header><h1>All Shows</h1></header>
                    <div>
                        {this.renderShows()}
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
