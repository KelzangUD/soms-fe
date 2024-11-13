import React, { memo } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneIcon from "@mui/icons-material/Done";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  alignItems: "center",
  "& .icon": {
    color: "inherit",
  },
  "&.Open": {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  "&.Received": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.Submitted": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.PartiallyFilled": {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  "&.Rejected": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
  "&.NotShipped": {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
}));

const Status = memo((props) => {
  const { status } = props;

  let icon = null;
  if (status === "Rejected") {
    icon = <ReportProblemIcon className="icon" />;
  } else if (status === "Open") {
    icon = <InfoIcon className="icon" />;
  } else if (status === "PartiallyFilled") {
    icon = <AutorenewIcon className="icon" />;
  } else if (status === "Received") {
    icon = <CallReceivedIcon className="icon" />;
  } else if (status === "Submitted") {
    icon = <DoneIcon className="icon" />;
  } else if (status === "Not Shipped") {
    icon = <NotInterestedIcon className="icon" />;
  }

  let label = status;
  if (status === "PartiallyFilled") {
    label = "Partially Filled";
  }

  return (
    <StyledChip
      className={status === 'Not Shipped' ? 'NotShipped' : status}
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
