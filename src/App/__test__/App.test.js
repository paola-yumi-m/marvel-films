import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import axios from "axios";
import {data_2} from "../../json";
import '@testing-library/jest-dom';

jest.mock('axios');

const url = `https://mcuapi.herokuapp.com/api/v1/movies`;

    describe('<App />', function () {
    it('should render page with data', async function () {
        axios.get.mockResolvedValueOnce({ data: data_2[0] }).mockResolvedValueOnce({ data: data_2[1] });

        render(<App/>);

        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(1, `${url}/1`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(2, `${url}/2`);
        })
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        })
        const movies = screen.queryByText('movies');

        expect(movies).toBeInTheDocument();
    });
    });