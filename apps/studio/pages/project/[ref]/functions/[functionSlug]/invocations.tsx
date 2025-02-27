import { useParams } from 'common'

import LogsPreviewer from 'components/interfaces/Settings/Logs/LogsPreviewer'
import FunctionsLayout from 'components/layouts/FunctionsLayout/FunctionsLayout'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { useEdgeFunctionQuery } from 'data/edge-functions/edge-function-query'
import type { NextPageWithLayout } from 'types'

/**
 * Placeholder page for logs previewers until we figure out where to slot them
 */
export const LogPage: NextPageWithLayout = () => {
  const { ref, functionSlug } = useParams()
  const { data: selectedFunction, isLoading } = useEdgeFunctionQuery({
    projectRef: ref,
    slug: functionSlug,
  })

  if (selectedFunction === undefined || isLoading) return null

  return (
    <LogsPreviewer
      condensedLayout
      projectRef={ref as string}
      queryType={'fn_edge'}
      filterOverride={{ function_id: selectedFunction.id }}
      filterPanelClassName="px-0"
    />
  )
}

LogPage.getLayout = (page) => (
  <DefaultLayout>
    <FunctionsLayout>{page}</FunctionsLayout>
  </DefaultLayout>
)

export default LogPage
