import React, { useState } from "react";
import { Page, JobCollection } from "@remotelist/ui";

function SavedJobs() {
  return (
    <div>
      <JobCollection 
        jobs={[
          {
            title: "Software Engineer",
            organisation: "RemoteList",
            location: "London",
            type: "Full Time",
            salary: "$120k - $130k",
          },
          {
            title: "Front End Devleoper",
            organisation: "RemoteList",
            location: "Brisbane",
            type: "Full Time",
            salary: "$120k - $130k",
          },
          {
            title: "Front End Devleoper",
            organisation: "RemoteList",
            location: "Brisbane",
            type: "Full Time",
            salary: "$120k - $130k",
          },
          {
            title: "Front End Devleoper",
            organisation: "RemoteList",
            location: "Brisbane",
            type: "Full Time",
            salary: "$120k - $130k",
          },
          {
            title: "Front End Devleoper",
            organisation: "RemoteList",
            location: "Brisbane",
            type: "Full Time",
            salary: "$120k - $130k",
          }
        ]}
      />
    </div>
  )
}

function UnreadSavedJobs() {
  return (
    <div>
      <h1>Unread Job Listing</h1>
      <p>Hello, world</p>
    </div>
  )
}

function SavedSearches() {
  return (
    <div>
      <h1>Saved Searches</h1>
    </div>
  )
}

function RecentSearches() {
  return (
    <div>
      <h1>Recent Searches</h1>
    </div>
  )
}

export function SavedScreen() {
  return (
    <Page 
      title="Saved"
      filters={true}
      tabs={[
        {
          title: "Jobs",
          sections: [
            {
              title: "All",
              content: SavedJobs()
            },
            {
              title: "Unread",
              content: UnreadSavedJobs()
            },
            {
              title: "Upcoming",
              content: SavedSearches()
            },
            {
              title: "Archive",
              content: RecentSearches()
            }
          ]
        },
        {
          title: "Searches",
          sections: [
            {
              title: "All",
              content: SavedSearches()
            },
            {
              title: "Recent",
              content: RecentSearches()
            }
          ]
        }
      ]}
    />
  )
}