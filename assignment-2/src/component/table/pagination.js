import './Pagination.css'

function Pagination(params) {
    const pageButtonsRender = []

    const numberOfPages = Math.ceil(params.total / params.pageSize)
    for (var i = 0; i < numberOfPages; i++) {
        var attributes = {}

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