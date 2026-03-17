import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useCat, type Cat } from "./api"
import { getErrorMessage } from "#shared/getErrorMessage"

const CatsWrapper = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
          <div>{getErrorMessage(error)}</div>
        </>
      )}
    >
      <Suspense fallback={<CatsView />}>
        <CatsInner />
      </Suspense>
    </ErrorBoundary>
  )
}

const CatsInner = () => {
  const [cat, { refresh }] = useCat()
  if (!cat) return <CatsView />
  return <CatsView cat={cat} refresh={refresh} />
}

interface CatsViewProps {
  cat?: Cat
  refresh?: () => void
}

const CatsView = ({ cat, refresh }: CatsViewProps) => {
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

export default CatsWrapper
