import * as React from "react";

export function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-white text-gray-900 rounded-xl border shadow-sm flex flex-col gap-4 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`px-4 pt-4 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.ComponentProps<"h4">) {
  return <h4 className={`text-lg font-semibold ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: React.ComponentProps<"p">) {
  return <p className={`text-sm text-gray-600 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`px-4 pb-4 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`px-4 pb-4 border-t flex justify-end ${className}`} {...props} />;
}
