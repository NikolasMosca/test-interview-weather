import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"
import { getImageUrl } from "../../features/weather/weatherSlice"

import styles from "./style.module.scss"

const CardMain = ({ background, name, date, temperature, weatherImage, weatherDescription }) => {
    return (
        <Card background={background} className={styles.MainCard}>
            <h1>{name}</h1>
            <time>{date}</time>

            <Card className={styles.CurrentTemperature}>
                <h2>{temperature}°</h2>
                <img src={getImageUrl(weatherImage)} alt={weatherDescription} />
            </Card>
        </Card>
    )
}

CardMain.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]),
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
    background: "bg-primary",
    weatherDescription: "",
}

export default CardMain
