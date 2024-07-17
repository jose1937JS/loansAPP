import React from 'react';
import Router from './src/router';
import dayjs from 'dayjs';
import localizedFormat from "dayjs/plugin/localizedFormat";
require('dayjs/locale/es')

dayjs.extend(localizedFormat);
dayjs.locale('es') // use locale globally

function App(): React.JSX.Element {
  return (
    <Router />
  );
}

export default App;
