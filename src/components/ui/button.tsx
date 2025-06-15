
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-clash font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary-foreground hover:opacity-90 transition-all duration-200 font-clash font-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-clash font-medium",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground font-clash font-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-clash font-medium",
        ghost: "hover:bg-accent hover:text-accent-foreground font-clash font-medium",
        link: "text-primary underline-offset-4 hover:underline font-clash font-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Apply brand color for default variant
    const defaultStyle = variant === "default" ? {
      backgroundColor: 'rgba(57,107,255,1)',
      ...style
    } : style;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "font-clash font-medium")}
        style={defaultStyle}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
