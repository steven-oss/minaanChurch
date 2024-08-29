import { Typography } from "antd";
import React from "react";

const { Title } = Typography;


export default function LayoutTypography() {
    return(
        <Typography>
         <Title style={{color:'#ffffff',margin:'16px 0'}}>民安教會後台管理</Title>
        </Typography>
    );
}