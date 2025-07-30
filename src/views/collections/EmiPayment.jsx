import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Title } from "../../ui/index";
import { Transition } from "../../component/common/index";
import dayjs from "dayjs";
import { dateFormatter } from "../../util/CommonUtil";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCommon } from "../../contexts/CommonContext";

const EmiPayment = ({ open, setOpen, setPaymentLines, paymentAmount }) => {
  const { paymentType, fetchBankBasedOnPaymentType, banks } = useCommon();
  const [paymentLinesDtls, setPaymentLinesDtls] = useState({
    paymentAmount: paymentAmount,
    paymentType: "",
    paymentTypeItem: "",
    paymentTypeName: "",
    bankItem: "",
    bankAccountNumber: "",
    chequeNumber: "",
    chequeDate: "",
    cardNumber: "",
    chequeCopy: "",
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  useEffect(() => {
    fetchBankBasedOnPaymentType(paymentLinesDtls?.paymentType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentLinesDtls?.paymentType]);
  const paymentAmountHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      paymentAmount: e?.target?.value,
    }));
  };
  const paymentHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      paymentType: parseInt(e?.target?.value?.id),
      paymentTypeItem: e?.target?.value,
      paymentTypeName: e?.target?.value?.type,
    }));
  };
  const bankHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      bankItem: e?.target?.value,
      bankAccountNumber: e?.target?.value?.id,
    }));
  };
  const cardNoHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      cardNumber: e?.target?.value,
    }));
  };
  const chequeNoHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      chequeNumber: e?.target?.value,
    }));
  };
  const chequeDateHandle = (e) => {
    setPaymentLinesDtls((prev) => ({
      ...prev,
      chequeDate: dateFormatter(e?.$d),
    }));
  };
  const chequeCopyHandle = (e) => {
    setIsFileUploaded(true);
    setPaymentLinesDtls((prev) => ({
      ...prev,
      chequeCopy: e?.target?.files[0],
    }));
  };
  const addPaymentItemHandle = () => {
    setPaymentLines((prev) => [...prev, paymentLinesDtls]);
    setPaymentLinesDtls({
      paymentAmount: 0,
      paymentTypeItem: "",
      paymentType: "",
      paymentTypeName: "",
      bankItem: "",
      bankAccountNumber: "",
      chequeNumber: "",
      chequeDate: "",
      cardNumber: "",
      chequeCopy: "",
    });
    setOpen(false);
  };

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
                        onChange={paymentAmountHandle}
                        value={paymentLinesDtls?.paymentAmount}
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
                          onChange={paymentHandle}
                          value={paymentLinesDtls?.paymentTypeItem}
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
                          onChange={bankHandle}
                          value={paymentLinesDtls?.bankItem}
                        >
                          {banks?.map((item) => (
                            <MenuItem value={item} key={item?.id}>
                              {item?.bankName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {paymentLinesDtls?.paymentType === 3 && (
                      <Grid item sx={2}>
                        <TextField
                          label="Card No"
                          name="card_no"
                          onChange={cardNoHandle}
                        />
                      </Grid>
                    )}
                    {paymentLinesDtls?.paymentType === 2 && (
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
                    )}
                    <Grid
                      item
                      container
                      xs={1}
                      display="flex"
                      alignItems="center"
                    >
                      <IconButton
                        aria-label="add"
                        onClick={addPaymentItemHandle}
                      >
                        <AddBoxIcon
                          sx={{
                            color: "addBtnColor.light",
                          }}
                        />
                      </IconButton>
                    </Grid>
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
