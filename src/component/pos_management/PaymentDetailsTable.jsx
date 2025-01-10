import React from "react";
import {
  Paper,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";

const PaymentDetailsTable = ({ paymentLines, deletePaymentItemHandle}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payment detail table"  size="small">
          <TableHead>
            <TableRow>
              <TableCell>Payment Amount</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Bank A/C Name</TableCell>
              <TableCell>Cheque Number</TableCell>
              <TableCell>Cheque Date</TableCell>
              <TableCell>Cheque Copy</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentLines?.length > 0 &&
              paymentLines?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.paymentAmount}</TableCell>
                  <TableCell>{item?.paymentTypeName}</TableCell>
                  <TableCell>{item?.bankItem?.bankName}</TableCell>
                  <TableCell>{item?.chequeNumber}</TableCell>
                  <TableCell>{item?.chequeDate}</TableCell>
                  <TableCell>
                    {item?.paymentType === "2" && (
                      <IconButton aria-label="image">
                        <ImageIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{item?.cardNumber}</TableCell>
                  <TableCell>
                    {" "}
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => deletePaymentItemHandle(e, index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentDetailsTable;
