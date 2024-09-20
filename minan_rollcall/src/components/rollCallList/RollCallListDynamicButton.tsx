import { Button, Col, Row } from "antd";
import React from "react";

interface ButtonItem {
    key: number;
    modeName?: string; // Optional for mode
    sessionName?: string; // Optional for session
}

interface Props {
    dynamicButton: Array<ButtonItem>;
    universalIndex: number | null;
    onClick: (key: number) => void;
}

export default function RollCallListDynamicButton(props: Props) {
    const { dynamicButton, onClick, universalIndex } = props;

    // Determine the column span based on the number of items
    const colSpan = dynamicButton.length < 4 ? 24 / dynamicButton.length : 6;

    return (
        <Row gutter={[16, 16]} justify="center">
            {dynamicButton.map((item) => (
                <Col key={item.key} xs={24} sm={12} md={colSpan} lg={colSpan}>
                    <Button
                        type={universalIndex === item.key ? "primary" : "default"} // Compare with item's key
                        style={{ width: '100%' }}
                        onClick={() => onClick(item.key)} // Pass the item's key
                    >
                        {item.modeName || item.sessionName} {/* Display the correct label */}
                    </Button>
                </Col>
            ))}
        </Row>
    );
}
