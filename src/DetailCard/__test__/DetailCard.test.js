import {prettyDOM, render, screen} from "@testing-library/react";
import {DetailCard} from "../DetailCard";
import {data_2} from "../../json";
import '@testing-library/jest-dom';

describe('<DetailCard />', function () {

    jest.mock('../../utils/getReleaseDate');
    const { getReleaseDate } = require('../../utils/getReleaseDate');
    getReleaseDate.mockImplementation(() => 2008);

    it('should render card with correct info', function () {
        render(
            <DetailCard
            cardId={1}
            getReleaseDate={jest.fn()}
            data={data_2}
            setShowCard={true}
            />)
        });

        const year = screen.getByText('IRON MAN');
        expect(year).toBeInTheDocument();

});