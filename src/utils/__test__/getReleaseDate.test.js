import {getReleaseDate} from "../getReleaseDate";
import {data_2} from "../../json";

describe('getReleaseDate()', function () {
    it('should extract the year from date', function () {
        const result = getReleaseDate(data_2, 0);

        expect(result).toBe("2008");
    });
});