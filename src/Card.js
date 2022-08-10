import React from "react";

export const Card = ({ data, id }) => {
    const getReleaseDate = () => {
        return data[id]['release_date'].slice(0, 4);
    }

    return (
        <div className='card'>
            <img src={data[id]['cover_url']}/>
            <div className='infos'>
                <h2>{data[id]['title']}</h2>
                <p>{getReleaseDate()}</p>
            </div>
        </div>
)
}
