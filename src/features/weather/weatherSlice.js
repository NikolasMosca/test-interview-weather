import axios from "axios"
import moment from "moment"
import { createSlice } from "@reduxjs/toolkit"

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
            state.previousCity = state.currentCity || action.payload
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

//Get the correct name in base of speed (m/s)
const getTypeOfWind = (speed) => {
    if (speed < 3.5) return `Light wind`
    if (speed < 8) return `Moderate wind`
    if (speed < 24) return `Strong wind`
    if (speed < 30) return `Storm`
    return `Hurricane`
}

//Get all data from the city
export const getCityData = (cityName) => async (dispatch) => {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

    //Remove active city and trigger loading
    dispatch(setCurrentCity({}))

    try {
        //Get basic data from city, includes lat and lon and the id
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: cityName,
                appid: apiKey,
                units: "metric",
            },
        })
        //Get details about forecast data
        const details = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
            params: {
                lat: data.coord.lat,
                lon: data.coord.lon,
                exclude: "minutely",
                units: "metric",
                appid: apiKey,
            },
        })
        //Get details about previous data of the current day
        const history = await axios.get(`http://api.openweathermap.org/data/2.5/onecall/timemachine`, {
            params: {
                lat: data.coord.lat,
                lon: data.coord.lon,
                dt: moment(moment().format("YYYY-MM-DD")).unix(),
                exclude: "minutely",
                units: "metric",
                appid: apiKey,
            },
        })
        console.log("data for london", data, details.data, history.data)

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
                    .map((item) => ({
                        ...item,
                        temp: Math.round(item.temp),
                        hour: moment.unix(item.dt).format("h a"),
                        hourMinutes: moment.unix(item.dt).format("h:mm a"),
                    }))
                    //.filter((item) => moment.unix(item.dt).format() <= moment().format())
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
                    data: details.data.current,
                },
                //Get data for daily view
                daily: details.data.daily.map((item) => ({
                    ...item,
                    day: moment.unix(item.dt).format("dddd"),
                    date: moment.unix(item.dt).format("DD/MM/YYYY HH:mm:ss"),
                })),
            })
        )
    } catch (e) {
        dispatch(setError("Sorry the city was not found"))
    }
}

export const selectCurrentCity = (state) => state.weather.currentCity
export const selectCitiesList = (state) => state.weather.cities
export const selectError = (state) => state.weather.error

export const getImageUrl = (image) => `http://openweathermap.org/img/wn/${image}@2x.png`

export default weatherSlice.reducer
