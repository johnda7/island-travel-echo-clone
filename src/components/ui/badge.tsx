/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        ghost: "border-transparent text-foreground bg-transparent hover:bg-muted/60",
        success:
          "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
        warning:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100/80",
        info:
          "border-transparent bg-sky-100 text-sky-800 hover:bg-sky-100/80",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Badge({ className, variant, size, leftIcon, rightIcon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leftIcon ? (
        <span className="mr-1.5 -ml-0.5 inline-flex items-center" aria-hidden>
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className="ml-1.5 -mr-0.5 inline-flex items-center" aria-hidden>
          {rightIcon}
        </span>
      ) : null}
    </div>
  )
}

export { Badge, badgeVariants }
