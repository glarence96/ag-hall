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
            <Grid>
                <p>asda</p>
            </Grid>
        );
    }
}
 
export default Admin;