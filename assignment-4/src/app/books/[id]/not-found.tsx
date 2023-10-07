import ErrorPage from "../../../components/page/ErrorPage"

export default function NotFoundPage() {
    return <ErrorPage code={404} message="Book not found." redirect="/books" redirectMessage="&lt; Back to books page" />
}

