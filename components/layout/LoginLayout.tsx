import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme({});

const LoginLayout = () => {
  return (
    <ThemeProvider theme={mdTheme}>

    </ThemeProvider>
  );
};

export default LoginLayout;
