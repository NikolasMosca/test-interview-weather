import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    getCityData,
    addCity,
    selectCity,
    selectCurrentCity,
    selectPreviousCity,
    selectCitiesList,
    selectError,
} from "./weatherSlice"

import CardMain from "../../components/CardMain"
import CardCity from "../../components/CardCity"
import CardTemperature from "../../components/CardTemperature"
import Tabs from "../../components/Tabs"

import AddImage from "../../assets/add.png"
import SearchImage from "../../assets/search.png"
import LocalizationImage from "../../assets/localization.png"

import styles from "./style.module.scss"

export default () => {
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()
    const currentCity = useSelector(selectCurrentCity)
    const cities = useSelector(selectCitiesList)
    const error = useSelector(selectError)
    const isLoading = Object.keys(currentCity).length === 0

    const onAddCity = () => dispatch(addCity())
    const onClickCity = (id) => dispatch(selectCity(id))
    const onSearchCity = () => search.length > 0 && dispatch(getCityData(search)) && setSearch("")
    const onClickBack = () => dispatch(selectPreviousCity())

    useEffect(() => {
        dispatch(getCityData("London"))
    }, [])

    if (error?.length > 0) {
        return (
            <div className={styles.Loader}>
                {error}
                <button onClick={onClickBack}>Return to previous city</button>
            </div>
        )
    }

    if (isLoading) {
        return <div className={styles.Loader}>Loading...</div>
    }

    const {
        name,
        date,
        current: { temperature, weather, description },
        temperatures,
        month,
        daily,
    } = currentCity

    console.log(currentCity)

    return (
        <div className={styles.WeatherContainer}>
            <div className={styles.MainContainer}>
                <CardMain
                    name={name}
                    date={date}
                    temperature={temperature}
                    weatherImage={weather}
                    weatherDescription={description}
                />
            </div>

            <div className={styles.CityContainer}>
                <button className={styles.AddCity} onClick={onAddCity}>
                    <img src={AddImage} />
                    Add city
                </button>
                {cities.map((city, index) => (
                    <div key={index} className={styles.CardCity} onClick={() => onClickCity(city.id)}>
                        <CardCity
                            background={city.current.description.includes("cloud") ? "bg-tertiary" : "bg-primary"}
                            city={city.name}
                            date={city.date}
                            hour={city.hoursMinutes}
                            image={city.current.weather}
                            temperature={city.current.temperature}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.TempContainer}>
                <h3>Today</h3>
                <CardTemperature
                    temperatures={temperatures.map((item) => ({
                        temperature: item.temp,
                        hour: item.hour,
                    }))}
                />
            </div>

            <div className={styles.TabsContainer}>
                <Tabs week={daily} month={month} />
            </div>

            <div className={styles.SearchContainer}>
                <div className={styles.SearchInput}>
                    <h3>Search</h3>
                    <div className={styles.Input}>
                        <input
                            value={search}
                            onKeyUp={({ code }) => code === "Enter" && onSearchCity()}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="ex: Miami"
                        />
                        <button onClick={onSearchCity}>
                            <img src={SearchImage} />
                        </button>
                    </div>
                </div>

                <div className={styles.LocalizationContainer}>
                    <h3>Localization</h3>
                    <button>
                        <img src={LocalizationImage} />
                        Add localization
                    </button>
                </div>
            </div>
        </div>
    )
}
