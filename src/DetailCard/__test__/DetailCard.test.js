import {prettyDOM, render, screen} from "@testing-library/react";
import {DetailCard} from "../DetailCard";
import {data_2} from "../../json";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

describe('<DetailCard />', function () {

    const getReleaseDateMock = jest.fn();
    const setShowCardMock = jest.fn();

    function renderDetailCard() {
        render(
            <DetailCard
                cardId={1}
                getReleaseDate={getReleaseDateMock.mockImplementation(() => 2008)}
                data={data_2}
                setShowCard={setShowCardMock}
            />);
    }

    it('should render card with correct info', function () {
        renderDetailCard();

        const year = screen.getByText('2008');
        const duration = screen.getByText('126 min');
        const saga = screen.getByText('Infinity Saga');
        const boxOffice = screen.getByText('$585,171,547');
        const relatedMovies = screen.getAllByRole('listitem');
        const overview = screen.getByText('Overview:');
        const overviewText = screen.getByTestId('overview');
        const trailer = screen.getByRole('link');
        const exitButton = screen.getByText('X');

        expect(year).toBeInTheDocument();
        expect(duration).toBeInTheDocument();
        expect(saga).toBeInTheDocument();
        expect(boxOffice).toBeInTheDocument();
        expect(relatedMovies.length).toBe(8);
        expect(overview).toBeInTheDocument();
        expect(overviewText).toBeInTheDocument();
        expect(trailer.innerHTML).toBe('Watch trailer');
        expect(exitButton).toBeInTheDocument();
        });

    it('should call setShowCard when exit button is clicked', function () {
        renderDetailCard();

        const exitButton = screen.getByText('X');
        userEvent.click(exitButton);

        expect(setShowCardMock).toHaveBeenCalledWith(false);
    });
});