import React from "react";
import { Loading } from "arwes";
import "axios";
import DeviceCard from "./DeviceCard";

function PageContent() {
  const axios = require("axios");

  const [devices, setDevices] = React.useState([]);
  const [apiError, setApiError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        let result = await axios.get("http://127.0.0.1:8421/api/devices/");
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
          {devices.map((device, key) => (
            <DeviceCard device={device} key={key} />
          ))}
        </div>
      );
    }
  }
}

export default PageContent;
