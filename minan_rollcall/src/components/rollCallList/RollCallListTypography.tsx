import { Typography } from "antd";
import React from "react";

interface Props{
    titleName:string;
}
const { Title } = Typography;

export default function RollCallListTypography(props:Props){
    const {titleName} =props;
    return(
        <Typography>
            <Title level={4}>{titleName}</Title>
        </Typography>
    );
}