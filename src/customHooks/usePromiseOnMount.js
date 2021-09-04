import { useEffect, useState } from "react";

export default function usePromiseOnMount(promiseOrFunction, defaultValue) {
  const [state, setState] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const promise =
      typeof promiseOrFunction === "function"
        ? promiseOrFunction()
        : promiseOrFunction;

    let isSubscribed = true;
    promise
      .then((value) => {
        setState(value.data);
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setState(defaultValue);
        setError(error);
        setIsPending(false);
      });

    return () => (isSubscribed = false);
  }, []);

  return [state, setState, error, setError, isPending, setIsPending];
}
