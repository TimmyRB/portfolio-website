import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function SlidingButton({
  icon,
  text,
  ...props
}: {
  icon?: React.ReactNode;
  text: string;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${props.className ?? ""}`}
      style={{ minWidth: `${text.length * 0.65}em` }}
    >
      <div className="opacity-0 pointer-events-none whitespace-nowrap">
        {text}
      </div>
      <AnimatePresence initial={false}>
        {!hovered && (
          <motion.span
            key="text"
            initial={{ x: "150%", opacity: 0 }}
            animate={{ x: "-50%", opacity: 1 }}
            exit={{ x: "150%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            {text}
          </motion.span>
        )}

        {hovered && icon && (
          <motion.span
            key="icon"
            initial={{ x: "-150%", opacity: 0 }}
            animate={{ x: "-50%", opacity: 1 }}
            exit={{ x: "-150%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-y-1/2"
          >
            {icon}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
