import React from "react"
import Tabs from "./index"
import CardDay from "../CardDay"

export default {
    title: "Components/Tabs",
    component: Tabs,
    argTypes: {},
}

const Template = (args) => (
    <div style={{ height: 800, overflow: "hidden", width: 500 }}>
        <Tabs {...args} />
    </div>
)

export const Simple = Template.bind({})
Simple.args = {
    week: [
        {
            day: "Saturday",
            temp: 18,
            image: "02d",
        },
        {
            day: "Saturday",
            temp: 18,
            image: "02d",
        },
        {
            day: "Saturday",
            temp: 18,
            image: "02d",
        },
        {
            day: "Saturday",
            temp: 18,
            image: "02d",
        },
        {
            day: "Saturday",
            temp: 18,
            image: "02d",
        },
    ],
    month: {
        date: "Fri, 25 Set",
        image: "02d",
        typeWind: "Strong wind",
        data: {
            temp: 10,
            temp_min: 8,
            temp_max: 14,
            humidity: 55,
            uvi: 3,
            dew_point: 3,
        },
    },
}
