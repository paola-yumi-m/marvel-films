import React from "react";
import { Card } from "./Card/Card";

export const GetData = ({ data, id, getReleaseDate, currentCard }) => {
    function isIdValid(increment) {
        if (id + increment <= data.length) {
            return true;
        }
        return false;
    }

    function createSubsequentCards() {
        let cards = [];
        for (let increment = 0; increment < 6; increment++) {
            isIdValid(increment) ? cards.push(<Card data={data} id={id+increment} getReleaseDate={getReleaseDate} currentCard={currentCard} />) : cards.push(<div></div>);
        }
        return cards;
    }

    return (
        <div className='body'>
            <div className='card-container'>
                {createSubsequentCards()}
            </div>
        </div>
    );
}