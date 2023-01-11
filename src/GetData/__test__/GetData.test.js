import {prettyDOM, render, screen, within} from "@testing-library/react";
import {GetData} from "../GetData";
import {data_2} from "../../json";
import '@testing-library/jest-dom';

describe('<GetData />', function () {

    function renderGetData(firstId, getReleaseDateMock) {
        render(
            <GetData
                data={data_2}
                id={firstId}
                getReleaseDate={getReleaseDateMock}
                currentCard={jest.fn()}
            />
        );
    }

    it('should render only 6 cards per page', function () {
        const getReleaseDateMock = jest.fn();
        getReleaseDateMock
            .mockReturnValueOnce(2010)
            .mockReturnValueOnce(2011)
            .mockReturnValueOnce(2011)
            .mockReturnValueOnce(2012)
            .mockReturnValueOnce(2013)
            .mockReturnValueOnce(2013);

        renderGetData(3, getReleaseDateMock);

        const cards = screen.getAllByTestId('card');
        const firstCardTitle = within(cards[0]).getByText('Iron Man 2');
        const firstCardReleaseDate = within(cards[0]).getByText(2010);
        const lastCardTitle = within(cards[cards.length-1]).getByText('Thor: The Dark World');
        const lastCardReleaseDate = within(cards[cards.length-1]).getByText(2013);

        expect(cards.length).toBe(6);
        expect(firstCardTitle).toBeInTheDocument();
        expect(firstCardReleaseDate).toBeInTheDocument();
        expect(lastCardTitle).toBeInTheDocument();
        expect(lastCardReleaseDate).toBeInTheDocument();
    });

    it('should render only the maximum number possible of cards', function () {
        const getReleaseDateMock = jest.fn();
        getReleaseDateMock
            .mockReturnValueOnce(2013)
            .mockReturnValueOnce(2014)

        renderGetData(8, getReleaseDateMock);

        const cards = screen.getAllByTestId('card');
        const firstCardTitle = within(cards[0]).getByText('Thor: The Dark World');
        const firstCardReleaseDate = within(cards[0]).getByText(2013);
        const lastCardTitle = within(cards[cards.length-1]).getByText('Captain America: The Winter Soldier');
        const lastCardReleaseDate = within(cards[cards.length-1]).getByText(2014);

        expect(cards.length).toBe(2);
        expect(firstCardTitle).toBeInTheDocument();
        expect(firstCardReleaseDate).toBeInTheDocument();
        expect(lastCardTitle).toBeInTheDocument();
        expect(lastCardReleaseDate).toBeInTheDocument();
    });
});