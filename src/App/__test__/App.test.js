import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import axios from "axios";
import {data_2} from "../../json";
import '@testing-library/jest-dom';

jest.mock('axios');

const url = `https://mcuapi.herokuapp.com/api/v1/movies/1`;
const film = data_2[0];

    describe('<App />', function () {
    it('should render page with data', async function () {
        axios.get.mockResolvedValueOnce({ data: film });

        render(<App/>);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(url);
        })
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        })
        const movies = screen.queryByText('movies');

        expect(movies).toBeInTheDocument();
    });
});