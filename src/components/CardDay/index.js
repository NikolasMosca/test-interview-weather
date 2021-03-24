import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"
import { getImageUrl } from "../../features/Weather/weatherSlice"

import styles from "./style.module.scss"

const CardDay = ({ background, day, temperature, image }) => {
    return (
        <Card background={background} className={styles.CardContainer}>
            <h3>{day}</h3>
            <h4>{temperature}°</h4>
            {image && <img src={getImageUrl(image)} alt={`${day} - ${temperature}`} />}
        </Card>
    )
}

CardDay.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]),
    /**
     * Day name displayed at the top
     */
    day: PropTypes.string.isRequired,
    /**
     * Temperature displayed at the middle
     */
    temperature: PropTypes.number.isRequired,
    /**
     * Image displayed at the bottom
     */
    image: PropTypes.string,
}
CardDay.defaultProps = {
    background: "bg-primary",
    image: false,
}

export default CardDay
