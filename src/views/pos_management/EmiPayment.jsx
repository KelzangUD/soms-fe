import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PaymentIcon from "@mui/icons-material/Payment";
import { PaymentDetailsTable } from "../../component/pos_management/index";
import { Title, RenderStatus } from "../../ui/index";
import { Transition } from "../../component/common/index";
import dayjs from "dayjs";
import { dateFormatter, downloadSampleHandle } from "../../util/CommonUtil";
import { useCommon } from "../../contexts/CommonContext";

const EmiPayment = ({ open, setOpen, setPaymentLines }) => {
  const { paymentType, fetchBankBasedOnPaymentType, banks } = useCommon();
  const [paymentLinesDtls, setPaymentLinesDtls] = useState({
    installmentAmount: "",
    paymentType: "",
    bankAccountNumber: "",
    chequeNumber: "",
    chequeDate: "",
    cardNumber: "",
  });
  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Grid item xs={12} p={2}>
                <Paper sx={{ overflow: "hidden" }}>
                  <Title title="EMI Payment" />
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={2}>
                      <TextField
                        label="Payment Amount"
                        name="payment_amount"
                        required
                        // onChange={paymentAmountHandle}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl>
                        <InputLabel id="payment-type-select-label">
                          Payment Type
                        </InputLabel>
                        <Select
                          labelId="payment-type-select-label"
                          id="payment-type-select"
                          label="Payment Type"
                          // onChange={paymentHandle}
                          // value={paymentLinesItem?.paymentTypeItem}
                        >
                          {paymentType?.map((item) => (
                            <MenuItem value={item} key={item?.id}>
                              {item?.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl>
                        <InputLabel id="bank-ac-name-select-label">
                          Bank A/C Name
                        </InputLabel>
                        <Select
                          labelId="bank-ac-name-select-label"
                          id="bank-ac-name-select"
                          label="Bank A/C Name"
                          // onChange={bankHandle}
                          // value={paymentLinesItem?.bankItem}
                        >
                          {/* {banks?.map((item) => (
                          <MenuItem value={item} key={item?.id}>
                            {item?.bankName}
                          </MenuItem>
                        ))} */}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* {paymentLinesItem?.paymentType === "3" && (
                    <Grid item sx={2}>
                      <TextField
                        label="Card No"
                        name="card_no"
                        onChange={cardNoHandle}
                      />
                    </Grid>
                  )} */}
                    {/* {paymentLinesItem?.paymentType === "2" && (
                    <>
                      <Grid item sx={2}>
                        <TextField
                          label="Cheque No"
                          name="cheque_no"
                          onChange={chequeNoHandle}
                        />
                      </Grid>
                      <Grid item sx={1}>
                        <FormControl>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Cheque Date"
                              onChange={chequeDateHandle}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item sx={2}>
                        <TextField
                          type="file"
                          label={isFileUploaded ? "File" : ""}
                          InputLabelProps={{ shrink: true }}
                          onChange={chequeCopyHandle}
                        />
                      </Grid>
                    </>
                  )} */}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              alignItems="right"
              paddingX={2}
              marginBottom={2}
              marginX={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="primary"
                size="small"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="error"
                size="small"
                sx={{
                  marginLeft: 2,
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default EmiPayment;
