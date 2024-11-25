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
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Selling Price</TableCell>
              <TableCell align="right">Tax Amount</TableCell>
              <TableCell align="right">Disc/Comm Amount</TableCell>
              <TableCell align="right">Additional Discount</TableCell>
              <TableCell align="right">TDS Amount</TableCell>
              <TableCell align="right">Advance Tax Amount</TableCell>
              <TableCell align="right">Discounted Amount</TableCell>
              <TableCell align="right">Line Item Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems?.length > 0 &&
              lineItems?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.description}</TableCell>
                  <TableCell align="right">{item?.qty}</TableCell>
                  <TableCell align="right">{item?.sellingPrice}</TableCell>
                  <TableCell align="right">{item?.taxAmt}</TableCell>
                  <TableCell align="right">{item?.discountedAmount}</TableCell>
                  <TableCell align="right">
                    {item?.additionalDiscount}
                  </TableCell>
                  <TableCell align="right">{item?.tdsAmount}</TableCell>
                  <TableCell align="right">{item?.advanceTaxAmount}</TableCell>
                  <TableCell align="right">{item?.discountedAmount}</TableCell>
                  <TableCell align="right">{item?.lineItemAmt}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", alignContent: "center" }}
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => deleteLineItemHandle(e, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={(e) => editLineItemHandle(e, item, index)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1}>Gross Total</TableCell>
              <TableCell align="right">{linesAmount?.grossTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Tax Amount</TableCell>
              <TableCell align="right">{linesAmount?.taxAmt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Disc/Comm Amount</TableCell>
              <TableCell align="right">
                {linesAmount?.discountedAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Discretional Discount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Lots of Sales Discount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>TDS Amount</TableCell>
              <TableCell align="right">{linesAmount?.tdsAmount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Advance Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Down Payment Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Advance Tax Amount</TableCell>
              <TableCell align="right">
                {linesAmount?.advanceTaxAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Interest Amount</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={9} />
              <TableCell colSpan={1} style={{ whiteSpace: 'nowrap' }}>Net Total (Nu)</TableCell>
              <TableCell align="right">{linesAmount?.netAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LineItemsTable;
