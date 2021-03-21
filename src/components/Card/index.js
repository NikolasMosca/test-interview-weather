import React from "react"
import PropTypes from "prop-types"

import styles from "./style.module.scss"

const Card = ({ background, className, children }) => {
    return <div className={`${styles.CardContainer} ${styles[background]} ${className}`}>{children}</div>
}

Card.propTypes = {
    /**
     * Define which background gradient use in this card
     */
    background: PropTypes.oneOf(["bg-primary", "bg-secondary", "bg-tertiary"]).isRequired,
    /**
     * Custom classname
     */
    className: PropTypes.string,
}
Card.defaultProps = {
    background: "bg-primary",
    className: "",
}

export default Card
