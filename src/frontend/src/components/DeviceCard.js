import React from "react";
import { Row, Frame, Button, Loading } from "arwes";
import "axios";

function ToggleButton(device) {
  const axios = require("axios");

  const [isLoading, setIsLoading] = React.useState(false);

  const toggleDevice = () => {

    setIsLoading(true);

    axios
      .post("http://127.0.0.1:8421/api/devices/power", {
        id: device.device.id
      })
      .then(function(response) {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div style={{ marginRight: "75px" }}>
        <Loading animate />
      </div>
    );
  } else {
    return (
      <div style={{ marginRight: "40px", marginTop: "20px" }}>
        <Button animate onClick={toggleDevice}>
          ON
        </Button>
      </div>
    );
  }
}

function DeviceCard(device) {
  return (
    <Row col s={12} m={6} offset={["m3"]}>
      <Frame show animate={true} level={3} corners={4} layer="primary">
        <div style={{ display: "flex", padding: "20px 20px" }}>
          <div style={{ flexGrow: "1" }}>
            <div style={{ fontSize: "27px" }}>{device.device.alias}</div>
            <div>{device.device.type}</div>
          </div>
          <div>
            <ToggleButton device={device.device} />
          </div>
        </div>
      </Frame>
    </Row>
  );
}

export default DeviceCard;
