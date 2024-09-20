import { Col, Row } from "antd";
import React from "react";
import RollCallListTypography from "../../components/rollCallList/RollCallListTypography.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import RollCallListTable from "../../components/rollCallList/RollCallListTable.tsx";


export default function RollCallListWorshipScreen(){
    const location = useLocation();
    const navigate = useNavigate();

    const { date, modeIndex,mode } = location.state || {};
    const dateChange = moment(date.$d);
console.log(modeIndex)
    // 转换为 yyyy-mm-dd 格式
    const formattedDate = dateChange.format('YYYY-MM-DD');

    const selectedMode = mode.find(item => item.key === modeIndex);
    const modeName = selectedMode ? selectedMode.modeName : 'Unknown Mode';
    
    const handleOnchangeCheck = (key:number)=>{
        console.log(key);
      };
    
      const handleBackPage = ()=>{
        navigate(-1);
      }
    return(
        <>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Col>
                <RollCallListTypography titleName={formattedDate+modeName+'點名表'} />
            </Col>
        </Row>
        <RollCallListTable onChangeCheck={handleOnchangeCheck} onBackPage={handleBackPage}/>
        </>
    );
}