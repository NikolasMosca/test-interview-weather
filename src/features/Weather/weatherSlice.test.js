import axios from 'axios';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';
import {getBasicData} from './weatherSlice'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.mock('axios');

test('call weather api with City Name', async () => {
    axios.get.mockResolvedValue({});
    return getBasicData("London").then(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              params: {
                q: "London",
                appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
                units: "metric"
            }
            }
          );
      })
});

test('call weather api with Coordinates', async () => {
    axios.get.mockResolvedValue({});
    return getBasicData(null, {lat: 45.58754, lon: 45.12345425}).then(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              params: {
                lat: 45.58754,
                lon: 45.12345425,
                appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
                units: "metric"
            }
            }
          );
      })
});

test('fail because of missing params', async () => {
    axios.get.mockResolvedValue({});
    return getBasicData().then(() => {
        expect(axios.get).toHaveBeenCalledTimes(0);
      })
});

test('fail because of wrong city name', async () => {
    axios.get.mockResolvedValue({});
    return getBasicData({john: "test", doe: "test"}).then(() => {
        expect(axios.get).toHaveBeenCalledTimes(0);
      })
});

test('fail because of wrong coordinates params', async () => {
    axios.get.mockResolvedValue({});
    return getBasicData(null, {john: "test", doe: "test"}).then(() => {
        expect(axios.get).toHaveBeenCalledTimes(0);
      })
});
