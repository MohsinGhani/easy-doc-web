import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<typeof Button> {
  size?: "sm" | "default" | "lg" | "xl" | "icon";
  className?: string;
  text?: string;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fn?: (data: any) => void;
}

const CustomButton = ({
  size = "xl",
  className = "",
  text,
  children,
  variant = "default",
  type,
  loading = false,
}: ButtonProps) => {
  return (
    <Button
      disabled={loading}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {text || children}
    </Button>
  );
};

export default CustomButton;
