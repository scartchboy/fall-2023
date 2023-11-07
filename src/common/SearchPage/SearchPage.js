import React from 'react';
import { Box, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '40px',
      boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.2)',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '24px'
    },
    searchButton: {
      padding: '10px',
    },
  }));
  
  function SearchPage() {
    const classes = useStyles();
  
    return (
      <Box className={classes.root}>
        <Paper className={classes.searchContainer}>
          <InputBase
            className={classes.input}
            placeholder="Search Here..."
            inputProps={{ 'aria-label': 'search here....' }}
          />
          <IconButton className={classes.searchButton} color="primary">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    );
  }
  
  export default SearchPage;
  