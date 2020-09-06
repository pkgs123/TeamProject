import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from './AuthComponent/AuthAPI';
import {
    Paper, Table,
    TableHead, TableRow, TableCell,
    TableBody, TableContainer, TablePagination, Button, Grid, TextField, Box, Tooltip
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import CloseIcon from '@material-ui/icons/Close';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SaveIcon from '@material-ui/icons/Save';
import history from '../History';
import { connect } from 'react-redux';

import {
    getDeploymentRecords, deploymentRowTable, deploymentCreateRecords,
    confirmDialogValue, postNewDeploymentRecords,
    successErrorDialog, updateDeploymentRecord, downloadReport
} from '../Redux/Action/Action';

import AppBar from './AppBar';

import logo from '../Images/jio.png';
import createIcon from '../Images/createIcon.png';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Graph from '../Reusable/Graph';
import ConfirmationDialog from '../Reusable/ConfirmationBox';
import SuccessErrorDialog from '../Reusable/SuccessDialog';
import { indigo } from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const onNavBack = () => {
    history.push('/applist');
}
const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: '11%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    btnColor:{
        backgroundColor: 'Transparent',
        backgroundRepeat:'no-repeat',
        border: 'none',
        cursor:'pointer',
        overflow: 'hidden'        
    }

}))

const body = {
    display: "flex",
    flexDirection: "column"
}

function DeploymentReport(props) {
    let userName = JSON.parse(localStorage.getItem('token')).user.name.toLowerCase();
    const classes = useStyles();

    const { deploymentResult, getDeploymentRecords, downloadExcelContent } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [compName, setComponentName] = useState('Deployment Report');

    const [edit, setEdit] = useState(false);
    const [create, setCreate] = useState(true);
    const [appNameValue, setAppNameValue] = useState('');
    const [featureValue, setFeatureValue] = useState(0);
    const [featureStatus, setFeatureStatus] = useState('');
    const [userStoryId, setUserStoryId] = useState(0);
    const [userStoryStatus, setUserStoryStatus] = useState('');
    const [taskId, setTaskId] = useState(0);
    const [taskIdStatus, setTaskIdStatus] = useState('');
    const [functional, setFunctional] = useState();
    const [developer, setDeveloper] = useState('');
    const [overAllStatus, setOverAllStatus] = useState('');
    const [releaseNumber, setReleaseNumber] = useState('');
    const [natureOfChange, setNatureOfChange] = useState('');
    const [uiArtifact, setUiArtifacts] = useState(0);
    const [apiArtifact, setApiArtifacts] = useState(0);
    const [data,setData] = useState(deploymentResult);
    const [query, setQueryText] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleAppNameChange = (ind, data, option) => {
        debugger;
        setAppNameValue(data['AppName'] = option.target.value.toUpperCase());
        //setFeatureValue(data['Feature'] = option.target.value)
    }

    const handleFeatureId = (ind, data, option) => {
        debugger;
        let featureId = Number(option.target.value);
        setFeatureValue(data['Feature'] = featureId);
    }

    const handleFeatureStatus = (ind, data, option) => {
        debugger;
        setFeatureStatus(data['FeatureStatus'] = option.target.value.toUpperCase())
    }
    const handleUserStoryId = (ind, data, option) => {
        debugger;
        setUserStoryId(data['UserStoryId'] = option.target.value)
    }
    const handleUserStoryStatus = (ind, data, option) => {
        debugger;
        setUserStoryStatus(data['UserStoryStatus'] = option.target.value.toUpperCase())
    }
    const handleTaskId = (ind, data, option) => {
        debugger;
        setTaskId(data['TaskId'] = option.target.value)
    }
    const handleTaskIdStatus = (ind, data, option) => {
        debugger;
        setTaskIdStatus(data['TaskIdStatus'] = option.target.value.toUpperCase())
    }
    const handleFunctional = (ind, data, option) => {
        debugger;
        setFunctional(data['Functional'] = option.target.value)
    }
    const handleDeveloper = (ind, data, option) => {
        debugger;
        setDeveloper(data['Developer'] = option.target.value)
    }
    const handleoverAllStatus = (ind, data, option) => {
        debugger;
        setOverAllStatus(data['overAllStatus'] = option.target.value)
    }
    const handleReleaseNumber = (ind, data, option) => {
        debugger;
        setReleaseNumber(data['ReleaseNumber'] = option.target.value.toUpperCase())
    }
    const handleNatureOfChange = (ind, data, option) => {
        debugger;
        setNatureOfChange(data['NatureOfChange'] = option.target.value)
    }
    const handleUiArtifacts = (ind, data, option) => {
        debugger;
        setUiArtifacts(data['UiArtifacts'] = option.target.value)
    }
    const handleApiArtifacts = (ind, data, option) => {
        debugger;
        setApiArtifacts(data['ApiArtifacts'] = option.target.value)
    }

    const handleEdit = (ind) => {
        debugger;
        props.deploymentRowTable(ind, true);

        setCreate(false);
        setEdit(!edit);
    }
    const handleDelete = (ind) => {
        debugger;
        props.confirmDialogValue(ind, true);
        //  deploymentResult.splice(ind,1);
        setCreate(!create)
    }
    const createNewRecord = () => {

        let emptyRowObj = {
            AppName: '', Feature: '', FeatureStatus: '', UserStoryId: null, UserStoryStatus: '', TaskId: null,
            TaskIdStatus: '', Functional: '', Developer: '', overAllStatus: '', ReleaseNumber: null, NatureOfChange: '',
            UiArtifacts: null, ApiArtifacts: null, edit: true, createIndicator: true
        }
        props.deploymentCreateRecords(emptyRowObj);

        setCreate(!create)
    }
    const handleSaveRecord = async (ind) => {

        let payload = {
            "AppName": appNameValue,
            "Feature": featureValue,
            "FeatureStatus": featureStatus,
            "UserStoryId": userStoryId,
            "UserStoryStatus": userStoryStatus,
            "TaskId": taskId,
            "TaskIdStatus": taskIdStatus,
            "Functional": functional,
            "Developer": developer,
            "overAllStatus": overAllStatus,
            "ReleaseNumber": releaseNumber,
            "NatureOfChange": natureOfChange,
            "UiArtifacts": uiArtifact,
            "ApiArtifacts": apiArtifact
        };
        // if(payload.AppName==="" || payload.Feature=== 0 || payload.FeatureStatus==="" || payload.UserStoryId===0 || payload.UserStoryStatus==="" || payload.TaskId===0 || payload.TaskIdStatus==="" || payload.Functional==="" || payload.Developer==="" || payload.overAllStatus==="" || payload.ReleaseNumber==="" || payload.NatureOfChange==="" || payload.UiArtifacts===0 || payload.ApiArtifacts===0){
        //  // props.deploymentRowTable(ind, true);
        //   props.postNewDeploymentRecords(payload);
        //   props.successErrorDialog(true);
        //   setCreate(!create)
        //   return;
        //   }

        //Update Functionality

        if (deploymentResult[ind].createIndicator === true) {
            props.postNewDeploymentRecords(payload);
            props.deploymentRowTable(ind, false);
            // props.getDeploymentRecords();
            props.successErrorDialog(true);
            setCreate(!create);
            return;
        }

        if (deploymentResult[ind].edit) {
            props.updateDeploymentRecord(deploymentResult[ind]);
            props.deploymentRowTable(ind, false);
            props.successErrorDialog(true);
            setCreate(!create);
            return
        }
    }
    useEffect(() => {
        if (isAuthenticated()) {
            props.getDeploymentRecords();
        }
        else {
            history.push('/');
        }


    }, [])

    const searchData = (option) =>{
        let queryText=option.target.value;
        var queryResult=[];
        deploymentResult.forEach(function(data){
          debugger;
        console.log("person ",data);
      if(data.AppName.indexOf(queryText)!=-1 || queryText === '')
        queryResult.push(data);
        console.log("query result ",queryResult);
         });
        debugger;
        console.log('Data',data);
        console.log('Query',query);
       setData(queryResult);
       setQueryText(queryText);
  
    }

    return (
        <div style={body}>
            <AppBar>
                <img alt="" src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '44%', fontStyle: "normal" }}>{compName}</h4>

                <span className={classes.search} style={{ marginLeft: '13%' }}>
                    {/* <div className={classes.search}> */}
                    <span className={classes.searchIcon}>
                        <SearchIcon />
                    </span>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={
                            option => searchData(option)
                        }
                    />
                </span>
                <Tooltip title="Excel">
                <span style={{ marginLeft: '3%' }}>
                        <ReactHTMLTableToExcel
                            className={classes.btnColor}
                            table="emp"
                            filename="ReportExcel"
                           // sheet="Sheet"
                            buttonText={<GetAppIcon style={{color:'white'}}/>}
                        >

                        </ReactHTMLTableToExcel>
                </span>
                </Tooltip>
                <span style={{ marginLeft: '3%' }}>
                    <Tooltip title="Back" placeholder="left-start">
                        <ArrowBackIcon style={{ marginLeft: '41%', backgroundColor: 'darksalmon',cursor:'pointer' }} onClick={onNavBack} />
                    </Tooltip>
                </span>


            </AppBar>
            <Paper>
                <TableContainer style={{ zoom: '75%', marginTop: '5%' }}>
                    <Table size="small" aria-label="a dense table" id="emp">
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
                                    {userName.includes("navdeep") && <Tooltip title="Create" placement="left-start">
                                        <AddRoundedIcon style={{ fontSize: 'xxx-large', marginLeft: '15%', color: 'white', backgroundColor: 'purple' }} onClick={() => createNewRecord()} />
                                    </Tooltip>}
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
                                                    data.edit ? <TextField value={data.AppName} onChange={
                                                        option => handleAppNameChange(ind, data, option)
                                                    } placeholder="AppName">
                                                    </TextField>
                                                        :
                                                        data.AppName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Feature} placeholder="Feature"
                                                        onChange={
                                                            option => handleFeatureId(ind, data, option)
                                                        }

                                                    >
                                                    </TextField>
                                                        :
                                                        data.Feature
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.FeatureStatus} placeholder="FeatureStatus"
                                                        onChange={
                                                            option => handleFeatureStatus(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.FeatureStatus

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryId} placeholder="UserStoryId"
                                                        onChange={
                                                            option => handleUserStoryId(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.UserStoryId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UserStoryStatus} placeholder="UserStoryStatus"
                                                        onChange={
                                                            option => handleUserStoryStatus(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.UserStoryStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskId} placeholder="TaskId"
                                                        onChange={
                                                            option => handleTaskId(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.TaskId
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.TaskIdStatus} placeholder="TaskIdStatus"
                                                        onChange={
                                                            option => handleTaskIdStatus(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.TaskIdStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Functional} placeholder="Functional"
                                                        onChange={
                                                            option => handleFunctional(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.Functional
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.Developer} placeholder="Developer"
                                                        onChange={
                                                            option => handleDeveloper(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.Developer
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.overAllStatus} placeholder="overAllStatus"
                                                        onChange={
                                                            option => handleoverAllStatus(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.overAllStatus
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ReleaseNumber} placeholder="ReleaseNumber"
                                                        onChange={
                                                            option => handleReleaseNumber(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.ReleaseNumber
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.NatureOfChange} placeholder="NatureOfChange"
                                                        onChange={
                                                            option => handleNatureOfChange(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.NatureOfChange
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.UiArtifacts} placeholder="UiArtifacts"
                                                        onChange={
                                                            option => handleUiArtifacts(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.UiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    data.edit ? <TextField value={data.ApiArtifacts} placeholder="ApiArtifacts"
                                                        onChange={
                                                            option => handleApiArtifacts(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.ApiArtifacts
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {userName.includes("navdeep") && <Box display="flex" flexDirection="row">

                                                    {!data.edit &&
                                                        <Tooltip title="Edit" placement="left-start">
                                                            <EditIcon style={{ marginRight: '10%', color: 'limegreen' }}
                                                                onClick={() => handleEdit((page * rowsPerPage) + ind)}></EditIcon>
                                                        </Tooltip>
                                                    }
                                                    {data.edit && <Tooltip title="Save" placement="left-start">
                                                        <SaveIcon style={{ color: 'darkorchid', marginRight: '10%' }} disabled onClick={() => handleSaveRecord((page * rowsPerPage) + ind)} />
                                                    </Tooltip>
                                                    }
                                                    <Tooltip title="Cancel" placement="left-start">
                                                        <HighlightOffIcon style={{ marginRight: '5%', color: 'red' }} onClick={() => handleDelete((page * rowsPerPage) + ind)}></HighlightOffIcon>
                                                    </Tooltip>
                                                </Box>}
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
                // ActionsComponent={}
                />

            </Paper>
            <br />
            <Paper style={{ background: "transparent", backgroundColor: 'lightgray' }}>
                <b style={{ marginLeft: '5%', fontFamily: 'monospace', fontSize: 'xx-large' }}>Graphical Report:</b><br />
                <Graph />
            </Paper>
            <ConfirmationDialog />
            <SuccessErrorDialog />


        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        deploymentResult: state.Reducer.deploymentRecords,
        downloadExcelContent: state.Reducer.downloadData
    }
}

const mapDispatchToProps = {
    getDeploymentRecords, deploymentRowTable, postNewDeploymentRecords,
    deploymentCreateRecords, confirmDialogValue,
    successErrorDialog, updateDeploymentRecord, downloadReport
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentReport);