import React, { useEffect, useState } from 'react';
import {
    Paper, Table,
    TableHead, TableRow, TableCell,
    TableBody, TableContainer, TablePagination, Button, Grid, TextField, Box, Tooltip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SaveIcon from '@material-ui/icons/Save';
import history from '../History';
import { connect } from 'react-redux';

import { getDeploymentRecords, deploymentRowTable, deploymentCreateRecords,confirmDialogValue } from '../Redux/Action/Action';

import AppBar from './AppBar';

import logo from '../Images/jio.png';
import createIcon from '../Images/createIcon.png';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ConfirmationDialog from '../Reusable/ConfirmationBox';
const onNavBack = () => {
    history.push('/');
}

function DeploymentReport(props) {
    const { deploymentResult, getDeploymentRecords } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [compName, setComponentName] = useState('Deployment Report');

    const [edit, setEdit] = useState(false);
    const [create,setCreate] = useState(true);
 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAppNameChange = (event) => {
        debugger;
    }
    const handleEdit = (ind) => {
        debugger;
        props.deploymentRowTable(ind, true);
        setEdit(!edit);
    }
    const handleDelete = (ind) => {
        debugger;
        props.confirmDialogValue(ind,true);
     //  deploymentResult.splice(ind,1);
       setCreate(!create)
        
    }
    const createNewRecord = () =>{

        let emptyRowObj={
            AppName:'',Feature:'',FeatureStatus:'',UserStoryId:null,UserStoryStatus:'',TaskId:null,
            TaskIdStatus:'',Functional:'',Developer:'',overAllStatus:'',ReleaseNumber:null,NatureOfChange:'',
            UiArtifacts:null,ApiArtifacts:null,edit:true
        }
        props.deploymentCreateRecords(emptyRowObj);
        setCreate(!create)
    }
    const handleSaveRecord =(ind) =>{
        props.deploymentRowTable(ind, false);
        setCreate(!create)
    }
    useEffect(() => {
        props.getDeploymentRecords();
    }, [])
    return (
        <>
            <AppBar>
                <img alt="" src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '44%', fontStyle: "normal" }}>{compName}</h4>
                {/* <Button style={{color:"white",backgroundColor:"blueviolet",marginLeft:'40%'}}>Create</Button> */}
                <Tooltip title="Cancel" placeholder="left-start"> 
                <CloseIcon style={{ marginLeft: '40%', backgroundColor: 'darksalmon' }} onClick={onNavBack} />
                </Tooltip>
            </AppBar>
            <Paper>
                <TableContainer style={{ zoom: '75%', marginTop: '5%' }}>
                    <Table size="small" aria-label="a dense table" >
                        <TableHead style={{ backgroundColor: 'whitesmoke', fontSize: 'medium' }}>
                            <TableRow>
                                <TableCell style={{ fontWeight: '800' }}>Sr.No.</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Application Name</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Feature</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Feature Status</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>UserStory Id</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>UserStory Status</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>TaskId</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>TaskId Status</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Functional</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Developer</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>OverAllStatus</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Release Number</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>Nature of Change</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>UI-Artifacts</TableCell>
                                <TableCell style={{ fontWeight: '800' }}>API-Artifacts</TableCell>
                                <TableCell>
                                <Tooltip title="Create" placement="left-start">
                                    <AddRoundedIcon style={{fontSize:'xxx-large',marginLeft:'15%',color:'white',backgroundColor:'purple'}} onClick={()=>createNewRecord()}/>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(Array.isArray(deploymentResult) && deploymentResult.length > 0) &&

                                deploymentResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, ind) => {
                                    return <>
                                        <TableRow>
                                            <TableCell >
                                                {(page * rowsPerPage) + (ind + 1)}
                                            </TableCell>
                                            <TableCell >
                                                {
                                                    data.edit ? <TextField value={data.AppName} onChange={handleAppNameChange} placeholder="AppName">
                                                    </TextField>
                                                        :
                                                        data.AppName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Feature} placeholder="Feature">
                                                    </TextField>
                                                        :
                                                        data.Feature
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Feature} placeholder="FeatureStatus" >
                                                    </TextField>
                                                        :
                                                        data.FeatureStatus

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryId} placeholder="UserStoryId">
                                                    </TextField>
                                                        :
                                                        data.UserStoryId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryStatus} placeholder="UserStoryStatus">
                                                    </TextField>
                                                        :
                                                        data.UserStoryStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskId} placeholder="TaskId">
                                                    </TextField>
                                                        :
                                                        data.TaskId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskIdStatus} placeholder="TaskIdStatus">
                                                    </TextField>
                                                        :
                                                        data.TaskIdStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Functional} placeholder="Functional">
                                                    </TextField>
                                                        :
                                                        data.Functional
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Developer} placeholder="Developer">
                                                    </TextField>
                                                        :
                                                        data.Developer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.overAllStatus} placeholder="overAllStatus">
                                                    </TextField>
                                                        :
                                                        data.overAllStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ReleaseNumber} placeholder="ReleaseNumber">
                                                    </TextField>
                                                        :
                                                        data.ReleaseNumber
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.NatureOfChange} placeholder="NatureOfChange">
                                                    </TextField>
                                                        :
                                                        data.NatureOfChange
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UiArtifacts} placeholder="UiArtifacts">
                                                    </TextField>
                                                        :
                                                        data.UiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ApiArtifacts} placeholder="ApiArtifacts">
                                                    </TextField>
                                                        :
                                                        data.ApiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" flexDirection="row">
                                               
                                               {create && 
                                                <Tooltip title="Edit" placement="left-start">
                                               <EditIcon style={{marginRight:'10%',color:'limegreen'}}
                                                    onClick={() => handleEdit((page * rowsPerPage) + ind)}></EditIcon>
                                                    </Tooltip>
                                                   }
                                                <Tooltip title="Save" placement="left-start">
                                                <SaveIcon style={{color:'darkorchid',marginRight:'10%'}} onClick={()=>handleSaveRecord((page * rowsPerPage) + ind)}/>
                                                </Tooltip>

                                                <Tooltip title="Cancel" placement="left-start">
                                                <HighlightOffIcon style={{marginRight:'5%',color:'red'}} onClick={() => handleDelete((page * rowsPerPage) + ind)}></HighlightOffIcon>
                                                </Tooltip> 
                                                  </Box>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={deploymentResult.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              
            </Paper>
            {/* <Footer>
 
            </Footer> */}
              <ConfirmationDialog />
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        deploymentResult: state.Reducer.deploymentRecords
    }
}

const mapDispatchToProps = {
    getDeploymentRecords, deploymentRowTable,
    deploymentCreateRecords,confirmDialogValue
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentReport);