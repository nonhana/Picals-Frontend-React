import { useState } from 'react'

function useLoading() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const handlePromise = async <T>(promise: Promise<T>) => {
    try {
      setLoading(true)
      const result = await promise
      return result
    }
    catch (error: any) {
      setError(error)
    }
    finally {
      setLoading(false)
    }
  }

  return { loading, error, handlePromise }
}

export { useLoading }
