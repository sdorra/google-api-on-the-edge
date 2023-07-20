"use client";

import useFetch from "@/lib/useFetch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  url: string;
  title: string;
  description: string;
};

function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

export default function FetchCard({ url, title, description }: Props) {
  const { isLoading, error, timeElapsed, reload } = useFetch(url);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {isLoading && <p className="text-2xl">Loading...</p>}
        {error && <p>Error: {error}</p>}
        {timeElapsed && (
          <p className="text-display font-bold text-4xl text-primary">
            {formatDuration(timeElapsed)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-right w-full">
          <Button variant="outline" onClick={reload}>
            Reload
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
