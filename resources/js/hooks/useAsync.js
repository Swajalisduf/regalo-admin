import {useCallback, useEffect, useState} from 'react'

export const useAsync = (asyncFunction, params = {}, immediate = true) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback((executeParams = params) => {
    setLoading(true);
    setValue(null);
    setError(null);
    return asyncFunction(executeParams)
      .then((response) => {
        setValue(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { error, execute, loading, value };
};

export default useAsync;
