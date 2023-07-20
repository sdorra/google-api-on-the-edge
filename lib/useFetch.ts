import React, { useCallback, useState } from "react";

function stringifyError(err: unknown) {
  if (typeof err === "string") {
    return err;
  } else if (err instanceof Error) {
    return err.message;
  }
  return JSON.stringify(err);
}

export default function useFetch(url: string) {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState<number>();

  const reload = useCallback(
    async function loadData() {
      setTimeElapsed(undefined);
      setIsLoading(true);
      const start = performance.now();
      try {
        const res = await fetch(`${url}?cachebust=${start}`);
        setData(await res.text());
      } catch (e) {
        setError(stringifyError(e));
      } finally {
        setIsLoading(false);
        setTimeElapsed(performance.now() - start);
      }
    },
    [url]
  );

  React.useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, isLoading, timeElapsed, reload };
}
