import React from "react";
import { Row, Frame } from "arwes";

function QuickSwitch() {
  return (
    <div className="QuickSwitch">
      <Row col s={12} m={6} offset={["m3"]}>
        <div style={{ display: "flex" }}>
          <div
            style={{ flexGrow: "1", marginRight: "20px", textAlign: "center" }}
          >
            <Frame show animate={true} level={3} corners={4} layer="primary">
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
            <Frame show animate={true} level={3} corners={4} layer="primary">
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

export default QuickSwitch;
