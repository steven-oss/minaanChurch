import { Col, DatePickerProps, Row } from "antd";
import React, { useState } from "react";
import RollCallListButton from "../../components/rollCallList/RollCallListButton.tsx";
import RollCallListTypography from "../../components/rollCallList/RollCallListTypography.tsx";
import RollCallListDynamicButton from "../../components/rollCallList/RollCallListDynamicButton.tsx";
import RollCallListDatePicker from "../../components/rollCallList/RollCallListDatePicker.tsx";

export default function RollCallListViewScreen(){
     // Track which button is "filled"
    const [modeIndex, setModeIndex] = useState<number | null>(null); 
    const [sessionIndex,setSessionIndex] = useState<number | null>(null);
    const [datePicker,setDatePicker] = useState<string>('');

    const mode = [
        {modeName:'華語禮拜'},
        {modeName:'台語禮拜'},
        {modeName:'養育班'},
        {modeName:'門徒學校'},
        {modeName:'門徒大學第一學期'},
        {modeName:'門徒大學大二學期'},
    ]
    const modeNames = mode.map((item) => item.modeName);

    const session=[
        {sessionName:'第一場'},
        {sessionName:'第二場'},
    ]
    const sessionNames = session.map((item) => item.sessionName);

    // Handle button click to toggle between solid and outlined
    const handleModeButtonClick = (index: number) => {
        // Only update if the clicked button is different from the currently filled button
        if (modeIndex === index) {
            setModeIndex(null); // Unfill the button if it's already filled
        } else {
            setModeIndex(index); // Set the clicked button as filled
        }
    };

    const handleSessionButtonClick = (index: number) => {
        // Only update if the clicked button is different from the currently filled button
        if (sessionIndex === index) {
            setSessionIndex(null); // Unfill the button if it's already filled
        } else {
            setSessionIndex(index); // Set the clicked button as filled
        }
    };
    
    const handleDatePickerChange = (dateString:string) => {
        setDatePicker(dateString);
      };
    
    const handleStartRollCall = ()=>{
        console.log([
            {'datePicker':datePicker},
            {'modeIndex':modeIndex},
            {'sessionIndex':sessionIndex}])
    }
    return(
        <>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListTypography titleName="點名日期" />
            </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListDatePicker onChange={(dateString:string)=>handleDatePickerChange(dateString)}/>
            </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListTypography titleName="聚會模式" />
            </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListDynamicButton dynamicButton={modeNames} onClick={(index:number)=>handleModeButtonClick(index)} universalIndex={modeIndex}/>
            </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListTypography titleName="聚會時間" />
            </Col>
        </Row>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListDynamicButton dynamicButton={sessionNames} onClick={(index:number)=>handleSessionButtonClick(index)} universalIndex={sessionIndex}/>
            </Col>
        </Row>
        <Row justify="end">
            <Col>
                <RollCallListButton onClick={()=>handleStartRollCall()} actionName="開始點名"/>
            </Col>
        </Row>
    </>
    );
}