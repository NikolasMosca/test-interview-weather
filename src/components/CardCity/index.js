import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"

import styles from "./style.module.scss"

const CardCity = ({ background, city, date, hour, temperature, image }) => {
    return (
        <Card background={background} className={styles.CardContainer}>
            <div>
                <h3>{city}</h3>
                <time>{date}</time>
                <time>{hour}</time>
            </div>
            {image && <img src={image} alt={`${city} - ${date} - ${temperature}`} />}
            <h4>{temperature}</h4>
        </Card>
    )
}

CardCity.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]),
    /**
     * City displayed on the left
     */
    city: PropTypes.string.isRequired,
    /**
     * Date displayed on the left
     */
    date: PropTypes.string.isRequired,
    /**
     * Hour displayed on the left
     */
    hour: PropTypes.string.isRequired,
    /**
     * Temperature displayed on the right
     */
    temperature: PropTypes.string.isRequired,
    /**
     * Image displayed at the bottom
     */
    image: PropTypes.string,
}
CardCity.defaultProps = {
    background: "bg-primary",
    image: false,
}

export default CardCity
