import {
  DSProvider,
  Header,
} from "@nypl/design-system-react-components";
import React from "react";

const HeaderApp: any = ({ isTestMode = false }): any => {
  return (
    <DSProvider>
      <Header
        fetchSitewideAlerts={!isTestMode}
        isProduction={!isTestMode}
      />
    </DSProvider>
  );
};

export default HeaderApp;