import { cyan, orange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

export default function AppTheme(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <props.app />
    </ThemeProvider>
  );
}
