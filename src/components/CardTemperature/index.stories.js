import React from "react"
import CardTemperature from "./index"

export default {
    title: "Components/CardTemperature",
    component: CardTemperature,
    argTypes: {},
}

const Template = (args) => (
    <div style={{ height: 400, overflow: "hidden" }}>
        <CardTemperature {...args} />
    </div>
)

export const Simple = Template.bind({})
Simple.args = {
    background: "bg-primary",
    temperatures: [
        {
            temperature: "22°",
            hour: "3 p.m.",
        },
        {
            temperature: "20°",
            hour: "4 p.m.",
        },
        {
            temperature: "20°",
            hour: "5 p.m.",
        },
        {
            temperature: "19°",
            hour: "6 p.m.",
        },
        {
            temperature: "17°",
            hour: "7 p.m.",
        },
        {
            temperature: "15°",
            hour: "8 p.m.",
        },
        {
            temperature: "13°",
            hour: "9 p.m.",
        },
    ],
}
