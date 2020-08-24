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

import { getDeploymentRecords, deploymentRowTable } from '../Redux/Action/Action';

import AppBar from './AppBar';

import logo from '../Images/jio.png';
import createIcon from '../Images/createIcon.png';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const onNavBack = () => {
    history.push('/');
}

function DeploymentReport(props) {
    const { deploymentResult, getDeploymentRecords } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [compName, setComponentName] = useState('Deployment Report');

    const [edit, setEdit] = useState(false);
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
    }
    const createNewRecord = () =>{
        debugger;
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
                                                    data.edit ? <TextField value={data.AppName} onChange={handleAppNameChange}>
                                                    </TextField>
                                                        :
                                                        data.AppName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Feature} >
                                                    </TextField>
                                                        :
                                                        data.Feature
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Feature} >
                                                    </TextField>
                                                        :
                                                        data.FeatureStatus

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryId} >
                                                    </TextField>
                                                        :
                                                        data.UserStoryId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryStatus} >
                                                    </TextField>
                                                        :
                                                        data.UserStoryStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskId} >
                                                    </TextField>
                                                        :
                                                        data.TaskId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskIdStatus} >
                                                    </TextField>
                                                        :
                                                        data.TaskIdStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Functional} >
                                                    </TextField>
                                                        :
                                                        data.Functional
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Developer} >
                                                    </TextField>
                                                        :
                                                        data.Developer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.overAllStatus} >
                                                    </TextField>
                                                        :
                                                        data.overAllStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ReleaseNumber} >
                                                    </TextField>
                                                        :
                                                        data.ReleaseNumber
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.NatureOfChange} >
                                                    </TextField>
                                                        :
                                                        data.NatureOfChange
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UiArtifacts} >
                                                    </TextField>
                                                        :
                                                        data.UiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ApiArtifacts} >
                                                    </TextField>
                                                        :
                                                        data.ApiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" flexDirection="row">
                                                <Tooltip title="Edit" placement="left-start">
                                                <EditIcon style={{marginRight:'5%',color:'limegreen'}}
                                                    onClick={() => handleEdit((page * rowsPerPage) + ind)}></EditIcon>
                                                  </Tooltip>
                                                  <Tooltip title="Cancel" placement="left-start">
                                                <HighlightOffIcon style={{marginRight:'5%',color:'red'}} onClick={() => handleDelete((page * rowsPerPage) + ind)}></HighlightOffIcon>
                                                </Tooltip> 
                                                <Tooltip title="Save" placement="left-start">
                                                <SaveIcon style={{color:'darkorchid'}}/>
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
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        deploymentResult: state.Reducer.deploymentRecords
    }
}

const mapDispatchToProps = {
    getDeploymentRecords, deploymentRowTable
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentReport);