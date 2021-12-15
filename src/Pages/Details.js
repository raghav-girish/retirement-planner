import React, { Component } from "react";
import {
  Typography,
  DialogContent,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});
class FullScreenModel extends Component {
  state = {
    expenditureTotal: 0,
    closingBalance: 0,
    openingBalance: 0,
    realizedGain: 0,
    unRealizedGain: 0,
  };

  componentDidMount() {
    var expTotal = 0;
    for (var i = 0; i < this.props.array.length; i++) {
      if (this.props.array[i].year < this.props.Retirement_Year) {
        expTotal = parseFloat(expTotal) + parseFloat(0);
      } else {
        expTotal =
          parseFloat(expTotal) +
          parseFloat(parseFloat(this.props.array[i].expenditure));
      }
    }

    this.setState({
      expenditureTotal: expTotal,
      closingBalance: this.props.array[this.props.array.length - 1].closing_bal,
      openingBalance: this.props.array[0].opening_bal,
      realizedGain:
        (this.state.expenditureTotal / this.state.openingBalance) * 100,
    });
  }
  render() {
    return (
      <div>
        <DialogContent style={{ backgroundColor: "#2E7D32" }}>
          <Typography
            style={{ fontWeight: 1000, fontSize: 17, color: "white" }}
          >
            Summary
          </Typography>
        </DialogContent>
        <DialogContent style={{ backgroundColor: "#43A047" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#66BB6A" }}>
                <TableRow>
                  <TableCell align="center">
                    <Typography>Opening Balance</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Total Expected Withdrawals</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>Closing Balance</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <Typography style={{ color: "white" }}>
                      {parseFloat(this.state.openingBalance).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography style={{ color: "white" }}>
                      {parseFloat(this.state.expenditureTotal).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {parseFloat(this.state.closingBalance).toFixed(2) > 0 ? (
                      <Typography style={{ color: "green" }}>
                        {parseFloat(this.state.closingBalance).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography style={{ color: "red" }}>
                        {parseFloat(this.state.closingBalance).toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </div>
    );
  }
}

export default withStyles(styles)(FullScreenModel);
