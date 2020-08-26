import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Draggable from 'react-draggable';
import CheckIcon from '@material-ui/icons/Check';
import BackspaceIcon from '@material-ui/icons/Backspace';
import{ Dialog, DialogTitle, DialogContent, DialogContentText,DialogActions,Button,Grid, Box, Tooltip } from '@material-ui/core';
import {getDeploymentRecords,confirmDialogValue} from '../Redux/Action/Action'
function ConfirmationBox(props){
const {deploymentResult,confirmDialogResult} = props;
const [dialogTitle,setDialogTitle] = useState('Confirm');
const [open,setOpen] = useState(true);

const handleClose = () =>{
    props.confirmDialogValue(0,false);
}
const handleCloseOk = () =>{
   deploymentResult.splice(confirmDialogResult.rowDeleteIndex,1);
   props.confirmDialogValue(0,false);
   //props.getDeploymentRecords();
  setOpen(false);
}
useEffect(()=>{
 
},[])

    return(
        <>
           <Dialog  open={confirmDialogResult.dialogOpenValue} onClose={handleClose} style={{marginBottom:'15%'}}>
               <DialogContent style={{color:'darkblue'}}>
                  <Box>
                  Are you sure you want to delete this row?
                  <br/>
                  <Tooltip title="Cancel" placeholder="left-start">
                  <BackspaceIcon style={{marginLeft:'30%', marginTop: '4%',color:'red'}} onClick={handleClose}/>
                  </Tooltip>
                  <Tooltip title="Ok" placeholder="left-start">
                   <CheckIcon style={{marginLeft:'22%',color:'limegreen'}} onClick={handleCloseOk }/>
                   </Tooltip>
                      </Box> 
               </DialogContent>
               </Dialog> 
             
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        deploymentResult: state.Reducer.deploymentRecords,
        confirmDialogResult: state.Reducer.confirmDialogOptions
    }
}

const mapDispatchToProps = {
    getDeploymentRecords,confirmDialogValue
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmationBox);