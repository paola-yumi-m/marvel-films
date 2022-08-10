import React from "react";

export const Pagination = ({ data, nextPage }) => {
    function getPages() {
        let numPages = Math.round(data.length / 6);
        let pageList = [];
        for (let page = 0; page < numPages; page++) {
            pageList.push(<li><p>{page+1}</p></li>)
        }
        return pageList;
    }

    function handleClick() {
        nextPage();
    }

    return (
        <div className='pagination'>
            <div className='arrow-circle'>
                <h1>{'<<'}</h1>
            </div>
            <div className='pages'>
                <ul>{getPages()}</ul>
            </div>
            <div className='arrow-circle' onClick={handleClick}>
                <h1>>></h1>
            </div>
        </div>
    );
}