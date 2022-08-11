import React from "react";

export const Pagination = ({ data, setFirstId, id, numPages, directToPage }) => {
    function handlePageClick(e) {
        const id = (parseInt(e.currentTarget.id) + 1) * 6 - 5;
        directToPage(id);
    }

    function getPages() {
        let pageList = [];
        for (let page = 0; page < numPages; page++) {
            pageList.push(<li id={page} onClick={handlePageClick}><p>{page+1}</p></li>)
        }
        return pageList;
    }

    function handleNextPageClick() {
        if (id + 6 < data.length) {
            setFirstId((prevState) => prevState + 6);
        }
    }

    function handlePreviousPageClick() {
        if (id - 6 > 0) {
            setFirstId((prevState) => prevState - 6);
        }
    }

    return (
        <div className='pagination'>
            <div className='arrow-circle' onClick={handlePreviousPageClick}>
                <h1>{'<<'}</h1>
            </div>
            <div className='pages'>
                <ul>{getPages()}</ul>
            </div>
            <div className='arrow-circle' onClick={handleNextPageClick}>
                <h1>>></h1>
            </div>
        </div>
    );
}