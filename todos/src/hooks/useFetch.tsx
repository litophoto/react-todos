import { useEffect, useState } from "react";

interface Options {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  initialCache?: boolean;
}
const defaultOptions: Options = {
  method: "GET",
}

export const useFetch = <T,>(url: string, options: Options = defaultOptions) => {
  const [data, setData] = useState<T>(); // <-- Generics で受け取った型を data の型とする
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (options.method === "GET") {
      (async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setData(data);
        } catch (err) {
          console.error(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    } else if (options.method === "POST" || "PUT") {
      async () => {
        try {
          const res = await fetch(url, {
            method: options.method,
            body: options.body,
          });
          const data = await res.json();
          setData(data);
        } catch (err) {
          console.error(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
    }
  }, []);

  return { data, isLoading, isError };
};
