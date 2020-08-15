import React from 'react';
import {
    Grid, Paper, Typography, Table,
    TableHead, TableRow, TableCell,
    TableBody, Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import footer from './Footer';
import history from '../History';

const onNavBack = () => {
    history.push('/');
}

function DeploymentReport(props) {
    return (
        <>
            <Paper style={{
                minHeight: '515px',
                //  minWidth: '315px',
                display: 'inline-block',
                width: '100%',
                marginTop: '5%',
            }}>
                <big style={{
                    color: '#db4437',
                    marginLeft: '45%'
                }}>Deployment Report</big>
                <CloseIcon style={{ marginLeft: '98%', backgroundColor: 'darksalmon' }} onClick={onNavBack} />
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr.No.</TableCell>
                            <TableCell>Application Name</TableCell>
                            <TableCell>Feature</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Task Id</TableCell>
                            <TableCell>SIT Status</TableCell>
                            <TableCell>Functional</TableCell>
                            <TableCell>Developer</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Release Number</TableCell>
                            <TableCell>Nature of Change</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>UI-Artifacts</TableCell>
                            <TableCell>API-Artifacts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
           
        </>
    )
}
export default DeploymentReport;