import React from "react";
import "axios";
import { Loading } from "arwes";
import QuickSwitch from "./QuickSwitch";
import DeviceCard from "./DeviceCard";
import { config } from "../config";

function PageContent() {
  const axios = require("axios");

  const [devices, setDevices] = React.useState([]);
  const [apiError, setApiError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        let result = await axios.get(config.api_base + "/api/devices/");
        setDevices(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Caught Error! - ", error);
        setApiError(error.message);
      }
    }

    fetchData().catch(console.error);
  }, [axios]);

  if (apiError) {
    return (
      <div>
        <br />
        We got an Error! - {JSON.stringify(apiError)}
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div className="PageContent">
          <Loading animate />
        </div>
      );
    } else {
      return (
        <div className="PageContent" style={{ paddingTop: "30px" }}>
          <QuickSwitch />
          {devices.map((device, key) => (
            <DeviceCard device={device} key={key} />
          ))}
        </div>
      );
    }
  }
}

export default PageContent;
