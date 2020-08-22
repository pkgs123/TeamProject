import React, { useEffect, useState } from 'react';
import {
    Grid, Paper, Typography, Table,
    TableHead, TableRow, TableCell,
    TableBody, Button, TableContainer, TablePagination
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import footer from './Footer';
import history from '../History';
import { connect } from 'react-redux';

import { getDeploymentRecords } from '../Redux/Action/Action';
import AppBar from './AppBar';
import Footer from './Footer';
import logo from '../Images/jio.png';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const onNavBack = () => {
    history.push('/');
}


function DeploymentReport(props) {
    const { deploymentResult } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [compName, setComponentName] = useState('Deployment Report');
    const [rowData, setRowData] = useState();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

     const handleEdit = (ind)=>{
        debugger;
        setRowData([deploymentResult[ind]]);
     }   
     const handleDelete = (ind) =>{
            debugger;
     }
    useEffect(() => {
        props.getDeploymentRecords();
    }, [])

    return (
        <>
            <AppBar>
                <img alt="" src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '44%', fontStyle: "normal" }}>{compName}</h4>
                <CloseIcon style={{ marginLeft: '40%', backgroundColor: 'darksalmon' }} onClick={onNavBack} />
            </AppBar>
            <Paper>
            <TableContainer  style={{ zoom: '75%', marginTop: '5%' }}>
                <Table size="small" aria-label="a dense table" >
                    <TableHead style={{backgroundColor:'whitesmoke',fontSize:'medium'}}>
                        <TableRow>
                            <TableCell style={{fontWeight:'800'}}>Sr.No.</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Application Name</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Feature</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Feature Status</TableCell>
                            <TableCell style={{fontWeight:'800'}}>UserStory Id</TableCell>
                            <TableCell style={{fontWeight:'800'}}>UserStory Status</TableCell>
                            <TableCell style={{fontWeight:'800'}}>TaskId</TableCell>
                            <TableCell style={{fontWeight:'800'}}>TaskId Status</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Functional</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Developer</TableCell>
                            <TableCell style={{fontWeight:'800'}}>OverAllStatus</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Release Number</TableCell>
                            <TableCell style={{fontWeight:'800'}}>Nature of Change</TableCell>
                            <TableCell style={{fontWeight:'800'}}>UI-Artifacts</TableCell>
                            <TableCell style={{fontWeight:'800'}}>API-Artifacts</TableCell>
                            <TableCell style={{fontWeight:'800'}}></TableCell>
                            <TableCell style={{fontWeight:'800'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(Array.isArray(deploymentResult) && deploymentResult.length > 0) &&

                            deploymentResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, ind) => {
                                return <>
                                    <TableRow>
                                        <TableCell>
                                            {(page * rowsPerPage)+(ind+ 1)}
                                        </TableCell>
                                        <TableCell>
                                            {data.AppName}
                                        </TableCell>
                                        <TableCell>
                                            {data.Feature}
                                        </TableCell>
                                        <TableCell>
                                            {data.FeatureStatus}
                                        </TableCell>
                                        <TableCell>
                                            {data.UserStoryId}
                                        </TableCell>
                                        <TableCell>
                                            {data.UserStoryStatus}
                                        </TableCell>
                                        <TableCell>
                                            {data.TaskId}
                                        </TableCell>
                                        <TableCell>
                                            {data.TaskIdStatus}
                                        </TableCell>
                                        <TableCell>
                                            {data.Functional}
                                        </TableCell>
                                        <TableCell>
                                            {data.Developer}
                                        </TableCell>
                                        <TableCell>
                                            {data.overAllStatus}
                                        </TableCell>
                                        <TableCell>
                                            {data.ReleaseNumber}
                                        </TableCell>
                                        <TableCell>
                                            {data.NatureOfChange}
                                        </TableCell>
                                        <TableCell>
                                            {data.UiArtifacts}
                                        </TableCell>
                                        <TableCell>
                                            {data.ApiArtifacts}
                                        </TableCell>
                                        <TableCell>
                                        <EditIcon
                                         onClick={() => handleEdit((page * rowsPerPage)+ind)}></EditIcon>
                                        </TableCell>
                                        <TableCell>
                                        <HighlightOffIcon onClick={()=>handleDelete((page * rowsPerPage)+ind)}></HighlightOffIcon>
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
    getDeploymentRecords
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentReport);