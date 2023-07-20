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
import { formatDuration } from "@/lib/utils";
import invalidateISR from "@/lib/invalidateISR";

type Props = {
  url: string;
  title: string;
  description: string;
  invalidate?: boolean;
};

export default function FetchCard({
  url,
  title,
  description,
  invalidate,
}: Props) {
  const { isLoading, error, timeElapsed, reload } = useFetch(url);

  return (
    <Card className="flex flex-col">
      <CardHeader className="h-32">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        {isLoading && <p className="text-4xl font-bold">Loading...</p>}
        {error && <p className="text-destructive font-bold">Error: {error}</p>}
        {timeElapsed && (
          <p className="text-display font-bold text-4xl text-primary">
            {formatDuration(timeElapsed)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-right w-full space-x-2">
          {invalidate && (
            <form action={invalidateISR} className="inline-block">
              <Button disabled={isLoading} variant="outline" type="submit">
                Invalidate
              </Button>
            </form>
          )}
          <Button disabled={isLoading} variant="outline" onClick={reload}>
            Reload
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
