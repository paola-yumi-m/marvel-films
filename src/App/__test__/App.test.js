import {prettyDOM, render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import axios from "axios";
import {data_2} from "../../json";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

jest.mock('axios');

const url = `https://mcuapi.herokuapp.com/api/v1/movies`;

describe('<App />', function () {
    async function renderApp() {
        axios.get
            .mockResolvedValueOnce({data: data_2[0]})
            .mockResolvedValueOnce({data: data_2[1]})
            .mockResolvedValueOnce({data: data_2[2]})
            .mockResolvedValueOnce({data: data_2[3]})
            .mockResolvedValueOnce({data: data_2[4]})
            .mockResolvedValueOnce({data: data_2[5]})
            .mockResolvedValueOnce({data: data_2[6]});

        render(<App/>);

        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(1, `${url}/1`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(2, `${url}/2`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(3, `${url}/3`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(4, `${url}/4`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(5, `${url}/5`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(6, `${url}/6`);
        })
        await waitFor(() => {
            expect(axios.get).toHaveBeenNthCalledWith(7, `${url}/7`);
        })
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        })
    }

    it('should render page with data', async function () {
        await renderApp();

        const movies = screen.queryByText('movies');
        const firstFilm = screen.queryByText('Iron Man');
        const secondFilm = screen.queryByText('The Incredible Hulk');
        const previousPage = screen.queryByText('<<');
        const nextPage = screen.queryByText('>>');
        const overview = screen.queryByText('Overview:');
        const pages = screen.queryAllByTestId('pages');

        expect(movies).toBeInTheDocument();
        expect(firstFilm).toBeInTheDocument();
        expect(secondFilm).toBeInTheDocument();
        expect(previousPage).toBeInTheDocument();
        expect(nextPage).toBeInTheDocument();
        expect(overview).not.toBeInTheDocument();
        expect(pages.length).toBe(2);
    });

    it('should open detail card when card is clicked', async function () {
        await renderApp();

        const cards = screen.queryAllByTestId('card');
        const secondFilm = cards[1];
        userEvent.click(secondFilm);
        const overview = screen.queryByText('Overview:');

        expect(overview).toBeInTheDocument();
    });

    it('should close detail card when exit button is clicked', async function () {
        await renderApp();

        const cards = screen.queryAllByTestId('card');
        const secondFilm = cards[1];
        userEvent.click(secondFilm);
        const exitButton = screen.queryByText('X');
        userEvent.click(exitButton);
        const overview = screen.queryByText('Overview:');

        expect(overview).not.toBeInTheDocument();
    });

    it('should order card chronologically', function () {

    });
});