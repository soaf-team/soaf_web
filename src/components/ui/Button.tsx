import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-[16px] 
   w-full ring-offset-background transition-colors`,
  {
    variants: {
      variant: {
        primary: "bg-main_gradient text-white",
        primary_disabled: "bg-gray100 text-white",
        secondary: "bg-gray50 text-black",
        warn: "bg-warn text-white",
        ghost: "bg-transparent tex-black",
      },
      size: {
        md: "h-[52px] head6sb",
        sm: "h-[48px] head6sb",
        xs: "h-[42px] head6sb",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
