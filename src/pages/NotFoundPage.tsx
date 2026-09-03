import Action from '../components/Action'
import Page from '../components/Page'
import Panel from '../components/Panel'

/** Shown when a URL does not match any page. */
export default function NotFoundPage() {
  return (
    <Page title="Not found">
      <Panel className="flex flex-col items-center px-8 py-20 text-center">
        <p className="eyebrow">Off the map</p>

        <h1 className="mt-4 text-4xl">No permission granted</h1>

        <p className="prose-note mt-4 max-w-md">
          Hey what are you doing here? Super bad...
        </p>

        <div className="mt-9">
          <Action label="Back to the Intro" href="/" variant="gold" icon="arrowRight" />
        </div>
      </Panel>
    </Page>
  )
}
