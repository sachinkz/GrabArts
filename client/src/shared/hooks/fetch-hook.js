import { useState, useCallback } from 'react'

export const useFetch =()=> {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const sendRequest = useCallback(
      async (url,method = "GET",headers = {}, body = null) => {
        try {
          setIsLoading(true)
          const result = await fetch(url,
            method,
            headers,
            body,
          )

          const data =await result.json()
            if (!result.ok)
            {
            throw new Error(data.message)
            }
          setIsLoading(false)
          return data
        } catch (err)
        {
            setError(err.message)
            setIsLoading(false)
            throw err
        }
      },
      []
    )

    const clearError = () => {
        setError(null);
    }

    return {isLoading,error,clearError,sendRequest}
}