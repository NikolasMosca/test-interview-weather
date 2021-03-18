import React from "react"
import Card from "./index"

export default {
    title: "Components/Card",
    component: Card,
    argTypes: {},
}

const Template = (args) => <Card {...args} />

export const Simple = Template.bind({})
Simple.args = {
    children: <>This is a simple card with custom content</>,
}
