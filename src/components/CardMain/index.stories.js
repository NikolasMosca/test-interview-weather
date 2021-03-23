import React from "react"
import CardMain from "./index"

export default {
    title: "Components/CardMain",
    component: CardMain,
    argTypes: {},
}

const Template = (args) => (
    <div style={{ height: 400, overflow: "hidden" }}>
        <CardMain {...args} />
    </div>
)

export const Simple = Template.bind({})
Simple.args = {
    background: "bg-primary",
    name: "London",
    date: "Tuesday 23, March",
    temperature: 22,
    weatherImage: "",
    weatherDescription: "",
}
