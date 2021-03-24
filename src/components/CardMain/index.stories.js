import React from "react"
import CardMain from "./index"

export default {
    title: "Components/CardMain",
    component: CardMain,
    argTypes: {},
}

const Template = (args) => (
    <div style={{ height: 600, overflow: "hidden", padding: 40 }}>
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
