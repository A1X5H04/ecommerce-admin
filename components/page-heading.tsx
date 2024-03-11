import React from "react";

interface PageHeadingProps {
  title: string;
  description: string;
}

function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default PageHeading;
