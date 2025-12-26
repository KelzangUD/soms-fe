import React, { useEffect } from "react";
import {
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const LineItemsTable = ({
  lineItems,
  deleteLineItemHandle,
  editLineItemHandle,
  linesAmount,
}) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="simple table" size="small">
          <TableHead
            sx={{
              background: "#F5F7F8",
            }}
          >
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Selling Price</TableCell>
              <TableCell align="right">GST Amount</TableCell>
              <TableCell align="right">Disc/Comm Amount</TableCell>
              <TableCell align="right">Additional Discount</TableCell>
              <TableCell align="right">TDS Amount</TableCell>
              <TableCell align="right">Transaction Fees</TableCell>
              <TableCell align="right">Discounted Amount</TableCell>
              <TableCell align="right">Line Item Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems?.length > 0 &&
              lineItems?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    height: "auto",
                  }}
                >
                  <TableCell sx={{ minWidth: 100 }}>
                    {item?.description}
                  </TableCell>
                  <TableCell align="right">{item?.qty}</TableCell>
                  <TableCell align="right">{item?.mrp}</TableCell>
                  <TableCell align="right">{item?.taxAmt}</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">
                    {item?.additionalDiscount}
                  </TableCell>
                  <TableCell align="right">{item?.tdsAmount}</TableCell>
                  <TableCell align="right">{item?.upiAmt}</TableCell>
                  <TableCell align="right">{item?.discountedAmount}</TableCell>
                  <TableCell align="right">{item?.lineItemAmt}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="text" aria-label="Basic button group">
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => editLineItemHandle(e, item, index)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => deleteLineItemHandle(e, index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Gross Total</TableCell>
              <TableCell align="right">
                {Math.round(linesAmount?.grossTotal * 100) / 100}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>GST Amount</TableCell>
              <TableCell align="right">{linesAmount?.taxAmt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Disc/Comm Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Discretional Discount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Lots of Sales Discount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>TDS Amount</TableCell>
              <TableCell align="right">{linesAmount?.tdsAmount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Advance Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Down Payment Amount</TableCell>
              <TableCell align="right">
                {linesAmount?.actualDownPayment}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Discounted Amount</TableCell>
              <TableCell align="right">
                {Math.round(linesAmount?.discountedAmount * 100) / 100}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Transaction Fees</TableCell>
              <TableCell align="right">
                {linesAmount?.upiAmt}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Interest Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Net Total (Nu)</TableCell>
              <TableCell align="right">
                {Math.round(linesAmount?.netAmount * 100) / 100}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LineItemsTable;
