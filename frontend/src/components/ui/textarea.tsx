import { TextareaHTMLAttributes, FC } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea: FC<TextareaProps> = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
