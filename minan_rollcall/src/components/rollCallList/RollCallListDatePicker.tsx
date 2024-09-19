import { DatePicker, DatePickerProps } from "antd";
import React from "react";

interface Props{
    onChange:(dateString:string)=>void;
}
export default function RollCallListDatePicker(props:Props){
   const {onChange} = props;
    return(
        <DatePicker
            format={{
                format: 'YYYY-MM-DD',
                type: 'mask',
            }}
            onChange={onChange}
        />
    );
}