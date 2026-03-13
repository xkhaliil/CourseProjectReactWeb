import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useCat, type Cat } from "./api"

const Wrapper: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
          <div>{getErrorMessage(error)}</div>
        </>
      )}
    >
      <Suspense fallback={<PlayView />}>
        <Play />
      </Suspense>
    </ErrorBoundary>
  )
}

const Play: React.FC = () => {
  const [cat, { refresh }] = useCat()
  if (!cat) return <PlayView />
  return <PlayView cat={cat} refresh={refresh} />
}

const PlayView: React.FC<{ cat?: Cat; refresh?: () => void }> = ({
  cat,
  refresh,
}) => {
  return (
    <>
      <div>
        <button disabled={!refresh} onClick={() => refresh?.()}>
          Get new Cat!
        </button>
      </div>
      {cat ? (
        <img src={cat.url} width="512" />
      ) : (
        <div style={{ width: "512px", height: "512px", background: "gray" }} />
      )}
    </>
  )
}

export default Wrapper

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return `Error: ${error.message}`
  }
  return "Something went wrong."
}