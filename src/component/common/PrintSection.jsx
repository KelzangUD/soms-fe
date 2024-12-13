import React from "react";
import { IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const PrintSection = ({ exportExcel, exportPdf,handlePrint }) => {
  return (
    <>
      <IconButton aria-label="pdf" color="error" onClick={exportPdf}>
        <PictureAsPdfIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="excel" color="success" onClick={exportExcel}>
        <FileDownloadIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="print" color="primary" onClick={handlePrint}>
        <PrintIcon fontSize="inherit" />
      </IconButton>
    </>
  );
};

export default PrintSection;
