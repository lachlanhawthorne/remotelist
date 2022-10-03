import tw from "twin.macro";

const FilterContainer = tw.div`
  flex
  flex-col
  flex[1]
`;

const FilterTitle = tw.h3`
  text-sm
  uppercase
  text-remotelist-80
  font-weight[400]
`;

type FiltersProps = {
  title: string;
  children: React.ReactNode;
};

export function Filter({ title, children }: FiltersProps) {
  return (
    <FilterContainer>
      <FilterTitle>{title}</FilterTitle>
      {children}
    </FilterContainer>
  )
}