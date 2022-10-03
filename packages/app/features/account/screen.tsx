import React, { useState } from "react";
import { Page, Button, TextInput } from "@remotelist/ui";

import { useAtomValue } from "jotai";
import { userAtom } from "@remotelist/data-access";

import { RiLogoutBoxRLine } from "react-icons/ri";

function Profile() {
  const user = useAtomValue(userAtom);
  return (
    <div>
      <TextInput
        label="Name"
        placeholder="name"
        value={user?.user_metadata.name}
      />
      <TextInput
        label="Email Address"
        placeholder="Email Address"
        value={user?.email}
      />
      <TextInput
        type="password"
        label="Update Password"
        placeholder="Password"
      />
      <TextInput
        type="password"
        placeholder="Confirm Password"
      />
    </div>
  )
}

function Notifications() {
  return (
    <div>
      <p>Notifications</p>
    </div>
  )
}

export function AccountScreen() {
  return (
    <Page 
      title="Account"
      tabs={[
        {
          title: "Settings",
          sections: [
            {
              title: "Profile",
              content: Profile()
            },
            {
              title: "Notifications",
              content: Notifications()
            }
          ]
        }
      ]}
      controls={(
        <Button icon={RiLogoutBoxRLine} variant="outlined" label="Sign Out" />
      )}
    />
  )
}