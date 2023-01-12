import {prettyDOM, render, screen, within} from "@testing-library/react";
import {Pagination} from "../Pagination";
import {data_2} from "../../json";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

describe('<Pagination />', function () {
    function getNumPages() {
        return Math.round(data_2.length / 6);
    }

    function renderPagination(nextPageMock, previousPageMock, id, directToPage) {
        render(
            <Pagination
                data={data_2}
                nextPage={nextPageMock}
                previousPage={previousPageMock}
                id={id}
                numPages={getNumPages()}
                directToPage={directToPage}
            />
        );
    }

    it('should render pages', function () {
        renderPagination(jest.fn(), jest.fn(), 1, jest.fn());

        const previousPage = screen.getByText('<<');
        const nextPage = screen.getByText('>>');
        const pages = screen.getAllByRole('listitem');

        expect(previousPage).toBeInTheDocument();
        expect(nextPage).toBeInTheDocument();
        expect(pages.length).toBe(2);
        expect(pages[0].innerHTML).toBe("1");
        expect(pages[1].innerHTML).toBe("2");
    });

    it('should go to previous page when button is clicked', function () {
        const previousPageMock = jest.fn();

        renderPagination(jest.fn(), previousPageMock, 7, jest.fn());

        const previousPage = screen.getByText('<<');
        userEvent.click(previousPage);

        expect(previousPageMock).toHaveBeenCalled();
    });

    it('should go to next page when button is clicked', function () {
        const nextPageMock = jest.fn();

        renderPagination(nextPageMock, jest.fn(),1, jest.fn());

        const nextPage = screen.getByText('>>');
        userEvent.click(nextPage);

        expect(nextPageMock).toHaveBeenCalled();
    });

    it('should go to specific page when page number is clicked', function () {
        const directToPageMock = jest.fn();

        renderPagination(jest.fn(), jest.fn(), 1, directToPageMock);

        const pages = screen.getAllByRole('listitem');
        const pageOne = pages[0];
        userEvent.click(pageOne);

        expect(directToPageMock).toHaveBeenCalledWith(1);

        const pageTwo = pages[1];
        userEvent.click(pageTwo);

        expect(directToPageMock).toHaveBeenCalledWith(7);
    });

    it('should not change to previous page when already on the first page', function () {
        const setFirstIdMock = jest.fn();

        renderPagination(setFirstIdMock, jest.fn(), 1, jest.fn());

        const previousPage = screen.getByText('<<');
        userEvent.click(previousPage);

        expect(setFirstIdMock).not.toHaveBeenCalled();
    });

    it('should not change to next page when already on the last page', function () {
        const setFirstIdMock = jest.fn();

        renderPagination(setFirstIdMock, jest.fn(), 7, jest.fn());

        const nextPage = screen.getByText('>>');
        userEvent.click(nextPage);

        expect(setFirstIdMock).not.toHaveBeenCalled();
    });
});