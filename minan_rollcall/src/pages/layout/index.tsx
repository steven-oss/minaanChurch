import React from 'react';
import { AppBar, Toolbar, Container, Box, Typography } from '@mui/material';
import LayoutTypography from '../../components/layout/LayoutTypography.tsx';
import LayoutMenu from '../../components/layout/LayoutMenu.tsx';

interface Props {
  children: React.ReactNode;
}

const Apps = ({ children }: Props) => {
  return (
    <>
      <LayoutMenu />

      {/* Content Section */}
      <Container sx={{ marginTop: 6, marginBottom: 6 }}>
        <Box
          sx={{
            backgroundColor: 'background.paper', // MUI color system
            minHeight: 280,
            padding: 3,
            borderRadius: 2,
            boxShadow: 1, // Optional for a slight shadow effect
          }}
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          padding: 2,
          backgroundColor: 'background.default',
        }}
      >
        <LayoutTypography color={"text.secondary"} variant={"body2"} text={`Material-UI ©${new Date().getFullYear()}`}/>
      </Box>
    </>
  );
};

export default Apps;
