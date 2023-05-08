import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { Outlet } from 'react-router-dom';

const mdTheme = createTheme({});

const LoginLayout = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      {/*<Outlet />*/}
    </ThemeProvider>
  );
};

export default LoginLayout;
