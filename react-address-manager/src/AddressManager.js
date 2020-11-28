import { Box, Button, Paper } from '@material-ui/core';
import { Fragment, useState } from 'react';

import AddressList from './AddressList';
import config from './config';
import Header from './Header';
import { useDebounce } from './utils';

export default function AddressManager(props) {
  const [addresses, setAddresses] = useState();
  const [runSeedersDate, setRunSeedersDate] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1E3);

  const runSeeders = () => {
    fetch(`${config.API_URL}/seed`)
      .then(
        result => {
          setRunSeedersDate(new Date());
        },
        error => {
          console.error(error);
        }
      );
  };

  return (
    <Fragment>
      <Header text="Address Manager" setSearchTerm={setSearchTerm} />
      <Paper variant="outlined" square>
        <Box align="center">
          <AddressList
            addresses={addresses}
            setAddresses={setAddresses}
            runSeedersDate={runSeedersDate}
            searchTerm={debouncedSearchTerm} />
        </Box>
      </Paper>
      <Box align="center" py={2}>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </Box>
      <Box align="center" pb={2}>
        <Button variant="contained" disableElevation onClick={() => { document.location.search = 'swagger'; }}>Swagger API Documentation</Button>
      </Box>
      <Box align="center" pb={2}>
        <Button variant="contained" disableElevation onClick={runSeeders}>Run Seeders</Button>
      </Box>
    </Fragment>
  );
}
