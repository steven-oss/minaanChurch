import { Button } from "antd";
import React, { useState } from "react";

interface Props{
    actionName:string;
    onClick:()=>void;
}
export default function RollCallListButton(props:Props){
    const {actionName,onClick} = props;
    return(
        <Button type="primary" onClick={onClick}>{actionName}</Button>
    )
}