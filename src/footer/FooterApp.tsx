import {
  DSProvider,
  Footer,
} from "@nypl/design-system-react-components";
import React from "react";

const FooterApp: any = ({ isTestMode = false }): any => {
  return (
    <DSProvider>
      <Footer />
    </DSProvider>
  );
};

export default FooterApp;
