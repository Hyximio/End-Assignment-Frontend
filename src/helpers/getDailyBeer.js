import {XORShift} from "random-seedable";

function getDailyBeer( _data ) {
    const date = new Date();
    const seed = parseInt(date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString());
    const random = new XORShift(seed);
    const dailyInt = random.randRange(0, _data.length);
    return _data[dailyInt];

}

export default getDailyBeer;