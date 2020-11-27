import { Box, Button, Paper } from '@material-ui/core';
import { Fragment, useState } from 'react';

import AddressList from './AddressList';
import Header from './Header';

export default function AddressManager(props) {
  const [addresses, setAddresses] = useState();

  return (
    <Fragment>
      <Header text="Address Manager" />
      <Paper variant="outlined" square>
        <Box align="center">
          <AddressList
            addresses={addresses}
            setAddresses={setAddresses} />
        </Box>
      </Paper>
      <Box align="center" py={2}>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </Box>
      <Box align="center" pb={2}>
        <Button variant="contained" disableElevation onClick={() => { document.location.search = 'swagger'; }}>Swagger API Documentation</Button>
      </Box>
    </Fragment>
  );
}
