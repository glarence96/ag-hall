import axios from 'axios';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';



class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){     
        axios.get('http://localhost:5000/users').then(
            res => {
                this.setState({
                    fullData: res.data
                });
            }
        )
    }

    render() { 
        return (
            <Grid container style={{marginTop: "1.5rem"}}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    This is admin panel
                </Grid>
                <Grid item xs={1} />
            </Grid>
        );
    }
}
 
export default Admin;