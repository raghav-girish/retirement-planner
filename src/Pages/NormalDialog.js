import React from 'react';

//Material ui components import section
import {Dialog} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


//Other installed components
import { withSnackbar } from 'notistack';

const styles = theme => ({
  
});

class NormalDialog extends React.Component {
    

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={() => this.props.onClose()}
                fullWidth={true}
            >
                {this.props.component}
            </Dialog>
        )
    }
}

export default withStyles(styles)(withSnackbar(NormalDialog));
