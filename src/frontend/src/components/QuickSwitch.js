import React from "react";
import { Row, Frame, Loading } from "arwes";
import { config } from "../config";

function QuickSwitch() {
  const axios = require("axios");

  const [isLoading, setIsLoading] = React.useState(false);

  const batchToggle = is_on => {
    setIsLoading(true);

    console.log(is_on);

    axios
      .post(config.api_base + "/api/devices/power/batch", {
        is_on: is_on
      })
      .then(function(response) {
        setIsLoading(false);
      })
      .catch(function(error) {
        console.error("Caught error in QuickSwitch!", error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="QuickSwitch-Loader">
        <Row col s={12} m={6} offset={["m3"]}>
          <Frame show animate={true} level={3} corners={4} layer="primary">
            <Loading animate />
          </Frame>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="QuickSwitch">
        <Row col s={12} m={6} offset={["m3"]}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flexGrow: "1",
                marginRight: "20px",
                textAlign: "center"
              }}
            >
              <Frame
                show
                animate={true}
                level={3}
                corners={4}
                layer="primary"
                onClick={() => {
                  batchToggle(true);
                }}
              >
                <h3
                  style={{
                    fontFamily: "Space Mono",
                    fontSize: "20px",
                    fontStyle: "italic"
                  }}
                >
                  All On
                </h3>
              </Frame>
            </div>
            <div style={{ flexGrow: "1" }}>
              <Frame
                show
                animate={true}
                level={3}
                corners={4}
                layer="primary"
                onClick={() => {
                  batchToggle(false);
                }}
              >
                <div style={{ paddingLeft: "10px", textAlign: "center" }}>
                  <h3
                    style={{
                      fontFamily: "Space Mono",
                      fontSize: "20px",
                      fontStyle: "italic"
                    }}
                  >
                    All Off
                  </h3>
                </div>
              </Frame>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default QuickSwitch;
