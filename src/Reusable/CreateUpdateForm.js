import React, { useState } from 'react';
import{ Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';

function CreateUpdateForm(props){

const [dialogTitle,changeDialogTitle] = useState('Create Deployment Report');
const [open,setOpen] = useState(true);

const handleClose = () =>{
    setOpen(false);
}

    return(
        <>
           <Dialog style={{cursor:'move'}} open={open} onClose={handleClose}>
               <DialogTitle>
                  {dialogTitle}  
               </DialogTitle>
               <DialogContent>
                  <Grid container>
                      <Grid item xs={6} sm={6} md={6} md={6} lg={6}>
                        <input type="text" value={abc}></input>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} md={6} lg={6}>
                      <input type="text" value={abc}></input>
                          </Grid>
                      </Grid> 
               </DialogContent>
               </Dialog> 
        </>
    )
}
export default CreateUpdateForm;