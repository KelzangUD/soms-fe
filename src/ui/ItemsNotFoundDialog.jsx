import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,

} from "@mui/material";

const ItemsNotFoundDialog = ({ open, setOpen, itemsNoFound }) => {
  return (
    <Dialog open={open}>
      <DialogTitle id="dialog-title">
        Total Serial No. Not Found: {itemsNoFound?.length}
      </DialogTitle>
      <DialogContent>
        {itemsNoFound?.map((item, index) => (
          <DialogContentText
            id={item?.serialNo || index}
            key={item?.serialNo || index}
          >
            {`Serial No: ${item?.serialNo}`}
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", mr: 1, my: 1 }}>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemsNotFoundDialog;
