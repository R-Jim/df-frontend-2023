import './Pagination.css'

interface PaginationProp {
    total: number;
    pageSize: number;
    currentPage: number;

    onChangePage: Function;
}

function Pagination(params: PaginationProp) {
    const pageButtonsRender: JSX.Element[] = []

    const numberOfPages = Math.ceil(params.total / params.pageSize)
    for (let i = 0; i < numberOfPages; i++) {
        let attributes = {}

        if (params.currentPage === i) {
            attributes = {
                ...attributes,
                "active": "true",
            }
        }

        const pageNumber = i
        pageButtonsRender.push(
            <button key={pageNumber} onClick={() => params.onChangePage(pageNumber)} {...attributes}>
                {pageNumber+1}
            </button>
        )
    }
    return (
        <div className="pagination-container">
            {pageButtonsRender}
        </div>
    );
}

export default Pagination