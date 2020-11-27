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
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addresses, setAddresses] = useState(props.addresses || []);
  const { setAddresses: propsSetAddresses } = props;

  useEffect(() => {
    fetch(`${config.API_URL}/addresses`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setAddresses(result);
          propsSetAddresses(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [propsSetAddresses]);

  if (addresses.length) {
    return (
      <List disablePadding>
        {addresses.map(address => (
          <ListItem divider key={address.id} className={classes.listItem}>
            <ListItemText primary={[
              address.line1,
              address.line2,
              address.city,
              `${address.state} ${address.zip}`,
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
