import { Menu, MenuProps } from "antd";
import React from "react";



export default function LayoutMenu() {
    const labels = ['點名表', '人數統計表', '會友管理'];

    const items1: MenuProps['items'] = labels.map((label, index) => ({
    key: `${index + 1}`,
    label,
    }));

    return(
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['3']}
          items={items1}
          style={{ flex: 1, minWidth: 0,justifyContent:'flex-end' }}
        />
    )
}