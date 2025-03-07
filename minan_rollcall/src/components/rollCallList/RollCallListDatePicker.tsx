import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // 使用 dayjs 适配器
import { Dayjs } from "dayjs"; // 使用 dayjs 来格式化日期

interface Props {
  onChange: (dateString: string) => void;
}

export default function RollCallListDatePicker(props: Props) {
  const { onChange } = props;

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      onChange(date.format("YYYY-MM-DD"));
    }
  };

  // 仅允许选择周日
  const shouldDisableDate = (date: Dayjs) => {
    return date.day() !== 0; // 0 表示周日
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        slotProps={{ textField: { fullWidth: true } }}
        shouldDisableDate={shouldDisableDate} // 添加这个属性
      />
    </LocalizationProvider>
  );
}
