import { useState } from "react";
import { Filter } from "./Filter";

import tw from "twin.macro";

function Selectable({ state, setState, label }: any) {
  return (
    <label className="selectable" tw="flex[1] mr-2 last:mr-0">
      <input
        type="checkbox"
        checked={state}
        onChange={() => setState(!state)}
        style={{ display: 'none' }}
      />
      <div css={[
        tw`height[50px] flex flex[1] items-center justify-center px-4 white-space[nowrap] font-size[0.9rem] text-white border[1px solid] border-remotelist-60 rounded-lg cursor-pointer`,
        state && tw`bg-remotelist-60/50 text-white border-white`
      ]}>{label}</div>
    </label>
  );
}

export function JobType() {
  const [contract, setContract] = useState(true);
  const [partTime, setPartTime] = useState(true);
  const [fullTime, setFullTime] = useState(true);
  
  return (
    <Filter title="Job Type">
      <div tw="flex flex[1] flex-row">
        <Selectable
          state={contract}
          setState={setContract}
          label="Contract"
        />
        <Selectable
          state={partTime}
          setState={setPartTime}
          label="Part Time"
        />
        <Selectable
          state={fullTime}
          setState={setFullTime}
          label="Full Time"
        />
      </div>
    </Filter>
  )
}