import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, List, ListItem, ListItemText, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment, useEffect, useState } from 'react';

import AddressList from './AddressList';
import config from './config';
import Header from './Header';
import { useDebounce } from './utils';

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
  },
  delete: {
    color: theme.palette.error.dark,
  },
}));

export default function AddressManager(props) {
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({});
  const [addressFormErrors, setAddressFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openOptionsDialog, setOpenOptionsDialog] = useState(false);
  const [runSeedersDate, setRunSeedersDate] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1E3);
  const classes = useStyles();

  useEffect(() => {
    setOpenOptionsDialog(!!address && !openAddressDialog);
  }, [address, openAddressDialog]);

  const handleAddressChange = e => {
    setAddressForm({ ...addressForm, [e.target.id]: e.target.value });
    setAddressFormErrors([]);
  };

  const handleAddressClose = () => {
    setAddress();
    setAddressForm({});
    setAddressFormErrors([]);
    setOpenAddressDialog(false);
  };

  const handleAddSave = () => {
    if (Object.keys(addressForm).length === 0) {
      return handleAddressClose();
    }
    setIsLoading(true);
    fetch(`${config.API_URL}/addresses`, {
      body: JSON.stringify(addressForm),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(result => result.json().then(json => {
        if (!result.ok) {
          setAddressFormErrors(json);
          setIsLoading(false);
          return;
        }
        handleAddressClose();
        setIsLoading(false);
        setRunSeedersDate(new Date());
      }))
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleEditSave = () => {
    if (Object.keys(addressForm).length === 0) {
      return handleAddressClose();
    }
    setIsLoading(true);
    fetch(`${config.API_URL}/addresses/${address.id}`, {
      body: JSON.stringify(addressForm),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then(result => result.json().then(json => {
        if (!result.ok) {
          setAddressFormErrors(json);
          setIsLoading(false);
          return;
        }
        handleAddressClose();
        setIsLoading(false);
        setRunSeedersDate(new Date());
      }))
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

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
      <Header text="Address Manager" setSearchTerm={setSearchTerm} setOpenAddressDialog={setOpenAddressDialog} />
      <Paper variant="outlined" square>
        <Box align="center">
          <AddressList
            addresses={addresses}
            runSeedersDate={runSeedersDate}
            searchTerm={debouncedSearchTerm}
            setAddress={setAddress}
            setAddresses={setAddresses} />
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
      <Dialog open={openOptionsDialog} onClose={() => setAddress()}>
        <List>
          <ListItem button onClick={() => {
            setOpenOptionsDialog(false);
            setOpenAddressDialog(true);
          }}>
            <ListItemText primary="Edit" />
          </ListItem>
          <ListItem button onClick={() => {
            setOpenOptionsDialog(false);
            setIsLoading(true);
            fetch(`${config.API_URL}/addresses/${address.id}`, {
              method: 'DELETE',
            })
              .then(
                result => {
                  setIsLoading(false);
                  setRunSeedersDate(new Date());
                },
                error => {
                  setIsLoading(false);
                  console.error(error);
                }
              );
          }}>
            <ListItemText primary="Delete" className={classes.delete} />
          </ListItem>
        </List>
      </Dialog>
      <Dialog open={openAddressDialog} onClose={handleAddressClose}>
        <DialogTitle>{address ? 'Edit' : 'Add'} Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {address ? 'Edit' : 'Add'} Address
          </DialogContentText>
          <TextField
            defaultValue={address && address.line1}
            fullWidth
            id="line1"
            label="Line 1"
            margin="dense"
            onChange={handleAddressChange}
          />
          <TextField
            defaultValue={address && address.line2}
            fullWidth
            id="line2"
            label="Line 2"
            margin="dense"
            onChange={handleAddressChange}
          />
          <TextField
            defaultValue={address && address.city}
            fullWidth
            id="city"
            label="City"
            margin="dense"
            onChange={handleAddressChange}
          />
          <TextField
            defaultValue={address && address.state}
            fullWidth
            id="state"
            label="State"
            margin="dense"
            onChange={handleAddressChange}
          />
          <TextField
            defaultValue={address && address.zip}
            fullWidth
            id="zip"
            label="Zip"
            margin="dense"
            onChange={handleAddressChange}
          />
          {addressFormErrors.length > 0 && (
            <FormHelperText error margin="dense">
              {addressFormErrors[0]}
            </FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddressClose} color="primary">
            Cancel
          </Button>
          <Button onClick={address ? handleEditSave : handleAddSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
