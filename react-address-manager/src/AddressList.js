import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import config from './config';

const useStyles = makeStyles(theme => ({
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function AddressList(props) {
  const { runSeedersDate, searchTerm, setAddresses } = props;
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const params = {};
    if (searchTerm) {
      params.search = searchTerm;
    }
    const query = new URLSearchParams(params).toString();
    const urlParts = [`${config.API_URL}/addresses`, query].filter(part => part);
    fetch(urlParts.join('?'))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setAddresses(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [runSeedersDate, searchTerm, setAddresses]);

  if (props.addresses.length) {
    return (
      <List disablePadding>
        {props.addresses.map(address => (
          <ListItem divider key={address.id} className={classes.listItem} onClick={() => {
            props.setAddress(address);
          }}>
            <ListItemText primary={[
              address.line1,
              address.line2,
              address.city,
              `${address.state} ${address.zip}`,
              address.country,
            ].filter(item => item).join(', ')} align="center" />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Box py={2}>
      <Typography>
        {
          error
            ? 'Error Loading Addresses'
            : !isLoaded
              ? 'Loading Addresses...'
              : 'No Addresses Exist'
        }
      </Typography>
    </Box>
  );
}
