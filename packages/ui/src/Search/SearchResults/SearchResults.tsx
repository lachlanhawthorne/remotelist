import tw, { theme } from "twin.macro";
import { Grid, _ } from "gridjs-react";
import { RiBookmarkLine } from "react-icons/ri";

import { headerVisibleAtom } from "@remotelist/data-access";
import { useAtomValue } from "jotai";

import "./GridStyles";

import { useMotionValue, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

function GridLink({ href, children, router }: any) {
  return (
    <a 
      href={href}
      onClick={(e: any) => {
      if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        router.prefetch(href);
        router.push(href);
      }}
    >
      {children}
    </a>
  )
}


export function SearchResults() {
  const headerVisible = useAtomValue(headerVisibleAtom);

  const [gridTopRef, gridTopInView] = useInView({
    threshold: 0,
    // rootMargin: "-105px"
  });

  const data = useMemo(() => {
    return [
      {
        id: 1,
        title: "User Interfece Designer / Front End Developer",
        organisation: "EthicalJobs",
        location_name: "Naarm",
        location_secondary_name: "Melbourne, VIC",
        bookmarked: false,
        posted: "1 day ago",
      },
      {
        id: 2,
        title: "Front End Developer",
        organisation: "Linktree",
        location_name: "Meanjin",
        location_secondary_name: "Brisbane, QLD",
        bookmarked: false,
        posted: "4 days ago",
      },
      {
        id: 3,
        title: "React Native Developer",
        organisation: "Bunnings",
        location_name: "Waarang",
        location_secondary_name: "Sydney, NSW",
        bookmarked: false,
        posted: "1 week ago",
      },
      {
        id: 4,
        title: "Full Stack Developer",
        organisation: "Coles Group",
        location_name: "Boorloo",
        location_secondary_name: "Perth, WA",
        bookmarked: false,
        posted: "1 week ago",
      },
      {
        id: 5,
        title: "User Interfece Designer / Front End Developer",
        organisation: "EthicalJobs",
        location_name: "Naarm",
        location_secondary_name: "Melbourne, VIC",
        bookmarked: false,
        posted: "1 day ago",
      },
      {
        id: 6,
        title: "Front End Developer",
        organisation: "Linktree",
        location_name: "Meanjin",
        location_secondary_name: "Brisbane, QLD",
        bookmarked: false,
        posted: "4 days ago",
      },
      {
        id: 7,
        title: "React Native Developer",
        organisation: "Bunnings",
        location_name: "Waarang",
        location_secondary_name: "Sydney, NSW",
        bookmarked: false,
        posted: "1 week ago",
      },
      {
        id: 8,
        title: "Full Stack Developer",
        organisation: "Coles Group",
        location_name: "Boorloo",
        location_secondary_name: "Perth, WA",
        bookmarked: false,
        posted: "1 week ago",
      },
      {
        id: 9,
        title: "Digital Designer",
        organisation: "AESOP",
        location_name: "Naarm",
        location_secondary_name: "Melbourne, VIC",
        bookmarked: false,
        posted: "3 weeks ago",
      },
      {
        id: 10,
        title: "Digital Designer",
        organisation: "Tesltra",
        location_name: "Waarang",
        location_secondary_name: "Sydney, NSW",
        bookmarked: false,
        posted: "1 month ago",
      },
      {
        id: 11,
        title: "Digital Designer",
        organisation: "Tesltra",
        location_name: "Boorloo",
        location_secondary_name: "Perth, WA",
        bookmarked: false,
        posted: "1 month ago",
      },
      {
        id: 12,
        title: "Senior Web Developer",
        organisation: "Optus",
        location_name: "Boorloo",
        location_secondary_name: "Perth, WA",
        bookmarked: false,
        posted: "1 month ago",
      },
    ]
  }, [])

  // TODO: change this for astro to jotai atom 

  const x = useMotionValue(1)

  useEffect(() => {
    const gridHeadingOpacity = animate(
      x,
      gridTopInView ? 1 : headerVisible ? 0 : 1,
      {
        type: "tween",
        duration: 0.333,
        onUpdate: ((latest) => 
          document.documentElement.style.setProperty(
            "--gridjs-header-opacity", 
            latest.toString()
          )
        )
      }
    )

    return gridHeadingOpacity.stop
  }, [
    gridTopInView,
    headerVisible
  ])

  const router = useRouter();

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <div ref={gridTopRef} style={{ height: 1, width: '100%' }} />

      <Grid
        columns={[
          'Title',
          'Organisation',
          'Location',
          'Saved',
        ]}
        pagination={{
          enabled: true,
          limit: 10,
        }}
        sort={true}
        style={{
          container: {
            color: '#fff',
            width: '100%',
            minWidth: '100%',
          },
          table: {
            width: '100%',
            minWidth: '100%',
          },
          th: {
            position: 'sticky',
            top: 115,
            marginBottom: 260,
            border: 'none',
            fontWeight: 400,
            textTransform: 'uppercase',
            fontSize: '1rem',
            color: theme("colors.remotelist.80"),
            opacity: 'var(--gridjs-header-opacity)',
          },
          td: {
            border: 'none',
            padding: '25px',
            paddingLeft: 0,
            paddingRight: 0
          },
          footer: {
            border: 'none',
            boxShadow: 'none',
            borderTop: '1px solid',
            borderColor: theme("colors.remotelist.60"),
            paddingTop: '1.5rem'
          }
        }}
        search={true}
        // server={{
        //   url: 'https://search.remotel.ist/indexes/jobs/search',
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer lpT1v8S0be3a61c156365b686eafcacb58df17375d3621b1b97ed59eb8f62ab519e409bf`,
        //   },
        //   then: data => data.hits.map((job: any) => [job.title, job.organisation]),
        //   total: (data) => data.count
        // }}
        // search={{
        //   server: { 
        //     url: (prev, keyword) => `${prev}?q=${keyword}`
        //   }
        // }}
        data={data.map((job: any) => [
          _(
            <div>
              <GridLink href="/jobs/remotelist/front-end-developer-24" router={router}>
                <div className="group" tw="flex flex-col cursor-pointer">
                  <h3 tw="font-size[1.3rem] margin[0] font-weight[500] group-hover:underline">{job.title}</h3>
                  <p tw="font-size[1.1rem] margin[0] mt-2 font-weight[400] text-remotelist-80">Full Time &middot; $120k - $140k</p>
                </div>
              </GridLink>
            </div>
          ),
          _(<div tw="flex flex-col">
            <GridLink href="/organisations/linktree" router={router}>
              <span tw="font-size[1.2rem] cursor-pointer hover:underline">{job.organisation}</span>
            </GridLink>
            <span tw="font-size[1.1rem] mt-1 text-remotelist-80">1 week ago</span>
          </div>),

          _(<div tw="flex flex-col">
            <GridLink href="/locations/naarm" router={router}>
              <span tw="font-size[1.2rem] cursor-pointer hover:underline">{job.location_name}</span>
            </GridLink>
            <span tw="font-size[1.1rem] mt-1 text-remotelist-80">{job.location_secondary_name}</span>
          </div>),

          _(<div tw="flex items-center justify-end text-remotelist-80"><RiBookmarkLine size={24} /></div>)
        ])}
        // data={data}
        width={'100%'}
        autoWidth={true}
      />
    </div>
  )
}