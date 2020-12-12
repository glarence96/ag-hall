import axios from 'axios';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.displayNames = this.displayNames.bind(this);
        this.state = { 
            fullData: [],
            isMounted: false,
        }
    }
    componentDidMount(){     
        axios.get('http://localhost:5000/users').then(
            res => {
                this.setState({
                    fullData: res.data,
                    isMounted: true,
                });
            }
        )
    }
    displayNames(){
        const {fullData, isMounted} = this.state;
        
        if(isMounted){
            return <Grid item container xs={12} sm={10}>
                <p>This component is not functional yet. Will be developed soon</p>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">From</TableCell>
                        <TableCell align="center">To</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Approval</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/*{rows.map((row) => (*/}
                        <TableRow key={fullData[fullData.length - 1].name}>
                        <TableCell align="center">
                            {fullData[fullData.length - 1].name}
                        </TableCell>
                        <TableCell align="center">{fullData[fullData.length - 1].phone}</TableCell>
                        <TableCell align="center">{fullData[fullData.length - 1].dates[0]}</TableCell>
                        <TableCell align="center">{fullData[fullData.length - 1].dates[1]}</TableCell>
                        <TableCell align="center">{fullData[fullData.length - 1].amtToPay}</TableCell>
                        <TableCell align="center">
                        <IconButton style={{color: "green"}} aria-label="save">
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton style={{color: "red"}} aria-label="delete">
                            <CancelIcon />
                        </IconButton>
                        </TableCell>
                        </TableRow>
                    {/*}))}*/}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        }
                    
    }

    render() {         
        return (
            <Grid container style={{marginTop: "1rem"}}>
                <Grid item xs={0} sm={1} />                
                {this.displayNames()}
                <Grid item xs={0} sm={1} />
            </Grid>
        );
    }
}
 
export default Admin;