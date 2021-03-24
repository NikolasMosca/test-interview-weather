import React from "react"
import PropTypes from "prop-types"
import Card from "../Card"

import styles from "./style.module.scss"

const CardDay = ({ background, temperatures }) => {
    return (
        <Card background={background} className={styles.CardContainer}>
            <h2>Now</h2>
            <div className={styles.ItemsContainer}>
                {temperatures.map(({ temperature, hour }, index) => (
                    <div className={styles.Item} key={index}>
                        <h3>{temperature}°</h3>
                        <div className={styles.VerticalLine}>
                            <div className={styles.Point}></div>
                        </div>
                        <time>{hour}</time>
                    </div>
                ))}
            </div>
        </Card>
    )
}

CardDay.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]),
    /**
     * List of temperature by hour
     */
    temperatures: PropTypes.arrayOf(
        PropTypes.shape({
            temperature: PropTypes.number.isRequired,
            hour: PropTypes.string.isRequired,
        })
    ).isRequired,
}
CardDay.defaultProps = {
    background: "bg-primary",
    temperatures: [],
}

export default CardDay
