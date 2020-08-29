import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { postNewDeploymentRecords, successErrorDialog } from '../Redux/Action/Action';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SuccessDialog(props) {
  debugger;
  const classes = useStyles();
  const { postMessage, successErrorDialogOpen } = props;

  let postMsgDisplay='';

 if(props.postMessage.status === 201) {
    postMsgDisplay = [postMessage.data];
    console.log(postMsgDisplay);
  }
  else if((postMessage.length === undefined) && (props.postMessage.response.status === 400)) {
    postMsgDisplay = postMessage.response.data.message;
    console.log(postMsgDisplay);
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    props.successErrorDialog(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={successErrorDialogOpen} autoHideDuration={6000} onClose={handleClose}>
        {
          Array.isArray(postMsgDisplay) ? <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            {postMsgDisplay[0]}
          </MuiAlert> :
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
              {postMsgDisplay}
            </MuiAlert>
        }
      </Snackbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    postMessage: state.Reducer.deploymentPostResponse,
    successErrorDialogOpen: state.Reducer.successErrorDialogValue
  }
}

const mapDispatchToProps = {
  postNewDeploymentRecords, successErrorDialog
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessDialog);
