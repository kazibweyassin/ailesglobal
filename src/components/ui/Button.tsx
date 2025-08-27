import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 active:bg-primary-700",
        primary: "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 active:bg-primary-700",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500 active:bg-secondary-700",
        destructive: "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500 active:bg-error-700",
        outline: "border-2 border-primary-500 text-primary-600 bg-white hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100 shadow-none hover:shadow-sm",
        ghost: "text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500 active:bg-primary-100 shadow-none hover:shadow-none",
        link: "text-primary-600 underline-offset-4 hover:underline shadow-none hover:shadow-none",
        success: "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500 active:bg-success-700",
        warning: "bg-warning-500 text-white hover:bg-warning-600 focus-visible:ring-warning-500 active:bg-warning-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
