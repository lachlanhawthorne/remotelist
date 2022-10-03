// TODO: Convert to _app.tsx
// & Astro equivalent

import React from "react";
import ReactDOM from 'react-dom/client';
import { Button } from "./controls/Button";

import "./index.css";
import "virtual:windi.css"; //this is added for devtools to work
import "virtual:windi-devtools"; //https://windicss.org/integrations/vite.html#design-in-devtools

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Button variant="primary" />
    <Button variant="secondary" />
  </React.StrictMode>
);
