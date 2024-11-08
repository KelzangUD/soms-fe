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
        <Table sx={{ minWidth: 650 }} aria-label="payment detail table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Amount</TableCell>
              <TableCell align="right">Payment Type</TableCell>
              <TableCell align="right">Bank A/C Name</TableCell>
              <TableCell align="right">Cheque Number</TableCell>
              <TableCell align="right">Cheque Date</TableCell>
              <TableCell align="right">Cheque Copy</TableCell>
              <TableCell align="right">Card Number</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentLines?.length > 0 &&
              paymentLines?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.paymentAmount}</TableCell>
                  <TableCell align="right">{item?.paymentTypeName}</TableCell>
                  <TableCell align="right">{item?.bankAccountNumber}</TableCell>
                  <TableCell align="right">{item?.chequeNumber}</TableCell>
                  <TableCell align="right">{item?.chequeDate}</TableCell>
                  <TableCell align="right">
                    {item?.paymentType === "2" && (
                      <IconButton aria-label="image">
                        <ImageIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align="right">{item?.cardNumber}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => deletePaymentItemHandle(e, index)}
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
