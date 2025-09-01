import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { CustomDataTable } from "../../component/common/index";
import { all_item_columns } from "../../data/static";
import Route from "../../routes/Route";
import { useCommon } from "../../contexts/CommonContext";
import { LoaderDialog, Notification } from "../../ui/index";
import EditPricing from "./EditPricing";

const PricingDetails = () => {
  const { isMdUp } = useCommon();
  const access_token = localStorage.getItem("access_token");
  const [details, setDetails] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [edit, setEdit] = useState(false);
  const fetchAllItems = async () => {
    setIsLoading(true);
    try {
      const res = await Route(
        "GET",
        `/Pricing/Fetch_All_Pricing_Details`,
        access_token,
        null,
        null
      );
      if (res?.status === 200) {
        setAllItems(
          res?.data?.map((item, index) => ({
            sl: index + 1,
            id: index,
            ...item,
          }))
        );
      }
    } catch (err) {
      setNotificationMessage("Error Fetching Items");
      setSeverity("error");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const editHandle = (params) => {
    setDetails(params?.row);
    setEdit(true);
  };

  const columns = all_item_columns(isMdUp, editHandle);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <CustomDataTable
                    rows={allItems?.map((item, index) => ({
                      sl: index + 1,
                      ...item,
                    }))}
                    cols={columns}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoaderDialog open={isLoading} />}
      {showNotification && severity === "error" && (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={notificationMessage}
          severity={severity}
        />
      )}
      {edit && <EditPricing open={edit} setOpen={setEdit} details={details} fetchAllItems={fetchAllItems} />}
    </>
  );
};

export default PricingDetails;
