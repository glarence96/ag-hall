import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';


class DateChecker extends Component {
    constructor(props) {
        super(props);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetPage = this.resetPage.bind(this);
        this.state = { 
            phone: '',
            bookedDaysArr: [],
            bookedPhoneArr: [],
            toRender: undefined,
            fullData: undefined,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users').then(
            res => {
                res.data.forEach(e => {
                    this.setState(state => ({
                        bookedDaysArr: [...state.bookedDaysArr, ...e.dates],
                        bookedPhoneArr: [...state.bookedPhoneArr, e.phone]
                    }));
                })
                this.setState({
                    fullData: res.data
                })
            }
        )
    }
    onChangePhone(e){
        this.setState({
            phone : e.target.value
        })
    }
    parseDate(date){
        const arr=date.split('-');
        return new Date(arr[2],arr[1]-1,arr[0]).toDateString();
    }
    displayDates(){
        const {fullData} = this.state;
        let index=[];
        let start=[];
        let end=[];
        fullData.forEach((e,i) => { 
            if(this.state.phone === e.phone) index.push(i);
        });
        const name=fullData[index[0]].name;
        index.forEach(i => {
            start.push(this.parseDate(fullData[i].dates[0]));
            end.push(this.parseDate(fullData[i].dates[fullData[i].dates.length-1]));
        });
        const returnDetails=start.map((cur, i) => {
        return <li>from {cur} to {end[i]}</li>
        })
            
    return <Alert style={{marginTop: '1.5rem'}} fullWidth color="success">
        Hi {name}, your booking details are:<br />
        <ul>{returnDetails}</ul>
    </Alert>
    }

    onSubmit(e){
        e.preventDefault();
        
        if(this.state.bookedPhoneArr.includes(this.state.phone)){
            this.setState({
                toRender: 'dates'
            })
        } else if(this.state.phone) {
            this.setState({
                toRender: 'no dates'
            })
        }
    }
    handleKeyDown(e){        
        if(e.code === 'Enter' || e.code === 'NumpadEnter') this.onSubmit(e);
    }

    resetPage(e){
        e.preventDefault();
        this.setState({
            phone: '',
            toRender: undefined,
        })
    }
    render(){
        const {toRender} = this.state;
        return (
            <Grid container direction="column" spacing={1}>                    
                <Grid item container>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        {toRender===undefined && <TextField style={{marginTop: '1.5rem'}} fullWidth id="standard-basic" label="Enter your phone number" onChange={this.onChangePhone} onKeyDown={this.handleKeyDown}/>}
                        {toRender==='no dates' && <Alert style={{marginTop: '1.5rem'}} fullWidth severity="error">No Bookings Made</Alert>}
                        {toRender==='dates' && this.displayDates()}
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
                
                <Grid item container>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        {toRender===undefined && <Button 
                                color="primary"
                                fullWidth
                                variant="contained" 
                                onClick={this.onSubmit}>
                                    Submit
                            </Button>}

                        {toRender==='no dates' && <Button 
                            color="primary"
                            fullWidth
                            variant="contained"
                            onClick={this.resetPage}>Enter Another Number
                        </Button>}

                        {toRender==='dates' && <Button
                        fullWidth 
                        color="primary"
                        variant="contained"
                        onClick={this.resetPage}>Enter Another Number
                        </Button>}
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
            </Grid>
        )
    }

}
 
export default DateChecker;
