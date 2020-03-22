import React from "react";
import { Row, Frame, Button, Loading } from "arwes";
import "axios";
import { config } from "../config";

function ToggleButton(device) {
  const axios = require("axios");

  const [isLoading, setIsLoading] = React.useState(false);

  const toggleDevice = () => {
    setIsLoading(true);

    axios
      .post(config.api_base + "/api/devices/power", {
        id: device.device.id
      })
      .then(function(response) {
        device.device.is_on = response.data.is_on;
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div
        style={{
          marginRight: "45px",
          paddingRight: "20px",
          paddingTop: "10px"
        }}
      >
        <Loading animate />
      </div>
    );
  } else {
    return (
      <div
        onClick={toggleDevice}
        style={{ paddingRight: "20px", paddingTop: "20px" }}
      >
        <Frame
          show
          animate={true}
          corners={0}
          layer={device.device.is_on ? "secondary" : "primary"}
        >
          <div style={{ display: "flex", padding: "20px 30px" }}>
            {device.device.is_on ? "☀️" : "🌑"}
          </div>
        </Frame>
      </div>
    );
  }
}

function DeviceCard(device) {
  return (
    <Row col s={12} m={6} offset={["m3"]}>
      <Frame show animate={true} level={3} corners={4} layer="primary">
        <div style={{ display: "flex", height: "115px" }}>
          <div style={{ flexGrow: "1", padding: "20px 20px" }}>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "Roboto"
              }}
            >
              {device.device.alias}
            </div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: "lighter",
                textTransform: "capitalize",
                fontFamily: "Roboto"
              }}
            >
              {device.device.type}
            </div>
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
