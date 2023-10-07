import ErrorPage from "../components/page/ErrorPage"

export default function NotFoundPage() {
    return <ErrorPage code={404} message="Page not found." redirect="/" redirectMessage="&lt; Back to main page"/>
}
