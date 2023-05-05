import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icons from "../UI/Icons";
import cl from './style/Envelope.module.scss';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Envelope = () => {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 550 }}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <List>
            {generate(
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="primary">
                    <Icons.FolderIcon />
                  </IconButton>
                }
                className={cl.listItem}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" className={cl.listItemText}>Envelope</Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Envelope;