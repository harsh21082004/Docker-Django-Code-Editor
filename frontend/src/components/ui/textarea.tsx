export function Textarea({ className = "", ...props }: any) {
  return (
    <textarea
      className={`rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}