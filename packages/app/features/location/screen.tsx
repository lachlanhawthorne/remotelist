import React from "react";
import { Page } from "@remotelist/ui";

export function LocationScreen() {
  return (
    <Page 
      title="Location"
      tabs={[
        {
          title: "Locations",
          sections: [{
            title: "Locations",
            items: [{
              title: "Locations",
              description: "Locations",
            }]
          }]
          // icon: "map-marker",
        },
      ]}
    />
  );
}