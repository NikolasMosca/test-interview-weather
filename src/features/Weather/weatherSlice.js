import axios from "axios"
import moment from "moment"
import { createSlice } from "@reduxjs/toolkit"
const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

export const weatherSlice = createSlice({
    name: "counter",
    initialState: {
        currentCity: {}, //Current city displayed
        previousCity: {}, //Last city searched
        cities: [], //List of saved cities
        error: "",
    },
    reducers: {
        //Set current city to display
        setCurrentCity: (state, action) => {
            state.previousCity = Object.keys(state.currentCity).length > 0 ? state.currentCity : action.payload
            state.currentCity = action.payload
        },
        //Add the city into the list on the top right
        addCity: (state) => {
            const findCity = state.cities.find((city) => city.id === state.currentCity.id)
            if (!findCity) {
                state.cities.push(state.currentCity)
            }
        },
        //Set into current city the city that the user clicks
        selectCity: (state, action) => {
            const findCity = state.cities.find((city) => city.id === action.payload)
            if (findCity) {
                state.currentCity = findCity
            }
        },
        //If error occurs and user clicks back then return to previous city
        selectPreviousCity: (state) => {
            state.currentCity = state.previousCity
            state.error = ""
        },
        //Set the error in the state
        setError: (state, action) => {
            state.error = action.payload
        },
    },
})

export const { setCurrentCity, addCity, selectCity, selectPreviousCity, setError } = weatherSlice.actions

//Get the correct name in base of speed (m/s) [From Beaufort Wind Scale]
const getTypeOfWind = (speed) => {
    const beaufortScale = [
        { minSpeed: 0, maxSpeed: 0, value: "Calm" },
        { minSpeed: 0.3, maxSpeed: 1.5, value: "Light air" },
        { minSpeed: 1.6, maxSpeed: 3.4, value: "Light breeze" },
        { minSpeed: 3.4, maxSpeed: 5.4, value: "Gentle breeze" },
        { minSpeed: 5.5, maxSpeed: 7.9, value: "Moderate breeze" },
        { minSpeed: 8.0, maxSpeed: 10.7, value: "Fresh breeze" },
        { minSpeed: 10.8, maxSpeed: 13.8, value: "Strong breeze" },
        { minSpeed: 13.9, maxSpeed: 17.1, value: "Near gale" },
        { minSpeed: 17.2, maxSpeed: 20.7, value: "Gale" },
        { minSpeed: 20.8, maxSpeed: 24.4, value: "Strong gale" },
        { minSpeed: 24.5, maxSpeed: 28.4, value: "Storm" },
        { minSpeed: 28.5, maxSpeed: 32.6, value: "Violent Storm" },
        { minSpeed: 32.7, maxSpeed: 100, value: "Hurricane" },
    ]
    const windType = beaufortScale.find((wind) => speed >= wind.minSpeed && speed <= wind.maxSpeed)
    return windType?.value || ""
}

/**
 * Get all data from the city
 * @param {string} cityName 
 * @param {{lat: float, lon: float}} position 
 */
export const getCityData = (cityName, position) => async (dispatch) => {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

    //Remove active city and trigger loading
    dispatch(setCurrentCity({}))

    try {
        //Get basic data from city, includes lat and lon and the id
        const { data } = getBasicData(cityName, position)

        const detailParams = {
            lat: position && Object.keys(position).length > 0 ? position.lat : data.coord.lat,
            lon: position && Object.keys(position).length > 0 ? position.lon : data.coord.lon,
            
            units: "metric",
            appid: apiKey,
        }
        //Get details about forecast data
        const details = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
            params: {...detailParams, exclude: "minutely"},
        })
        //Get details about previous data of the current day
        const history = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine`, {
            params: {...detailParams, dt: moment().subtract(1, "seconds").unix(), exclude: "current,minutely,daily,alerts"},
        })

        const {
            id,
            name,
            coord: { lat, lon },
            main,
            weather,
            wind,
        } = data

        dispatch(
            setCurrentCity({
                id,
                lat,
                lon,
                name,
                date: moment().format("dddd DD, MMMM"),
                hoursMinutes: moment().format("h:mm a"),
                current: {
                    temperature: Math.round(main.temp),
                    description: weather && weather.length > 0 ? weather[0].description : null,
                    weather: weather && weather.length > 0 ? weather[0].icon : null,
                },
                //Get data for temperatures view
                temperatures: history.data.hourly
                    .filter((item) => moment.unix(item.dt).valueOf() <= moment().valueOf())
                    .map((item) => ({
                        ...item,
                        temp: Math.round(item.temp),
                        hour: moment.unix(item.dt).format("h a"),
                        hourMinutes: moment.unix(item.dt).format("h:mm a"),
                    }))
                    .sort((a, b) => {
                        if (a.dt > b.dt) return -1
                        if (a.dt < b.dt) return 1
                        return 0
                    }),
                //Get data for month view
                month: {
                    date: moment().format("ddd, DD MMM"),
                    image: weather && weather.length > 0 ? weather[0].icon : null,
                    typeWind: getTypeOfWind(wind.speed),
                    data: { ...details.data.current, ...main },
                },
                //Get data for daily view
                daily: details.data.daily.map((item) => ({
                    ...item,
                    day: moment.unix(item.dt).format("dddd"),
                    date: moment.unix(item.dt).format("DD/MM/YYYY HH:mm:ss"),
                    image: item.weather && item.weather.length > 0 ? item.weather[0].icon : null,
                    temp: item.temp.day,
                })),
            })
        )
    } catch (e) {
        dispatch(setError("Sorry the city was not found"))
    }
}

export const getBasicData = async (cityName, position) => {
    //Get basic data from city, includes lat and lon and the id
    if (!cityName && !position) return 
    const params = {
        appid: apiKey,
        units: "metric"
    }
    if (position && Object.keys(position).length > 0) {
        if (Object.keys(position).toString() !== 'lat,lon') return false
        params.lat = position.lat
        params.lon = position.lon
    } else {
        if (typeof cityName !== "string") return false
        params.q = cityName
    }

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params })

    return data
}

export const selectCurrentCity = (state) => state.weather.currentCity
export const selectCitiesList = (state) => state.weather.cities
export const selectError = (state) => state.weather.error

export const getImageUrl = (image) => `https://openweathermap.org/img/wn/${image}@2x.png`

export default weatherSlice.reducer
