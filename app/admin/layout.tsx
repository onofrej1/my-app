'use client';
import { Box, IconButton, Stack, Toolbar } from '@mui/material';
import { AppBar } from 'components/layout/Appbar';
import { Drawer } from 'components/layout/Drawer';
import Sidebar from 'components/layout/Sidebar';
import React from 'react';

interface IProps {
  children: any;
}
const Layout: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <div>
      <AppBar></AppBar>

      <Stack direction="row">
        <Drawer sx={{ height: '100vh' }} variant="permanent">
          <Toolbar />
          <Sidebar />
        </Drawer>

        <Box
          component="main"
          flexGrow={1}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
          }}>
          <Toolbar />
          <Box margin={3}>
            {children}
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default Layout;
