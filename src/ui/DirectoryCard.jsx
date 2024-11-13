import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Card,
  CardHeader,
} from "@mui/material";

const DirectoryCard = ({ name, empID, designation }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<AccountCircleIcon sx={{ fontSize: 40 }}  />}
        title={`${name} (${empID})`}
        subheader={designation}
        subheaderTypographyProps={{ sx: { fontSize: 12 } }}
      />
    </Card>
  );
};

export default DirectoryCard;
