import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LayoutMenu() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const labels = ['點名表', '人數統計表', '會友管理'];

    const items1: MenuProps['items'] = labels.map((label, index) => ({
        key: `${index + 1}`,
        label,
    }));

    // Determine the default selected key based on the current path
    const getDefaultSelectedKey = () => {
        switch (location.pathname) {
            case '/RollCallListSelectScreen':
                return '1';
            case '/attendance-statistics': // Update with the correct path
                return '2';
            case '/MemberManagement':
                return '3';
            default:
                return '1'; // Default to the first item or whatever you prefer
        }
    };

    const handleMenuClick = (key: string) => {
        switch (key) {
            case '1':
                navigate('/RollCallListSelectScreen');
                break;
            case '2':
                navigate('/attendance-statistics'); // Adjust the path as needed
                break;
            case '3':
                navigate('/MemberManagement');
                break;
            default:
                break;
        }
    };

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[getDefaultSelectedKey()]} // Use dynamic selected key
            items={items1}
            onClick={({ key }) => handleMenuClick(key)} // Handle menu item click
            style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
        />
    );
}
