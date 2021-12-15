import React from "react";

//Material ui components import section
//import { IconButton, Typography, Backdrop, CircularProgress, Dialog } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

//Other installed components
import { withSnackbar } from "notistack";

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const styles = (theme) => ({});

class Chart extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    var data = [];
    console.log(this.props.array.length);
    this.props.array.map((v, i) => {
      var name = v.year;
      var Closing_Balance = v.closing_bal;
      if (v.year < this.props.Retirement_Year) {
        var Expenditure = 0;
      } else {
        Expenditure = parseFloat(v.expenditure).toFixed(2);
      }
      data.push({
        name: name,
        Closing_Balance: Closing_Balance,
        Expenditure: Expenditure,
      });
      console.log(i);
    });
    this.setState({
      data: data,
    });
    console.log(data);
  }
  render() {
    console.log(this.props.array);
    return (
      <LineChart
        width={1000}
        height={500}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Closing_Balance" stroke="#0095FF" />
        <Line type="monotone" dataKey="Expenditure" stroke="#FF0000" />
      </LineChart>
    );
  }
}

export default withStyles(styles)(withSnackbar(Chart));
