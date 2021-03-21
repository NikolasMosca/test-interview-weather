import React from "react"
import CardCity from "./index"

export default {
    title: "Components/CardCity",
    component: CardCity,
    argTypes: {},
}

const Template = (args) => <CardCity {...args} />

export const Simple = Template.bind({})
Simple.args = {
    background: "bg-secondary",
    city: "London",
    date: "Friday 18, september",
    hour: "2:38 p.m.",
    temperature: "18°",
}
