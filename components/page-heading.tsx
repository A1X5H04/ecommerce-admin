import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeadingProps {
  backUrl?: string;
  heading: string;
  subheading: string;
  children: React.ReactNode;
}

function PageHeading({
  backUrl,
  heading,
  subheading,
  children,
}: PageHeadingProps) {
  return (
    <div className="pt-6 pb-4">
      {backUrl && (
        <Link
          className="group inline-flex items-center text-muted-foreground text-sm"
          href={backUrl}
        >
          <ArrowLeft className="inline-block mr-2" size={16} />
          <span className="group-hover:underline">Back to {backUrl}</span>
        </Link>
      )}
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter mb-0.5">
            {heading}
          </h2>
          <p className="text-muted-foreground">{subheading}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default PageHeading;
