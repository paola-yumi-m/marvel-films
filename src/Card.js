import React from "react";

export const Card = ({ data, id }) => {
    const dataId = id - 1;

    const getReleaseDate = () => {
        return data[dataId]['release_date'].slice(0, 4);
    }

    return (
        <div key={id} className='card'>
            <img src={data[dataId]['cover_url']}/>
            <div className='infos'>
                <h2>{data[dataId]['title']}</h2>
                <p>{getReleaseDate()}</p>
            </div>
        </div>
)
}
