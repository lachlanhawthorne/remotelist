import tw from "twin.macro";
import { ChevronDown } from "react-feather";

const FilterContainer = tw.div`
  height[100%]
  min-width[130px]
  flex
  flex-row
  items-center
  justify-center
  px-5
  text-remotelist-80

  border-top[1px solid]
  border-bottom[1px solid]
  border-right[1px solid]
  border-remotelist-60
  last:border-top-right-radius[5px]
  last:border-bottom-right-radius[5px]
  active:box-shadow[0 0 0 1px #fff]
  user-select[none]
`;


const Container = tw.div`
  flex
  flex-col
  text-right
  items-start
  justify-center
  mr-3
`

const Title = tw.span`
  flex
  uppercase
  margin-bottom[3px]
  font-size[0.75rem]
`

type SearchFilterProps = {
  title: string
  children: React.ReactNode
}

export function SearchFilter({ title, children }: SearchFilterProps) {
  return (
    <FilterContainer>
      <Container>
        <Title>{title}</Title>
        {children}
      </Container>
      <ChevronDown size={16} />
    </FilterContainer>
  )
}