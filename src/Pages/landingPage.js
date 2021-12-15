import React from "react";
import {
  Typography,
  Grid,
  Button,
  Card,
  Toolbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Paper,
  TableContainer,
  IconButton,
  AppBar,
  DialogContent,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { withStyles } from "@material-ui/core/styles";
import NormalDialog from "./NormalDialog";
import { withSnackbar } from "notistack";
import Details from "./Details";
import FullScreenModel from "./FullScreenModel";
import Chart from "./Chart";

const styles = (theme) => ({
  root: {
    minWidth: 800,
  },
});

class Land extends React.Component {
  state = {
    Lumpsum_investment_year: "",
    Lumpsum_Amount: "",
    Retirement_Year: "",
    Retirement_Living: "",
    Life_Expectancy: "",
    calculation: false,
    array: [],
    open: true,
    openDetails: false,
    openFullScreenDialog: false,
    perChange: 0,
    data: [],
  };

  handleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleOpenDetails = () => {
    this.setState({
      openDetails: !this.state.openDetails,
    });
  };

  handleFullScreenDialog = () => {
    this.setState({
      openFullScreenDialog: !this.state.openFullScreenDialog,
    });
  };

  calculate = async () => {
    this.handleFullScreenDialog();
    var temp = [];
    var expenditure = parseFloat(this.state.Retirement_Living);
    for (
      var i = this.state.Lumpsum_investment_year;
      i <= this.state.Life_Expectancy;
      i++
    ) {
      const opening_bal = parseFloat(this.state.Lumpsum_Amount);
      if (i !== this.state.Lumpsum_investment_year) {
        expenditure =
          parseFloat(this.state.Retirement_Living) +
          parseFloat(this.state.Retirement_Living) * 0.04;
      }

      var balance;
      if (i < this.state.Retirement_Year) {
        balance = opening_bal - 0;
      } else {
        balance = opening_bal - expenditure;
      }
      const debt_earnings = balance * 0.5 * 0.06;
      const equity_earnings = balance * 0.3 * 0.1;
      const intEquity_earnings = balance * 0.2 * 0.12;
      const total_earnings =
        debt_earnings + equity_earnings + intEquity_earnings;
      const earnings_percent = ((total_earnings / balance) * 100).toFixed(2);
      const closing_bal = (balance + total_earnings).toFixed(2);
      const perChange = ((closing_bal - balance) / opening_bal) * 100;
      console.log(this.state.array);
      temp.push({
        year: i,
        opening_bal: opening_bal,
        closing_bal: closing_bal,
        debt_earnings: debt_earnings,
        equity_earnings: equity_earnings,
        intEquity_earnings: intEquity_earnings,
        total_earnings: total_earnings,
        earnings_percent: earnings_percent,
        expenditure: expenditure,
        balance: balance,
        perChange: perChange,
      });
      await this.setState({
        Lumpsum_Amount: closing_bal,

        Retirement_Living: expenditure,
      });
    }
    await this.setState({
      array: temp,
    });
    console.log(this.state.array);
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.array);
    return (
      <div style={{ marginTop: "10%" }}>
        <Grid
          xs={12}
          sm={8}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Card style={{ width: "100%" }}>
            <AppBar position="static">
              <Toolbar style={{ backgroundColor: "#43A047" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  style={{ color: "black" }}
                  onClick={this.handleOpen}
                >
                  <InfoOutlinedIcon
                    variant="outlined"
                    style={{ color: "white" }}
                  />
                </IconButton>
                <Typography variant="h6" style={{ color: "white" }}>
                  Personal Retirement Plan
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid
              spacing={1}
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
              style={{ backgroundColor: "#E8F5E9" }}
            >
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  id="outlined-basic"
                  label="Year of Investment"
                  onChange={(e) =>
                    this.setState({
                      Lumpsum_investment_year: e.currentTarget.value,
                    })
                  }
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 20,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  id="outlined-basic"
                  label="Lumpsum Amount"
                  value={this.state.Lumpsum_Amount}
                  onChange={(e) =>
                    this.setState({ Lumpsum_Amount: e.currentTarget.value })
                  }
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 20,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  id="outlined-basic"
                  label="Retirement Year"
                  value={this.state.Retirement_Year}
                  onChange={(e) =>
                    this.setState({ Retirement_Year: e.currentTarget.value })
                  }
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 20,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  id="outlined-basic"
                  label="Ret. Living Expense P.A"
                  onChange={(e) =>
                    this.setState({ Retirement_Living: e.currentTarget.value })
                  }
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 10,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  id="outlined-basic"
                  label="Life Expectancy"
                  onChange={(e) =>
                    this.setState({ Life_Expectancy: e.currentTarget.value })
                  }
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 10,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl
                  disabled
                  variant="outlined"
                  style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    marginTop: 10,
                  }}
                >
                  <InputLabel>Growth</InputLabel>
                  <Select labelId="demo-simple-select-label" name="dept">
                    <MenuItem value="Balanced">Balanced</MenuItem>
                    <MenuItem value="Growth">Growth</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ marginBottom: 15 }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  variant="outlined"
                  onClick={() => this.calculate()}
                  style={{
                    marginLeft: "45%",
                    marginRight: "45%",
                    backgroundColor: "#43A047",
                    marginTop: 10,
                  }}
                >
                  <ArrowForwardOutlinedIcon
                    variant="outlined"
                    style={{ color: "white" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <FullScreenModel
          style={{ backgroundColor: "#E8F5E9" }}
          open={this.state.openFullScreenDialog}
          handleClose={this.handleFullScreenDialog}
          title="Retirement Plan Projections"
          component={
            <Grid
              xs={12}
              sm={8}
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}
            >
              <Button
                style={{
                  width: "20%",
                  marginLeft: "40%",
                  marginRight: "40%",
                }}
                variant="outlined"
                onClick={() => {
                  this.setState({
                    openDetails: true,
                  });
                }}
              >
                View Summary
              </Button>
              <NormalDialog
                open={this.state.openDetails}
                onClose={this.handleOpenDetails}
                component={
                  <Details
                    Retirement_Year={this.state.Retirement_Year}
                    array={this.state.array}
                  />
                }
              />
              <Card style={{ width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Opening Balance</TableCell>
                        <TableCell align="center">Expenditure P.A</TableCell>
                        <TableCell align="center">Balance</TableCell>
                        <TableCell align="center">Debt Earnings</TableCell>
                        <TableCell align="center">Equity Earnings</TableCell>
                        <TableCell align="center">
                          International Earnings
                        </TableCell>
                        <TableCell align="center">Total Earnings</TableCell>
                        <TableCell align="center">Closing Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.array.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">
                              <Typography>{item.year} </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {parseFloat(item.opening_bal).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography style={{ color: "red" }}>
                                {item.year < this.state.Retirement_Year
                                  ? 0
                                  : parseFloat(item.expenditure).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>
                                {parseFloat(item.balance).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.debt_earnings).toFixed(2) > 0 ? (
                                <Typography style={{ color: "green" }}>
                                  {parseFloat(item.debt_earnings).toFixed(2)}
                                </Typography>
                              ) : (
                                <Typography style={{ color: "red" }}>
                                  {parseFloat(item.debt_earnings).toFixed(2)}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.equity_earnings).toFixed(2) >
                              0 ? (
                                <Typography style={{ color: "green" }}>
                                  {parseFloat(item.equity_earnings).toFixed(2)}
                                </Typography>
                              ) : (
                                <Typography style={{ color: "red" }}>
                                  {parseFloat(item.equity_earnings).toFixed(2)}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.intEquity_earnings).toFixed(2) >
                              0 ? (
                                <Typography style={{ color: "green" }}>
                                  {parseFloat(item.intEquity_earnings).toFixed(
                                    2
                                  )}
                                </Typography>
                              ) : (
                                <Typography style={{ color: "red" }}>
                                  {parseFloat(item.intEquity_earnings).toFixed(
                                    2
                                  )}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.total_earnings).toFixed(2) >
                              0 ? (
                                <Typography style={{ color: "green" }}>
                                  {parseFloat(item.total_earnings).toFixed(2)}
                                </Typography>
                              ) : (
                                <Typography style={{ color: "red" }}>
                                  {parseFloat(item.total_earnings).toFixed(2)}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.closing_bal).toFixed(2) > 0 ? (
                                <Typography style={{ color: "green" }}>
                                  {parseFloat(item.closing_bal).toFixed(2)}
                                </Typography>
                              ) : (
                                <Typography style={{ color: "red" }}>
                                  {parseFloat(item.closing_bal).toFixed(2)}
                                </Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid xs={12}>
                  {this.state.array.length === 0 ? (
                    <h1>Loading...</h1>
                  ) : (
                    <Chart
                      Retirement_Year={this.state.Retirement_Year}
                      array={this.state.array}
                    />
                  )}
                </Grid>
              </Card>
            </Grid>
          }
        />

        {/* Dialog content */}

        <NormalDialog
          open={this.state.open}
          onClose={this.handleOpen}
          component={
            <div>
              <DialogContent style={{ backgroundColor: "#C8E6C9" }}>
                <Grid
                  spacing={1}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography style={{ fontWeight: 1000, fontSize: 17 }}>
                      How to use ?
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      variant="outlined"
                      style={{
                        marginLeft: "80%",
                        marginRight: "0%",
                        width: "20%",
                      }}
                      onClick={this.handleOpen}
                    >
                      <CloseIcon
                        style={{ color: "#d50000", fontWeight: 1000 }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#E8F5E9" }}>
                <Typography
                  style={{
                    fontSize: 14,
                    textAlign: "justify",
                    fontWeight: 400,
                  }}
                >
                  Enter the year in which you are goint to make investment in
                  "Year of Lumpsum Investment" field.Next add the amount that
                  you are going to invest in "Lumpsum Amount" field.Now enter
                  the year you wish to retire in "Retirement Year" textbox.After
                  that add your retiremnt living expenses for a year as of today
                  in "Ret. Living Expense P.A" field.Last step is to enter the
                  life expectancy year/the year when you wish to liquidate all
                  your investments in "Life Expectancy" field.After entering all
                  fields click the arrow button to generate the plan.
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#C8E6C9" }}>
                <Typography style={{ fontWeight: 1000, fontSize: 17 }}>
                  Asset Allocation
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#E8F5E9" }}>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  {"Debt Instruments --> 50%."}
                </Typography>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  {"Equity --> 30%."}
                </Typography>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  {"International Equity --> 20%"}
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#C8E6C9" }}>
                <Typography style={{ fontWeight: 1000, fontSize: 17 }}>
                  Assumptions
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#E8F5E9" }}>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  Debt Instruments,Equity & International Equity provide returns
                  of 6%,10% & 12% respectively.
                </Typography>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  Inflation rate is assumed to be 4%.
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#C8E6C9" }}>
                <Typography style={{ fontWeight: 1000, fontSize: 17 }}>
                  Disclaimer
                </Typography>
              </DialogContent>
              <DialogContent style={{ backgroundColor: "#E8F5E9" }}>
                <Typography style={{ fontSize: 14, textAlign: "justify" }}>
                  The plan generated through this tool is just a prediction
                  based on backtesting. Consult your financial advisor before
                  making any decisions as uncertainty is the only certainty
                  regarding Markets.
                </Typography>
              </DialogContent>
            </div>
          }
        />
      </div>
    );
  }
}
export default withSnackbar(withStyles(styles)(Land));
