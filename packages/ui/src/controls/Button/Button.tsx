import { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

import { IconType } from "react-icons"

export enum ButtonSize {
  small = "small",
  large = "large",
}

export enum ButtonWidth {
  fill = "fill",
  content = "content",
}

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  secondaryTonal = "secondaryTonal",
  outlined = "outlined",
  link = "link",
}

type ButtonProps = {
  icon?: IconType;
  children?: ReactElement;
  className?: string;
  disabled?: boolean;
  href?: string;
  iconRight?: boolean;
  label?: string;
  loading?: boolean;
  onClick?: any;
  size?: ButtonSize | keyof typeof ButtonSize;
  testId?: string;
  variant: ButtonType | keyof typeof ButtonType;
  width?: ButtonWidth | keyof typeof ButtonWidth;
};

/* style for buttons */
const getButtonStyles = (variant: ButtonType | string) => [
  tw`
    flex
    items-center
    justify-center
    bg-red-600
    w-full
    appearance-none
    text-white
    outline-none 
    border-none 
    m-0 
    py-3 
    px-4 
    font-size[medium]
  `,
  variant === ButtonType.primary && tw`
    text-white 
    bg-red-600
    dark:text-black 
    dark:bg-white
    `,
  variant === ButtonType.secondary && tw`
    text-white 
    bg-red-600
    dark:bg-red-600
    dark:text-white
  `,
  variant === ButtonType.outlined && tw`
    bg-transparent
    text-white
    border[1px solid]
    border-remotelist-60
    border-radius[0.3rem]
  `,
];

const Container = styled.button<ButtonProps>`
  ${({ variant }: any) => getButtonStyles(variant)}
`

export const Button = ({ icon, label, variant, ...props }: ButtonProps) => {
  return (
    <Container 
      variant={variant} 
      {...props}
    >
      {icon && <span tw="mr-3">{icon({ size: 20 })}</span>}
      <span>{label}</span>
    </Container>
  );
};