import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"

import styles from "./style.module.scss"

const CardMonth = ({ background, date, temperature, description, image }) => {
    return (
        <Card background={background} className={styles.CardContainer}>
            <div className={styles.Left}>
                <time>{date}</time>
                {image && <img src={image} alt={`${date} - ${temperature}`} />}
            </div>
            <div className={styles.Right}>
                <h3>{temperature}</h3>
                <h4>{description}</h4>
            </div>
        </Card>
    )
}

CardMonth.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]),
    /**
     * date displayed on the top left
     */
    date: PropTypes.string.isRequired,
    /**
     * Temperature displayed on the top right
     */
    temperature: PropTypes.string.isRequired,
    /**
     * Description displayed on the bottom right
     */
    description: PropTypes.string.isRequired,
    /**
     * Image displayed on the bottom left
     */
    image: PropTypes.string,
}
CardMonth.defaultProps = {
    background: "bg-primary",
    image: false,
}

export default CardMonth
