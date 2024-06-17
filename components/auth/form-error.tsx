import { AlertCircleIcon } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p
      className="bg-destructive/25 text-secondary-foreground text-xs font-medium my-4 p-3 rounded flex gap-2 items-center"
      role="alert"
    >
      <AlertCircleIcon className="w-4 h-4" />
      <p>{message}</p>
    </p>
  );
};
