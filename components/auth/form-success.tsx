import { CheckCircle2 } from "lucide-react";

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p
      className="bg-teal-400/25 text-secondary-foreground text-xs font-medium my-4 p-3 rounded flex gap-2 items-center"
      role="alert"
    >
      <CheckCircle2 className="w-4 h-4" />
      <p>{message}</p>
    </p>
  );
};
