import React, { memo } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneIcon from "@mui/icons-material/Done";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  alignItems: "center",
  "& .icon": {
    color: "inherit",
  },
  "&.Open, &.NotShipped": {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  "&.Received, &.Success, &.Approved, &.Active": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.Submitted": {
    color: (theme.vars || theme).palette.primary.dark,
    border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
  },
  "&.PartiallyFilled, &.In-Progress, &.In-Transit": {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  "&.Rejected, &.Failed, &.In_Active": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
}));

const Status = memo((props) => {
  const { status } = props;

  let icon = null;
  if (status === "Rejected") {
    icon = <ReportProblemIcon className="icon" />;
  } else if (status === "Open") {
    icon = <InfoIcon className="icon" />;
  } else if (
    status === "PartiallyFilled" ||
    status === "In-Progress" ||
    status === "In-Transit"
  ) {
    icon = <AutorenewIcon className="icon" />;
  } else if (status === "Received") {
    icon = <CallReceivedIcon className="icon" />;
  } else if (status === "Submitted") {
    icon = <ArrowUpwardIcon className="icon" />;
  } else if (status === "Not Shipped") {
    icon = <NotInterestedIcon className="icon" />;
  } else if (
    status === "Approved" ||
    status === "Success" ||
    status === "Active"
  ) {
    icon = <DoneIcon className="icon" />;
  } else if (status === "Failed" || status === "In_Active") {
    icon = <CloseIcon className="icon" />;
  }

  let label = status;
  if (status === "PartiallyFilled") {
    label = "Partially Filled";
  }
  if (status === "In_Active") {
    label = "In Active";
  }
  return (
    <StyledChip
      className={status === "Not Shipped" ? "NotShipped" : status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});

const RenderStatus = (params) => {
  // React.useEffect(() => {
  //   console.log(params);
  // });
  if (params?.status == null) {
    return "";
  }

  return <Status status={params?.status} />;
};

export default RenderStatus;
