import React from "react";
import { Page } from "@remotelist/ui";

export function OrganisationScreen() {
  return (
    <Page 
      title="Organisation"
      tabs={[
        {
          title: "Organisation",
          sections: [{
            title: "Organisation",
            items: [{
              title: "Organisation",
              description: "Organisation",
            }]
          }]
          // icon: "map-marker",
        },
      ]}
    />
  );
}