import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"
import { getImageUrl } from "../../features/Weather/weatherSlice"

import styles from "./style.module.scss"

const CardMain = ({ name, date, temperature, weatherImage, weatherDescription }) => {
    return (
        <Card className={styles.MainCard}>
            <h1>{name}</h1>
            <time>{date}</time>
            <h2>{weatherDescription}</h2>

            <Card className={styles.CurrentTemperature}>
                <h2>{temperature}°</h2>
                <img src={getImageUrl(weatherImage)} alt={weatherDescription} />
            </Card>
        </Card>
    )
}

CardMain.propTypes = {
    /**
     * City name
     */
    name: PropTypes.string.isRequired,
    /**
     * Current date
     */
    date: PropTypes.string.isRequired,
    /**
     * Temperature
     */
    temperature: PropTypes.number.isRequired,
    /**
     * weather image to display in badge
     */
    weatherImage: PropTypes.string.isRequired,
    /**
     * description of image
     */
    weatherDescription: PropTypes.string,
}
CardMain.defaultProps = {
    weatherDescription: "",
}

export default CardMain
