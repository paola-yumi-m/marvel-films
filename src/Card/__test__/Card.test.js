import {render, screen} from "@testing-library/react";
import {Card} from "../Card";
import {data_2} from "../../json";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

describe('<Card />', function () {

    const getReleaseDateMock = jest.fn();
    const currentCardMock = jest.fn();

    function renderCard() {
        render(
            <Card
                data={data_2}
                id={1}
                getReleaseDate={getReleaseDateMock.mockImplementationOnce(() => 2008)}
                currentCard={currentCardMock}
            />
        );
    }

    it('should render card with right info', function () {
        renderCard();

        const img = screen.getByRole('img');
        const title = screen.getByText('Iron Man');
        const releaseDate = screen.getByText('2008');

        expect(img).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(releaseDate).toBeInTheDocument();
    });

    it('should call currentCard when card is clicked', function () {
        renderCard();

        const card = screen.getByTestId('card');
        userEvent.click(card);

        expect(currentCardMock).toHaveBeenCalledWith("1");
    });
});