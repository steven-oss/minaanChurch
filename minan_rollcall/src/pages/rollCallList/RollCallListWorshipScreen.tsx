import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import RollCallListTypography from "../../components/rollCallList/RollCallListTypography.tsx";
import RollCallListTable from "../../components/rollCallList/RollCallListTable.tsx";
import {  Grid } from "@mui/material";
import RollCallListSearch from "../../components/rollCallList/RollCallListSearch.tsx";
import RollCallListButton from "../../components/rollCallList/RollCallListButton.tsx";
import { getRollCallPagination } from "../../api/rollCallApi.ts";
import { DataPagination } from "../memberManagement/MemberManagementScreen.tsx";

export interface DataType {
    id: number;
    name: string;
    notes: string;
  }

export default function RollCallListWorshipScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const { date, modeIndex, mode } = location.state || {};
    // const dateChange = moment(date.$d);
    // console.log(modeIndex);
    const [searchText, setSearchText] = useState(''); // Store search text
    const [rollCallData, setRollCallData] = useState<DataType[]>([]); // Store filtered data
    const [page, setPage] = useState(0); // Current page state
    const [pagination,setPagination] = useState<DataPagination>({
      currentPage:1,
      pageSize:1,
      totalMembers:1,
      totalPages:1
    })
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Convert to yyyy-mm-dd format
    // const formattedDate = dateChange.format('YYYY-MM-DD');

    // const selectedMode = mode.find(item => item.key === modeIndex);
    // const modeName = selectedMode ? selectedMode.modeName : 'Unknown Mode';
    
    const handleOnchangeCheck = (key: number) => {
        console.log(key);
    };

    const handleBackPage = () => {
        navigate(-1);
    };

      // Handle search input change
  // const handleSearch = (value: string) => {
  //   setSearchText(value);

  //   const filtered = data.filter((item) =>
  //     Object.keys(item).some((key) =>
  //       String(item[key as keyof DataType]).toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  //   setFilteredData(filtered); // Update filtered data
  //   setPage(0); // Reset page when filtering
  // };

    // Original data
    // const data: DataType[] = [
    //     { key: 1, name: '魏榮光', notes: '牧師' },
    //     { key: 2, name: '李孟芹', notes: '師母' },
    //     { key: 3, name: '魏蘿苡', notes: '牧師的女兒' },
    //     { key: 4, name: '張三', notes: '朋友' },
    //     { key: 5, name: '李四', notes: '同學' },
    //     { key: 6, name: '王五', notes: '鄰居' },
    //     // Add more data as needed for pagination
    //   ];

      // useEffect(()=>{
      //   const today = new Date();
      //   const dayOfWeek = today.getDay(); // 取得今天是星期幾 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    
      //   const daysUntilNextSunday = (7 - dayOfWeek) % 7 || 7; // 確保結果為正數
      //   const nextSunday = new Date(today);
      //   nextSunday.setDate(today.getDate() + daysUntilNextSunday);
      //   const getLastSunday = nextSunday.toLocaleDateString();
      //   setNextSunday(getLastSunday)
      // })
      const fetchData = async (currentPage: number,rowsPerPage:number) => {
        const result = await getRollCallPagination(date,currentPage + 1, rowsPerPage);
        setPagination(result.pagination);
        setRollCallData(result.data); 
        console.log(result)
      };
  
      useEffect(() => {
          fetchData(page,rowsPerPage);
      }, []);

      const handleChangePage = async(event: unknown, newPage: number) => {
        setPage(newPage);
        const result = await getRollCallPagination(date,newPage + 1, rowsPerPage);
        setPagination(result.pagination);
        setRollCallData(result.data); 
      };
  
        // 行數變更處理
      const handleChangeRowsPerPage = async(event: React.ChangeEvent<HTMLInputElement>) => {
        // if(!searchText){
          const result = await getRollCallPagination(date,1, parseInt(event.target.value, 10));
          setPagination(result.pagination);
          setRollCallData(result.data);
        // }else{
        //   const result = await getSearchMembers(searchText,1, parseInt(event.target.value, 10));
        //   setPagination(result.pagination);
        //   setMembersData(result.data);
        // }
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item>
                    <RollCallListTypography titleName={`${date} 點名表`} />
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Grid item xs={6}>
                    {/* <RollCallListSearch onSearch={(value:string)=>handleSearch(value)} searchText={searchText}/> */}
                </Grid>
                <Grid item xs={6} textAlign={'right'}>
                    <RollCallListButton actionName="返回" onClick={handleBackPage}/>
                </Grid>
            </Grid>
            <RollCallListTable onChangeCheck={handleOnchangeCheck} pagination={pagination} rowsPerPage={rowsPerPage} page={page} data={rollCallData} onChangePage={(event:unknown,newPage:number)=>handleChangePage(event,newPage)} onChangeRowsPerPage={(event:React.ChangeEvent<HTMLInputElement>)=>handleChangeRowsPerPage(event)}/>
        </>
    );
}
