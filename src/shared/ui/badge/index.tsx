import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-md border border-[var(--sidebar-border)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] shadow hover:bg-[oklch(from_var(--primary)_l_c_h_/_.8)]",
                secondary:
                    "border-transparent bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[oklch(from_var(--secondary)_l_c_h_/_.8)]",
                destructive:
                    "border-transparent bg-[var(--destructive)] text-white shadow hover:bg-[oklch(from_var(--destructive)_l_c_h_/_.8)]",
                outline: "text-[var(--foreground)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }