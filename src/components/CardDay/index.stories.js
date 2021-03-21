import React from "react"
import CardDay from "./index"

export default {
    title: "Components/CardDay",
    component: CardDay,
    argTypes: {},
}

const Template = (args) => <CardDay {...args} />

export const Simple = Template.bind({})
Simple.args = {
    background: "bg-primary",
    day: "Saturday",
    temperature: "18°",
}
