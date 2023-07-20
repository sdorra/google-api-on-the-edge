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

type Props = {
  url: string;
  title: string;
  description: string;
};

export default function FetchCard({ url, title, description }: Props) {
  const { isLoading, error, timeElapsed, reload } = useFetch(url);
  return (
    <Card className="flex flex-col">
      <CardHeader className="h-32">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        {isLoading && <p className="text-4xl font-bold">Loading...</p>}
        {error && <p>Error: {error}</p>}
        {timeElapsed && (
          <p className="text-display font-bold text-4xl text-primary">
            {formatDuration(timeElapsed)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-right w-full">
          <Button disabled={isLoading} variant="outline" onClick={reload}>
            Reload
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
