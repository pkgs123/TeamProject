import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import history from '../History';

function CancelBtn(props){

    const onNavBack = () => {
        history.push('/applist');
    }
    
    return(
        <>
         <CloseIcon style={{ marginLeft: '98%', backgroundColor: 'darksalmon' }} onClick={onNavBack} />
        </>
    )
}
export default CancelBtn;