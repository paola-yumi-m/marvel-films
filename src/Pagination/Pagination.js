import React from "react";

export const Pagination = ({ data, nextPage, previousPage, id, numPages, directToPage }) => {
    function handlePageClick(e) {
        const id = (parseInt(e.currentTarget.id) + 1) * 6 - 5;
        directToPage(id);
    }

    function getPages() {
        let pageList = [];
        for (let page = 0; page < numPages; page++) {
            pageList.push(<li key={page} id={page} onClick={handlePageClick}>{page+1}</li>)
        }
        return pageList;
    }

    function handleNextPageClick() {
        if (id + 6 < data.length) {
            nextPage(id);
        } else {}
    }

    function handlePreviousPageClick() {
        if (id - 6 > 0) {
            previousPage(id);
        } else {}
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
                <h1>{'>>'}</h1>
            </div>
        </div>
    );
}