'use client';

import { Box, IconButton, Stack, Toolbar } from '@mui/material';
import { AppBar } from 'components/layout/Appbar';
import { Drawer } from 'components/layout/Drawer';
import Sidebar from 'components/layout/Sidebar';
//import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
//import { useAuth } from 'context/auth.context';
//import tokenService from 'services/token.service';

interface IProps {
  children: any;
}
const Layout: React.FC<IProps> = (props) => {
  //const navigate = useNavigate();
  //const authContext = useAuth();
  const { children } = props;
  //const mediaQuery = useMediaQuery('(max-width: 900px)');
  //const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    //setOpen(!open);
  };
  //const user = authContext.user;

  /*useEffect(() => {
    setOpen(!mediaQuery);
  }, [mediaQuery]);*/

  //if (!user) {
  //  tokenService.clearTokens();
  //  return <Navigate to="/login" />;
  //}

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
