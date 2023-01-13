import {render, waitFor} from "@testing-library/react";
import App from "../App";
import axios from "axios";
import {data_2} from "../../json";

jest.mock('axios');

const url = `https://mcuapi.herokuapp.com/api/v1/movies/1`;

describe('<App />', function () {
    it('should render page with data', async function () {
        axios.get.mockResolvedValueOnce({data: data_2[0]});

        render(<App/>);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(url);
        })
    });
});