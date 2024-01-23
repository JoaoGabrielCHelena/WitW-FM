"use client"

import styles from "./home.module.css"
  
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className={styles.errorLoading}>
        <h2>Something went wrong!</h2>
        <div className={styles.row}>
          <button
              onClick={
              () => reset()
              }
          >
              Try again
          </button>
          <a href="/">
              Go to home
          </a>
        </div>
    </div>
  )
}