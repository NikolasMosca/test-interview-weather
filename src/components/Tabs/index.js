import React, { useState } from "react"
import PropTypes from "prop-types"
import CardDay from "../CardDay"
import Card from "../Card"
import { getImageUrl } from "../../features/Weather/weatherSlice"

import styles from "./style.module.scss"

const Tabs = ({ week, month }) => {
    const [activeTab, setActiveTab] = useState("WEEK")
    const [page, setPage] = useState(0)

    const printDotsWeek = () => {
        let dots = []
        for (let i = 0; i < Math.round(week.length / 3); i++) {
            dots.push(
                <div
                    key={i}
                    className={`${styles.Dot} ${page === i ? styles.Active : ""}`}
                    onClick={() => setPage(i)}
                ></div>
            )
        }

        return <div className={styles.Pagination}>{dots.map((dot) => dot)}</div>
    }
    const printDaysByPage = () => {
        let days = []
        week.forEach(({ day, temp, image }, index) => {
            const indexStart = page * 3
            const indexEnd = (page + 1) * 3
            if (index >= indexStart && index < indexEnd) {
                days.push(
                    <div className={styles.Item} key={index} cypress-ref="week-item">
                        <CardDay day={day} temperature={temp} image={image} />
                    </div>
                )
            }
        })
        return days
    }

    return (
        <div className={styles.TabsContainer}>
            <div className={styles.Header}>
                <div
                    className={`${styles.Item} ${activeTab === "WEEK" ? styles.Active : ""}`}
                    onClick={() => setActiveTab("WEEK")}
                    cypress-ref="week-tab"
                >
                    This week
                </div>
                <div
                    className={`${styles.Item} ${activeTab === "MONTH" ? styles.Active : ""}`}
                    onClick={() => setActiveTab("MONTH")}
                    cypress-ref="month-tab"
                >
                    This month
                </div>
            </div>
            <div className={styles.Body}>
                {activeTab === "WEEK" && (
                    <>
                        <div className={styles.WeekView}>{printDaysByPage()}</div>
                        {printDotsWeek()}
                    </>
                )}
                {activeTab === "MONTH" && (
                    <Card>
                        <div className={styles.MonthView} cypress-ref="month-item">
                            <div className={styles.Left}>
                                <time>{month.date}</time>
                                <img src={getImageUrl(month.image)} alt={month.typeWind} />
                            </div>
                            <div className={styles.Right}>
                                <h2>{month.data.temp}°</h2>
                                <p>{month.typeWind}</p>
                                <p>
                                    The high will be {month.data.temp_min}°C, the low will be {month.data.temp_max}°C.
                                </p>
                                <p>
                                    Humidity: {month.data.humidity}%
                                    <br />
                                    UV: {month.data.uvi}
                                    <br />
                                    Dew point: {month.data.dew_point}°C
                                    <br />
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    week: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            temp: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ),
    month: PropTypes.shape({
        date: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        typeWind: PropTypes.string.isRequired,
        data: PropTypes.shape({
            temp: PropTypes.number.isRequired,
            temp_min: PropTypes.number.isRequired,
            temp_max: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
            uvi: PropTypes.number.isRequired,
            dew_point: PropTypes.number.isRequired,
        }),
    }),
}
Tabs.defaultProps = {
    week: [],
    month: {},
}

export default Tabs
