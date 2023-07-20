import React, { useCallback, useState } from "react";
import { stringifyError } from "./utils";

export default function useFetch(url: string) {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState<number>();

  const reload = useCallback(
    async function loadData() {
      setTimeElapsed(undefined);
      setError(undefined);
      setIsLoading(true);
      const start = performance.now();
      try {
        const res = await fetch(`${url}?cachebust=${start}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
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
