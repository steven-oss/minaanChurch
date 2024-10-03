import React, { useState } from "react";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";
import MemberManagementButton from "../../components/memberManagement/MemberManagementButton.tsx";
import MemberManagementModal from "../../components/memberManagement/MemberManagementModal.tsx";
import { Box, Grid, Grid2 } from "@mui/material";
import MemberManagementSearch from "../../components/memberManagement/MemberManagementSearch.tsx";
  

export interface DataType {
  key: number;
  name: string;
  sex: string;
  isAdult: boolean;
  notes: string;
  address: string;
  phone: string;
}

export default function MemberManagementScreen() {

    const [open,setOpen] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<any>(null); 
    const [searchText, setSearchText] = useState(''); // 存儲搜尋文字
    const [filteredData, setFilteredData] = useState<DataType[]>([]); // 存儲篩選後的數據

    const handleCreateButton = ()=>{
      setOpen(true);
      setSelectedMember(null);  
    };
    const handleCreateButtonCancel=()=>{
      setOpen(false);
    }
   
    const handleEditButton = (key:number)=>{
      setOpen(true);
      console.log(key);
      const memberData = getMemberById(key);
      setSelectedMember(memberData);
    };
      // 當輸入框改變時觸發的函數
    const handleSearch = (value: string) => {
      setSearchText(value);

      const filtered = data.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key as keyof DataType]).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered); // 更新篩選後的數據
    };

    const data: DataType[] = [
      {
        key: 1,
        name: '魏榮光',
        sex: '男',
        isAdult: true,
        notes: '牧師',
        address: '新北市',
        phone: '123456789',
      },
      {
        key: 2,
        name: '李孟芹',
        sex: '女',
        isAdult: true,
        notes: '師母',
        address: '新北市',
        phone: '123456789',
      },
      {
        key: 3,
        name: '魏蘿苡',
        sex: '女',
        isAdult: false,
        notes: '牧師的女兒',
        address: '新北市',
        phone: '123456789',
      },
      // 更多數據
      {
        key: 4,
        name: '陳明',
        sex: '男',
        isAdult: true,
        notes: '朋友',
        address: '新北市',
        phone: '987654321',
      },
      {
        key: 5,
        name: '張小雅',
        sex: '女',
        isAdult: false,
        notes: '學生',
        address: '新北市',
        phone: '123456789',
      },
      {
        key: 6,
        name: '王大明',
        sex: '男',
        isAdult: true,
        notes: '同事',
        address: '新北市',
        phone: '123456789',
      },
    ];

    return(
        <>
        <Grid container alignItems={'center'}>
          <Grid item xs={6}>
            <MemberManagementSearch onSearch={(value:string)=>handleSearch(value)} searchText={searchText}/>
          </Grid>
          <Grid item xs={6} textAlign={'right'}>
            <MemberManagementButton actionName="新增會友" onClick={handleCreateButton} color="primary"/>
            </Grid>
        </Grid>
          <MemberManagementTable onEditButton={(key:number)=>handleEditButton(key)} data={data} searchText={searchText} filteredData={filteredData}/>
          <MemberManagementModal open={open} onCreateButtonCancel={handleCreateButtonCancel} selectedMember={selectedMember}/>
        </>
    )
}

function getMemberById(id:number) {
  switch (id){
    case 1:
      return{
        id,
        username: "魏榮光",
        gender: "男",
        isAdult:true,
        notes:'牧師',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    case 2:
      return{
        id,
        username: "李孟芹",
        gender: "女",
        isAdult:true,
        notes:'師母',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    case 3:
      return{
        id,
        username: "魏蘿苡",
        gender: "女",
        isAdult:false,
        notes:'牧師的女兒',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    default:
      return null;
  }
}