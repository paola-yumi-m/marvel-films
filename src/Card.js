import React from "react";

export const Card = ({ data, id, getReleaseDate, currentCard }) => {
    const dataId = id - 1;

    function handleClick(e) {
        const id = e.currentTarget.id;
        currentCard(id);
    }

    return (
        <div id={id} className='card' onClick={handleClick}>
            <img src={data[dataId]['cover_url']}/>
            <div className='infos'>
                <h2>{data[dataId]['title']}</h2>
                <p>{getReleaseDate(dataId)}</p>
            </div>
        </div>
)
}
