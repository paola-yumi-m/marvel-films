import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import App from '../App';
import axios from 'axios';
import { data_2 } from '../../json';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const url = `https://mcuapi.herokuapp.com/api/v1/movies`;

describe('<App />', function () {
  async function renderApp() {
    axios.get
      .mockResolvedValueOnce({ data: data_2[0] })
      .mockResolvedValueOnce({ data: data_2[1] })
      .mockResolvedValueOnce({ data: data_2[2] })
      .mockResolvedValueOnce({ data: data_2[3] })
      .mockResolvedValueOnce({ data: data_2[4] })
      .mockResolvedValueOnce({ data: data_2[5] })
      .mockResolvedValueOnce({ data: data_2[6] });

    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(1, `${url}/1`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(2, `${url}/2`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(3, `${url}/3`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(4, `${url}/4`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(5, `${url}/5`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(6, `${url}/6`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(7, `${url}/7`);
    });
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
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

  it('should order cards chronologically', async function () {
    await renderApp();

    const orderChronologicallyButton = screen.queryByRole('checkbox');
    fireEvent.click(orderChronologicallyButton);
    const cards = screen.queryAllByTestId('card');
    const firstFilm = cards[0];
    const firstFilmTitle = within(firstFilm).queryByText(
      'Captain America: The First Avenger'
    );

    expect(firstFilmTitle).toBeInTheDocument();
  });

  it('should order cards per release date', async function () {
    await renderApp();

    const orderChronologicallyButton = screen.queryByRole('checkbox');
    fireEvent.click(orderChronologicallyButton);
    fireEvent.click(orderChronologicallyButton);
    const cards = screen.queryAllByTestId('card');
    const firstFilm = cards[0];
    const firstFilmTitle = within(firstFilm).queryByText('Iron Man');

    expect(firstFilmTitle).toBeInTheDocument();
  });

  it('should go next page when button >> is clicked', async function () {
    await renderApp();

    const nextPageButton = screen.queryByText('>>');
    fireEvent.click(nextPageButton);
    const cards = screen.queryAllByTestId('card');
    const firstFilmSecondPage = cards[0];
    const firstFilmSecondPageTitle =
      within(firstFilmSecondPage).queryByText('Iron Man 3');

    expect(firstFilmSecondPageTitle).toBeInTheDocument();
  });

  it('should go previous page when button << is clicked', async function () {
    await renderApp();

    const nextPageButton = screen.queryByText('>>');
    const previousPageButton = screen.queryByText('<<');
    fireEvent.click(nextPageButton);
    fireEvent.click(previousPageButton);
    const cards = screen.queryAllByTestId('card');
    const firstFilmFirstPage = cards[0];
    const firstFilmFirstPageTitle =
      within(firstFilmFirstPage).queryByText('Iron Man');

    expect(firstFilmFirstPageTitle).toBeInTheDocument();
  });

  it('should go to specific page when page button is clicked', async function () {
    await renderApp();

    const page2Button = screen.queryByText('2');
    fireEvent.click(page2Button);
    const cards = screen.queryAllByTestId('card');
    const firstFilmSecondPage = cards[0];
    const firstFilmSecondPageTitle =
      within(firstFilmSecondPage).queryByText('Iron Man 3');

    expect(firstFilmSecondPageTitle).toBeInTheDocument();
  });

  it('should show empy film list when there is an error with the request', async function () {
    axios.get
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'))
      .mockRejectedValueOnce(new Error('Not found'));

    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(1, `${url}/1`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(2, `${url}/2`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(3, `${url}/3`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(4, `${url}/4`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(5, `${url}/5`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(6, `${url}/6`);
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenNthCalledWith(7, `${url}/7`);
    });
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
    const errorMessage = screen.queryByText("Couldn't get movies :(");

    expect(errorMessage).toBeInTheDocument();
  });
});
