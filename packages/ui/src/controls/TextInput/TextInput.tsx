import tw from "twin.macro";

const Container = tw.div`
  width[100%]
  max-width[400px]
  flex
  flex-col
  items-start
  justify-center
`;

const Input = tw.input`
  width[100%]
  min-width[unset]
  flex
  bg-transparent
  appearance-none
  outline-none
  font-size[larger]
  text-gray-50
  placeholder:text-remotelist-80
  bg-remotelist-dark
  py-4
  px-5
  my-2
  border[1px solid]
  border-remotelist-60
  border-radius[0.3rem]
  focus:border-white
`;

type TextInputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export function TextInput({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  label,
  ...props
}: TextInputProps) {

  return (
    <Container>
      {label && <label tw="text-remotelist-80 font-size[1.2rem] mb-3">{label}</label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
    </Container>
  )
}