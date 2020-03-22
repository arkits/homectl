import React from "react";
import { ThemeProvider, createTheme, Arwes, Header } from "arwes";
import PageContent from "./components/PageContent";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={createTheme()}>
        <Arwes animate>
          <div style={{ padding: 20 }}>
            <div>
              <Header animate>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "Space Mono",
                    fontStyle: "italic"
                  }}
                >
                  ~/home-dashboard
                </h2>
              </Header>
            </div>
            <PageContent />
          </div>
        </Arwes>
      </ThemeProvider>
    </div>
  );
}

export default App;
