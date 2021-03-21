import React from "react"
import CardMonth from "./index"

export default {
    title: "Components/CardMonth",
    component: CardMonth,
    argTypes: {},
}

const Template = (args) => <CardMonth {...args} />

export const Simple = Template.bind({})
Simple.args = {
    background: "bg-primary",
    date: "Fri, 25 set",
    temperature: "18°",
    desription: (
        <>
            Strong wind
            <br />
            <br />
            The high will be 14°C, the low will be 8°C.
            <br />
            <br />
            Humidity: 55%
            <br />
            UV: 3<br />
            Dew point: 3°C
        </>
    ),
}
