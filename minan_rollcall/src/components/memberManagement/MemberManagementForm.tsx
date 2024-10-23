import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Alert,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DataPagination, GenderType } from "../../pages/memberManagement/MemberManagementScreen";
import { fetchMembers, postMembers, putMembers } from "../../api/membersApi.ts";

interface FieldType {
  username?: string;
  gender?: string;
  isAdult?: boolean;
  notes?: string;
  phone?: string;
  street?: string;
  // address?: {
  //   city?: string;
  //   area?: string;
  //   street?: string;
  // };
}

interface Props {
  selectedMember: any;
  genderData:GenderType|null;
  setErrorMessage:(errorMessage:string)=>void;
  onCancel:()=>void;
  pagination:DataPagination;
  rowsPerPage:number;
  setMembersData:(data:any)=>void;
  setPagination:(page:DataPagination)=>void;
}

export default function MemberManagementForm(props: Props) {
  const { selectedMember,genderData,setErrorMessage,onCancel,pagination,rowsPerPage,setMembersData,setPagination } = props;
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FieldType>();
// console.log(control,errors )
  useEffect(() => {
    if (selectedMember) {
      reset({
        username: selectedMember.username,
        gender: selectedMember.gender,
        isAdult: selectedMember.isAdult ? true : false,
        notes: selectedMember.notes,
        phone: selectedMember.phone,
        street: selectedMember.street || '',
        // address: {
        //   city: selectedMember.address?.city || '',
        //   area: selectedMember.address?.area || '',
        //   street: selectedMember.address?.street || '',
        // },
      });
    } else {
      reset();
    }
  }, [selectedMember, reset]);

  const onSubmit = async(data: FieldType) => {
    console.log("Form submitted:", data);

    let result;
    if (selectedMember) {
      // If editing, call the update API
      result = await putMembers(selectedMember.id, data);
    } else {
      // If adding a new member, call the add API
      result = await postMembers(data);
    }
    const memberDatas = await fetchMembers(pagination.currentPage, rowsPerPage);
    setMembersData(memberDatas.data);

    console.log("API Result:", result);
    if (result.message !== "successful") {
      setErrorMessage(result.message);
    }else{
      setPagination(memberDatas.pagination)
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
      <FormControl fullWidth margin="normal">
        <FormLabel>姓名</FormLabel>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "姓名是必填的" }}
          render={({ field }) => (
            <>
              <Input {...field} required />
              {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>性別</FormLabel>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: "性別是必填的" }}
          render={({ field }) => (
            <>
              <Select {...field} displayEmpty>
                <MenuItem value="">
                  <em>選擇性別</em>
                </MenuItem>
                {
                  genderData?.data.map((gender)=>(
                    <MenuItem key={gender.id} value={gender.id}>{gender.gender}</MenuItem>
                  ))
                }
              </Select>
              {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}
            </>
          )}
        />
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">是否為成人</FormLabel>
        <Controller
          name="isAdult"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value={true} control={<Radio />} label="是" />
              <FormControlLabel value={false} control={<Radio />} label="否" />
            </RadioGroup>
          )}
        />
      </FormControl>

      {/* <FormControl fullWidth margin="normal">
        <FormLabel>縣市</FormLabel>
        <Controller
          name="address.city"
          control={control}
          defaultValue=""
          rules={{ required: "縣市是必填的" }}
          render={({ field }) => (
            <>
              <Select {...field} displayEmpty>
                <MenuItem value="">
                  <em>選擇城市</em>
                </MenuItem>
                <MenuItem value="NewTaipei">新北市</MenuItem>
                <MenuItem value="Taoyuan">桃園市</MenuItem>
              </Select>
              {errors.address?.city && <span style={{ color: 'red' }}>{errors.address.city.message}</span>}
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>區</FormLabel>
        <Controller
          name="address.area"
          control={control}
          defaultValue=""
          rules={{ required: "區域是必填的" }}
          render={({ field }) => (
            <>
              <Select {...field} displayEmpty>
                <MenuItem value="">
                  <em>選擇區域</em>
                </MenuItem>
                <MenuItem value="Shulin">樹林區</MenuItem>
                <MenuItem value="Sindrum">新莊區</MenuItem>
              </Select>
              {errors.address?.area && <span style={{ color: 'red' }}>{errors.address.area.message}</span>}
            </>
          )}
        />
      </FormControl> */}

      <FormControl fullWidth margin="normal">
        <FormLabel>地址</FormLabel>
        <Controller
          name="street"
          control={control}
          defaultValue=""
          // rules={{ required: "地址名稱是必填的" }}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="輸入地址名稱" />
              {/* {errors.address?.street && <span style={{ color: 'red' }}>{errors.address.street.message}</span>} */}
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>標記(小筆記)</FormLabel>
        <Controller
          name="notes"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} multiline rows={2} />}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>電話</FormLabel>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: "電話是必填的", pattern: { value: /^[0-9]+$/, message: "請輸入有效的電話號碼" } }}
          render={({ field }) => (
            <>
              <Input {...field} />
              {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
            </>
          )}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="success" style={{ display: 'flex', margin: '0 auto' }}>
        送出
      </Button>
    </form>
  );
}

