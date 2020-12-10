import React, { Component } from 'react';
//import { DateUtils } from 'react-day-picker';
//import 'react-day-picker/lib/style.css';
import axios from 'axios';
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  //DatePicker,
  //TimePicker,
  //DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  //KeyboardDateTimePicker,
} from '@material-ui/pickers';

/*
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

class AddDateRange extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.getDateArray = this.getDateArray.bind(this);
        this.state = {
            from: undefined,
            to: undefined,
            name: '',
            phone: '',
            dates: [],
            numberOfDays: 0,
            bookedDaysArr: [],
            bookedPhoneArr: [],
        };        
    }

    componentDidMount(){        
        axios.get('http://localhost:5000/users').then(
            res => {                
                res.data.forEach(element => {
                    this.setState(state => ({
                        bookedDaysArr: [...state.bookedDaysArr, ...element.dates],
                        bookedPhoneArr: [...state.bookedPhoneArr, element.phone]
                    }));
                });
            }
        )
    }

    handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from });
    }

    handleToChange(to) {
        this.setState({ to }, this.showFromMonth);
    }

    onChangeName(e){
        this.setState({
            name : e.target.value
        })
    }
    onChangePhone(e){
        if(this.state.bookedPhoneArr.includes(e.target.value)){
            alert('Phone number already taken');
        } else{
            this.setState({
            phone : e.target.value
            })
        }                
    }
    getDateArray(start, end){
        const arr = [];
        const dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    onSubmit(e){
        e.preventDefault();
        const datesArr=this.getDateArray(this.state.from, this.state.to);
        let error = false;
        datesArr.forEach(e => {
            if(this.state.bookedDaysArr.includes(e.toISOString())){
                error = true;
            }
        });        
        if(error){
            alert('Dates already booked');
            window.location.reload();
        } else{
            const user = {
                name: this.state.name,
                phone: this.state.phone,
                dates: datesArr
            }        

            axios.post('http://localhost:5000/users/add-range', user)
            .then(res => {
            
                this.setState({
                    booked: true
                })
            })

            
        }
    }

    render() {
        const { from, to, bookedDaysArr, booked } = this.state;
        const modifiers = { start: from, end: to };
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); 
        const FORMAT = 'dd/MM/yyyy';

        function bookedDays(day){
            return bookedDaysArr.includes(day.toISOString());
        }
        let toRender;
        if(booked){
            toRender = <p>Booking Successful!</p>
        } else {
            toRender = 
            <form>
                <label>Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                <label>Phone: </label>
                <input type="text" className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                <DayPickerInput
                    value={from}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    placeholder={`From ${dateFnsFormat(new Date(), FORMAT)}`}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: [
                            { before: tomorrow},
                            { after: to },
                            bookedDays
                        ],
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 2,
                        onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.handleFromChange}
                />{' '}
                —{' '}
                <span className="InputFromTo-to">
                    <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        formatDate={formatDate}
                        format={FORMAT}
                        parseDate={parseDate}
                        placeholder={`To ${dateFnsFormat(new Date(), FORMAT)}`}
                        dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: [
                                { before: from },
                                bookedDays,
                            ],
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 2,
                        }}
                        onDayChange={this.handleToChange}
                    />
                </span>
                <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </form>
        }

        return (
        <div className="InputFromTo">
            {toRender}
            

        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
        </div>
        );
    }
}
 
export default AddDateRange;
*/

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});  

class AddDateRange extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.getDateArray = this.getDateArray.bind(this);
        this.getPaymentDetails = this.getPaymentDetails.bind(this);
        this.formatMoney = this.formatMoney.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            startDate: null,
            endDate: null,
            name: '',
            phone: '',
            dates: [],
            numberOfDays: 0,
            bookedDaysArr: [],
            bookedPhoneArr: [],
            booked: false,
            amtToPay: '',
            errors: {},
        }
    }
    componentDidMount(){     
        axios.get('http://localhost:5000/users').then(
            res => {                
                res.data.forEach(element => {
                    this.setState(state => ({
                        bookedDaysArr: [...state.bookedDaysArr, ...element.dates],
                        bookedPhoneArr: [...state.bookedPhoneArr, element.phone]
                    }));
                });
            }
        )
    }

    handleFromChange(e) {
        if(e){
            const toSet = new Date(e.getFullYear(),e.getMonth(),e.getDate(), 5, 30);
            if(this.state.bookedDaysArr.includes(`${toSet.getDate()}-${toSet.getMonth()+1}-${toSet.getFullYear()}`)){
            alert('The selected date is already booked');
            }else{
            this.setState({ startDate: toSet });
            }
        }
    }
    
    handleToChange(e) {
        if(e){
            const toSet = new Date(e.getFullYear(),e.getMonth(),e.getDate(), 5, 30);
            if(this.state.bookedDaysArr.includes(`${toSet.getDate()}-${toSet.getMonth()+1}-${toSet.getFullYear()}`)){
            alert('The selected date is already booked');
            }else{
            this.setState({ endDate: toSet });
            }
        }
    }

    onChangeName(e){
        this.setState({
            errors: {
                name: 'example'
            }
        })
        this.setState({
            name : e.target.value
        })
    }
    onChangePhone(e){
        /*if(this.state.bookedPhoneArr.includes(e.target.value)){
            alert('Phone number already taken');
        } else{*/
            this.setState({
            phone : e.target.value
            })
        //}                
    }
    getDateArray(start, end) {
        start.setUTCHours(0,0,0,0);
        end.setUTCHours(0,0,0,0);
        let arr = [];
        let dt = new Date(start);
        let toPush = '';
        while (dt <= end) {
            toPush = `${dt.getDate()}-${dt.getMonth()+1}-${dt.getFullYear()}`;
            arr.push(toPush);
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }
    formatMoney(x){
        x=x.toString();
        let lastThree = x.substring(x.length-3);
        let otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers !== '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return `Rs. ${res}`
    }
    getPaymentDetails(n){
        const basePrice = 45000;
        if(n===1) return this.formatMoney(basePrice);
        if(n%2 === 0) return this.formatMoney(basePrice*(n/2)*1.5); else{
            return this.formatMoney(basePrice*(n-1));
        }
        
    }

    onSubmit(e){
        e.preventDefault();
        const datesArr=this.getDateArray(this.state.startDate, this.state.endDate);
        let error = false;
        datesArr.forEach(e => {
            //e.setUTCHours(0,0,0,0);
            if(this.state.bookedDaysArr.includes(e)){
                error = true;
            }
        } );       
        if(error){
            alert('Dates already booked');
            window.location.reload();
        } else{
            const amt = this.getPaymentDetails(datesArr.length);
            this.setState({
                amtToPay: amt
            })
            
            const user = {
                name: this.state.name,
                phone: this.state.phone,
                dates: datesArr,
                amtToPay: amt,
            }        
            console.log(user);
            axios.post('http://localhost:5000/users/add-range', user)
            .then(res => {            
                this.setState({
                    booked: true
                })
            })
        }
    }

    render() {
        const {
            startDate, endDate, bookedDaysArr, booked, name, phone, amtToPay, errors
          } = this.state;

        const { classes } = this.props;
        //console.log(errors.name);
        function bookedDays(day){
            //day.setUTCHours(0,0,0,0);            
            return bookedDaysArr.includes(`${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}`);
        }
        
        return (
            <Grid container direction="column" spacing={0}>
                <Grid item container>
                    <Grid item xs={3} />
                    <Grid item container xs={6}>
                    {!booked && <Paper className={classes.paper}>
                        <TextField 
                        style={{marginTop: '1.5rem'}}
                        color="secondary" 
                        fullWidth
                        label="Name"
                        onChange={this.onChangeName} />

                        <TextField
                        style={{marginTop: '0.5rem'}}
                        color="secondary" 
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={this.onChangePhone} />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{marginTop: '1.5rem'}}
                            color="secondary"
                            placeholder="dd/mm/yyyy"
                            fullWidth
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            disableToolbar
                            label="Start Date"
                            format="dd/MM/yyyy"
                            value={startDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={this.handleFromChange}
                            disablePast
                            shouldDisableDate={bookedDays}
                        />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{marginTop: '1.5rem'}}
                            color="secondary"
                            placeholder="dd/mm/yyyy"
                            fullWidth
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            disableToolbar
                            label="End Date"
                            format="dd/MM/yyyy"
                            value={endDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={this.handleToChange}
                            minDate={startDate}
                            disablePast
                            shouldDisableDate={bookedDays}
                        />
                        </MuiPickersUtilsProvider>

                        {startDate && endDate && <Alert
                        severity="info"
                        style={{marginTop: '1.5rem'}}
                        fullWidth>
                        Selected {this.getDateArray(startDate,endDate).length} day(s) from {startDate.toDateString()} to {endDate.toDateString()}.<br />
                        Total amount to be paid: {this.getPaymentDetails(this.getDateArray(startDate,endDate).length)} 
                        </Alert>}

                        <Button
                        style={{marginTop: '1.5rem'}} 
                        color="secondary"
                        fullWidth
                        variant="contained" 
                        onClick={this.onSubmit}>
                            Submit
                        </Button>
                        
                    </Paper>}
                    {booked && <Paper className={classes.paper}>
                        <Alert severity="info">
                            Hi {name}, your booking is from {startDate.toDateString()} to {endDate.toDateString()} <br />
                            Booking will be confirmed only after the payment. The date(s) will be blocked for you for one day. <br />
                            Amount to be paid: {amtToPay} 
                        </Alert>
                    </Paper>}
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
            </Grid>
        );
        
    }
}

AddDateRange.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AddDateRange);