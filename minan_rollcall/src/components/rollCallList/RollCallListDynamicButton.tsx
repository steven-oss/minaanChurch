import { Button, Col, Row } from "antd";
import React, { useState } from "react";

interface Props {
    dynamicButton: Array<string>;
    universalIndex:number|null;
    onClick:(index:number)=>void;
}

export default function RollCallListDynamicButton(props: Props) {
    const { dynamicButton,onClick,universalIndex } = props;


    // Determine the column span based on the number of items
    const colSpan = dynamicButton.length < 4 ? 24 / dynamicButton.length : 6;

    return (
        <Row gutter={[16, 16]} justify="center">
            {dynamicButton.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={colSpan} lg={colSpan}>
                    <Button
                        type={universalIndex === index ? "primary" : "default"} // Toggle between primary (solid) and default (outlined)
                        style={{ width: '100%' }}
                        onClick={() => onClick(index)} // Handle click
                    >
                        {item}
                    </Button>
                </Col>
            ))}
        </Row>
    );
}
