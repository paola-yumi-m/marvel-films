import App from "../../App";
import ReactDOM from "react-dom";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe('index.js', function () {
    it('should render without crashing', function () {
        const div = document.createElement('div');
        div.id = 'root';
        document.body.appendChild(div);
        require('../../index.js');

        expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
    });
});