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
import PublishIcon from '@material-ui/icons/Publish';
import { Upload } from 'antd';
import {DropzoneArea,DropzoneDialog} from 'material-ui-dropzone'
// import {DropzoneDialog} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ExcelRenderer } from "react-excel-renderer";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SaveIcon from '@material-ui/icons/Save';
import history from '../History';
import { connect } from 'react-redux';

import {
    getDeploymentRecords, getDeploymentRecordsCopy,deploymentRowTable, deploymentCreateRecords,
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
    const customColumnStyle = {padding:'2px 2px 2px 2px',textAlign:'center',fontWeight:800};
    const tableCellCss = {padding:'2px 2px 2px 2px', textAlign:'center'};
    let userName = JSON.parse(localStorage.getItem('token')).user.name.toLowerCase();
    const classes = useStyles();

    const { deploymentResult, deploymentResultCopy,getDeploymentRecords, downloadExcelContent } = props;

    props.getDeploymentRecordsCopy(deploymentResult);

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
    const [appGroup,setAppGroup] = useState('');
    const [devId,setDevId] = useState('');
    const [data,setData] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');
    const [open,setOpen] = useState(false);
    const [files,setFiles] = useState([]);
    const [query, setQueryText] = useState('');
    console.log("RealData",data);
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
        setFunctional(data['Functional'] = option.target.value.toUpperCase())
    }
    const handleDeveloper = (ind, data, option) => {
        debugger;
        setDeveloper(data['Developer'] = option.target.value.toUpperCase())
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
    const handleDevIdChange = (ind,data,option) =>{
        debugger;
        setDevId(data['DevId'] = option.target.value.toUpperCase())
    }
    const handleAppGroupChange = (ind,data,option) =>{
        debugger;
        setAppGroup(data['AppGroup'] = option.target.value.toUpperCase())
    }

    const handleEdit = (ind) => {
        debugger;
        props.confirmDialogValue(null, false);
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

    // File Upload
    const fileHandler = (fileList) => {
        debugger;
        console.log("fileList", fileList);
        let fileObj = fileList[0];
        if (!fileObj) {
        setErrorMessage("No file uploaded!");
          return false;
        }
        console.log("fileObj.type:", fileObj.type);
        if (
          !(
            fileObj.type === "application/vnd.ms-excel" ||
            fileObj.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          )
        ) {
        setErrorMessage("Unknown file format. Only Excel files are uploaded!");
          return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, async(err, resp) => {
          if (err) {
            console.log(err);
          } else {
            let newRows = [];
            resp.rows.slice(1).map((row, index) => {
              if (row && row !== "undefined") {
                newRows.push({
                "AppName": row[1],
                "AppGroup":row[2],
                "Feature": row[3],
                "FeatureStatus": row[4],
                "UserStoryId": row[5],
                "UserStoryStatus": row[6],
                "TaskId": row[7],
                "TaskIdStatus": row[8],
                "Functional": row[9],
                "Developer": row[10],
                "overAllStatus": row[11],
                "ReleaseNumber": row[12],
                "NatureOfChange": row[13],
                "UiArtifacts": row[14],
                "ApiArtifacts": row[15],
                "DevId":row[16]
                });
              }
            });
            if (newRows.length === 0) {
            setErrorMessage("No data found in file!");
              return false;
            } else {
                await props.postNewDeploymentRecords(newRows);
               // props.deploymentRowTable(ind, false);
                props.successErrorDialog(true);
                props.getDeploymentRecords();
                setErrorMessage(null)
                setOpen(false);
                setFiles(newRows);
            }
          }
        });
        return false;
      };

    const createNewRecord = () => {

        let emptyRowObj = {
            AppName: '', AppGroup:'',Feature: '', FeatureStatus: '', UserStoryId: null, UserStoryStatus: '', TaskId: null,
            TaskIdStatus: '', Functional: '', Developer: '', overAllStatus: '', ReleaseNumber: null, NatureOfChange: '',
            UiArtifacts: null, ApiArtifacts: null, DevId:'',edit: true, createIndicator: true
        }
        props.deploymentCreateRecords(emptyRowObj);

        setCreate(!create)
    }
    const handleSaveRecord = async (ind) => {

        let payload = {
            "AppName": appNameValue,
            "AppGroup":appGroup,
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
            "ApiArtifacts": apiArtifact,
            "DevId":devId
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
            await props.postNewDeploymentRecords(payload);
            props.deploymentRowTable(ind, false);
            props.successErrorDialog(true);
            props.getDeploymentRecords();
            setCreate(!create);
            return;
        }

        if (deploymentResult[ind].edit) {
            await props.updateDeploymentRecord(deploymentResult[ind]);
            props.deploymentRowTable(ind, false);
            props.successErrorDialog(true);
            props.getDeploymentRecords();
            setCreate(!create);
            return
        }
    } 
   
        useEffect( () => {
        if (isAuthenticated()) {
             props.getDeploymentRecords();
          
        }
        else {
            history.push('/');
        }
    }, [])

    const searchData = (option) =>{
       
        var queryText=option.target.value;
        setQueryText(queryText);

        let searchVal = queryText.toLowerCase();
        let deploymentListData = deploymentResultCopy.filter(item =>{
            let appName = item.AppName ? item.AppName.toLowerCase() : '';
            let appGroup = item.AppGroup ? item.AppGroup.toLowerCase() : '';
            let devId =   item.DevId ? item.DevId.toLowerCase() : '';
            let feature = item.Feature ? item.Feature : '';
            let FeatureStatus = item.FeatureStatus ? item.FeatureStatus.toLowerCase() : '';
            let UserStoryId = item.UserStoryId ? item.UserStoryId : '';
            let UserStoryStatus = item.UserStoryStatus ? item.UserStoryStatus.toLowerCase() : '';
            let taskId = item.TaskId ? item.TaskId : '';
            let TaskIdStatus = item.TaskIdStatus ? item.TaskIdStatus.toLowerCase() : '';
            let Functional = item.Functional ? item.Functional.toLowerCase() : '';
            
            let Developer = item.Developer ? item.Developer.toLowerCase() : '';
            
            let ReleaseNumber = item.ReleaseNumber ? item.ReleaseNumber.toLowerCase() : '';
            let UiArtifacts = item.UiArtifacts ? item.UiArtifacts : '';
            let ApiArtifacts = item.ApiArtifacts ? item.ApiArtifacts : '';
            
            return ((appName.toString().indexOf(searchVal) > -1) || (feature.toString().indexOf(searchVal) > -1) 
            ||  (FeatureStatus.toString().indexOf(searchVal) > -1) || (taskId.toString().indexOf(searchVal) > -1) ||
             (UserStoryId.toString().indexOf(searchVal) > -1) ||  (UserStoryStatus.toString().indexOf(searchVal) > -1) 
             ||  (TaskIdStatus.toString().indexOf(searchVal) > -1) || (Functional.toString().indexOf(searchVal) > -1)  ||
             (Developer.toString().indexOf(searchVal) > -1) || (ReleaseNumber.toString().indexOf(searchVal) > -1) || 
             (UiArtifacts.toString().indexOf(searchVal) > -1) ||  (ApiArtifacts.toString().indexOf(searchVal) > -1) || 
             (appGroup.toString().indexOf(searchVal) > -1) ||  (devId.toString().indexOf(searchVal) > -1)    )
        })

        if(searchVal !==""){
            props.getDeploymentRecords(deploymentListData);
        }
        else{
            props.getDeploymentRecords();
            setQueryText(queryText);
        }
    }
    const handleOpen =() => {
        setOpen(true);
    } 
   const handleClose = () => {
    setOpen(false);
    }

    return (
        <div style={body}>
            <AppBar>
                <img alt="" src={logo} width="30" height="30"></img><h4 style={{ marginLeft: '42%', fontStyle: "normal" }}>{compName}</h4>

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
                {userName.includes("navdeep") && <Tooltip title="Upload Data" >
                <span >
              <PublishIcon  className={classes.btnColor} onClick={handleOpen}/>
              <DropzoneDialog
                    open={open}
                    onSave={fileHandler}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                />
        
                </span>
                    </Tooltip> }           
                <Tooltip title="Download Data">
                <span style={{ marginLeft: '3%' }}>
                        <ReactHTMLTableToExcel
                            className={classes.btnColor}
                            table="deploymentID"
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
                <TableContainer style={{ zoom: '75%', marginTop: '5%',overflowX:'hidden'}}>
                    <Table size="small" aria-label="a dense table" id="deploymentID">
                        <TableHead style={{ backgroundColor: 'whitesmoke', fontSize: 'medium' }}>
                            <TableRow>
                                <TableCell style={customColumnStyle}>Sr.No.</TableCell>
                                <TableCell style={customColumnStyle}>App.Name</TableCell>
                                <TableCell  style={customColumnStyle}>App.Group</TableCell>
                                <TableCell  style={customColumnStyle}></TableCell>
                                <TableCell  style={customColumnStyle}>Feature</TableCell>
                                <TableCell  style={customColumnStyle}>Feature Status</TableCell>
                                <TableCell  style={customColumnStyle}>User_Id</TableCell>
                                <TableCell  style={customColumnStyle}>UserStory Status</TableCell>
                                <TableCell  style={customColumnStyle}>TaskId</TableCell>
                                <TableCell  style={customColumnStyle}>Task_Status</TableCell>
                                <TableCell  style={customColumnStyle}>Functional</TableCell>
                                <TableCell  style={customColumnStyle}>Developer</TableCell>
                                <TableCell  style={customColumnStyle}>Final Status</TableCell>
                                <TableCell  style={customColumnStyle}>Rel.Num</TableCell>
                                <TableCell  style={customColumnStyle}>Change_Type</TableCell>
                                <TableCell  style={customColumnStyle}>UI-Artifacts</TableCell>
                                <TableCell  style={customColumnStyle}>API-Artifacts</TableCell>
                                <TableCell  style={customColumnStyle}>Dev_Id</TableCell>
                                <TableCell style={customColumnStyle}>
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
                                        <TableRow > 
                                            <TableCell style={tableCellCss}>
                                                {(page * rowsPerPage) + (ind + 1)}
                                            </TableCell>
                                            <TableCell style={tableCellCss}>
                                                {
                                                    data.edit ? <TextField value={data.AppName} onChange={
                                                        option => handleAppNameChange(ind, data, option)
                                                    } placeholder="AppName">
                                                    </TextField>
                                                        :
                                                        data.AppName
                                                }
                                            </TableCell>
                                                 {/* App Groud Added */}
                                            <TableCell style={tableCellCss}>
                                                {
                                                    data.edit ? <TextField value={data.AppGroup} onChange={
                                                        option => handleAppGroupChange(ind, data, option)
                                                    } placeholder="AppGroup">
                                                    </TextField>
                                                        :
                                                        data.AppGroup
                                                }
                                            </TableCell>
                                              {/* End of App Groud Added */}
                                               <TableCell style={tableCellCss}></TableCell>
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}> 
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            <TableCell style={tableCellCss}>
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
                                            {/* Dev_Id field added */}
                                            <TableCell style={tableCellCss}>
                                                {
                                                    data.edit ? <TextField value={data.DevId} placeholder="DevId"
                                                        onChange={
                                                            option => handleDevIdChange(ind, data, option)
                                                        }
                                                    >
                                                    </TextField>
                                                        :
                                                        data.DevId
                                                }
                                            </TableCell>
                                             {/*End of Dev_Id field added */}
                                            <TableCell style={tableCellCss}>
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
                <b style={{ marginLeft: '5%', fontFamily: 'monospace', fontSize: 'xx-large' }}>Application Count:</b><br />
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
        deploymentResultCopy: state.Reducer.deploymentRecordsCopy,
        downloadExcelContent: state.Reducer.downloadData
    }
}

const mapDispatchToProps = {
    getDeploymentRecords, getDeploymentRecordsCopy, deploymentRowTable, postNewDeploymentRecords,
    deploymentCreateRecords, confirmDialogValue,
    successErrorDialog, updateDeploymentRecord, downloadReport
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentReport);