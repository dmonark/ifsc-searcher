import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function ButtonAppBar() {
  return (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    IFSC Searcher
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
  );
}


export default ButtonAppBar;