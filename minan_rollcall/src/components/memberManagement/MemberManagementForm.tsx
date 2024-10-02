import React, { useEffect } from "react";
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
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface FieldType {
  username: string;
  gender: string;
  isAdult: boolean;
  notes: string;
  phone: string;
  address: {
    city: string;
    area: string;
    street: string;
  };
}

interface Props {
  selectedMember: any;
  onSubmit: (values: FieldType) => void; // 提交函數
}

const validationSchema = Yup.object({
  username: Yup.string().required("姓名是必填的"),
  gender: Yup.string().required("性別是必填的"),
  isAdult: Yup.boolean().required("請選擇是否為成人"),
  notes: Yup.string().required("請輸入標記(小筆記)"),
  phone: Yup.string().required("請輸入電話號碼"),
  address: Yup.object({
    city: Yup.string().required("城市是必填的"),
    area: Yup.string().required("區域是必填的"),
    street: Yup.string().required("街道是必填的"),
  }),
});

export default function MemberManagementForm(props: Props) {
  const { selectedMember, onSubmit } = props;

  return (
    <Formik
      initialValues={{
        username: "",
        gender: "",
        isAdult: true,
        notes: "",
        phone: "",
        address: {
          city: "",
          area: "",
          street: "",
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Success:", values);
        onSubmit(values); // 執行提交函數
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form style={{ maxWidth: 600, padding: "48px 0px" }}>
          <FormControl fullWidth margin="normal">
            <FormLabel>姓名</FormLabel>
            <Field name="username">
              {({ field, meta }) => (
                <>
                  <Input {...field} required />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </>
              )}
            </Field>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>性別</FormLabel>
            <Field name="gender">
              {({ field, meta }) => (
                <>
                  <Select {...field} displayEmpty>
                    <MenuItem value="">
                      <em>選擇性別</em>
                    </MenuItem>
                    <MenuItem value="male">男</MenuItem>
                    <MenuItem value="female">女</MenuItem>
                  </Select>
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </>
              )}
            </Field>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">是否為成人</FormLabel>
            <Field name="isAdult">
              {({ field, meta }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="是"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="否"
                  />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </RadioGroup>
              )}
            </Field>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>地址</FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field name="address.city">
                  {({ field, meta }) => (
                    <>
                      <Select {...field} displayEmpty>
                        <MenuItem value="">
                          <em>選擇城市</em>
                        </MenuItem>
                        <MenuItem value="NewTaipei">新北市</MenuItem>
                        <MenuItem value="Taoyuan">桃園市</MenuItem>
                      </Select>
                      {meta.touched && meta.error ? (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      ) : null}
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field name="address.area">
                  {({ field, meta }) => (
                    <>
                      <Select {...field} displayEmpty>
                        <MenuItem value="">
                          <em>選擇區域</em>
                        </MenuItem>
                        <MenuItem value="Shulin">樹林區</MenuItem>
                        <MenuItem value="Sindrum">新莊區</MenuItem>
                      </Select>
                      {meta.touched && meta.error ? (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      ) : null}
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <Field name="address.street">
              {({ field, meta }) => (
                <>
                  <Input {...field} placeholder="輸入街道名稱" />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </>
              )}
            </Field>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>標記(小筆記)</FormLabel>
            <Field name="notes">
              {({ field, meta }) => (
                <>
                  <TextField {...field} multiline rows={4} />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </>
              )}
            </Field>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>電話</FormLabel>
            <Field name="phone">
              {({ field, meta }) => (
                <>
                  <Input {...field} />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </>
              )}
            </Field>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ display: "flex", margin: "0 auto" }}
          >
            送出
          </Button>
        </Form>
      )}
    </Formik>
  );
}
