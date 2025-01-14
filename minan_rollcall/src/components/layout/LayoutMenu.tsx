import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, AppBar, Box, Toolbar } from "@mui/material";
import LayoutTypography from "./LayoutTypography.tsx";

export default function LayoutMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const labels = ['點名表', '人數統計表', '會友管理'];

    // State to track the currently selected tab
    const [selectedTab, setSelectedTab] = useState(2);

    useEffect(() => {
        const path = location.pathname;

        if (path === '/RollCallListSelectScreen' || path === '/RollCallListSelectScreen/Worship') {
            setSelectedTab(0);
        } else if (path === '/attendance-statistics') {
            setSelectedTab(1);
        } else if (path === '/MemberManagement') {
            setSelectedTab(2);
        } else {
            setSelectedTab(2);
        }
    }, [location.pathname]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue); // Update selectedTab when tab is changed

        if (newValue === 0) {
            navigate('/RollCallListSelectScreen');
        } else if (newValue === 1) {
            navigate('/attendance-statistics');
        } else if (newValue === 2) {
            navigate('/MemberManagement');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LayoutTypography text={"後台點名系統"} variant={'h4'} />
                <Box>
                    <Tabs
                        sx={{ color: "#ffffff" }}
                        value={selectedTab}
                        onChange={handleTabChange}
                    >
                        {labels.map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                sx={{
                                    color: "#ffffff",
                                    '&.Mui-selected': { color: '#ffffff' },
                                    '&.Mui-focusVisible': { outline: 'none' }
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
