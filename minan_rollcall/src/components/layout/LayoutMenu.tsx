import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, AppBar, Box, Toolbar } from "@mui/material";
import LayoutTypography from "./LayoutTypography.tsx";

export default function LayoutMenu() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const labels = ['點名表', '人數統計表', '會友管理'];

    // Determine the default selected tab based on the current path
    const getDefaultSelectedTab = () => {
        switch (location.pathname) {
            case '/RollCallListSelectScreen':
                return 0;
            case '/attendance-statistics':
                return 1;
            case '/MemberManagement':
                return 2;
            default:
                return 2; // Default to the first item
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 0:
                navigate('/RollCallListSelectScreen');
                break;
            case 1:
                navigate('/attendance-statistics');
                break;
            case 2:
                navigate('/MemberManagement');
                break;
            default:
                break;
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LayoutTypography text={"民安教會後台管理"} variant={"h4"} sx={{ color: '#ffffff', margin: '16px 0' }}/>
                <Box>
                    <Tabs
                        sx={{color:"#ffffff"}}
                        value={getDefaultSelectedTab()} // Use dynamic selected tab
                        onChange={handleTabChange} // Handle tab change
                    >
                        {labels.map((label, index) => (
                            <Tab key={index} label={label} sx={{ color: "#ffffff", '&.Mui-selected': { color: '#ffffff' }, '&.Mui-focusVisible': { outline: 'none' } }} />
                        ))}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
