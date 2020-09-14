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
  const { postMessage, successErrorDialogOpen,updateResponseResult,deleteResponseResult,confirmDialog} = props;
  console.log("updateResponseResult",updateResponseResult);
  let postMsgDisplay='';

 if(props.postMessage.status === 201 || props.updateResponseResult.status === 200 || props.deleteResponseResult.status === 200) {
   
  if(postMessage.length !== 0){
    postMsgDisplay = [postMessage.data];
    console.log(postMsgDisplay);
   }
   else if(updateResponseResult.length !== 0 && confirmDialog.rowDeleteIndex===null){
    postMsgDisplay = [updateResponseResult.data];
    console.log(postMsgDisplay);
   }
   else if(deleteResponseResult.length!== 0 && confirmDialog.rowDeleteIndex !==null){
    postMsgDisplay = [deleteResponseResult.data];
    console.log(postMsgDisplay);
   }

  }
  else if(props.postMessage.status === 200){
    postMsgDisplay = postMessage.data.message;
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
    successErrorDialogOpen: state.Reducer.successErrorDialogValue,
    updateResponseResult: state.Reducer.updateResponse,
    deleteResponseResult: state.Reducer.deleteResponse,
    confirmDialog: state.Reducer.confirmDialogOptions
  }
}

const mapDispatchToProps = {
  postNewDeploymentRecords, successErrorDialog
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessDialog);
