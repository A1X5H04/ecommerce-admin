import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormGroup {
  heading: string;
  description?: string;
  rootClassName?: string;
  className?: string;
  children: React.ReactNode;
}

function FormGroup({
  heading,
  description,
  className,
  rootClassName,
  children,
}: FormGroup) {
  return (
    <Card className={cn("border rounded-lg ", rootClassName)}>
      <CardHeader className="border-b mb-4 pb-4 space-y-0">
        <CardTitle className="text-lg font-semibold text-foreground">
          {heading}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("grid grid-cols-2 gap-8 w-full", className)}>
        {children}
      </CardContent>
    </Card>
  );
}

export default FormGroup;
