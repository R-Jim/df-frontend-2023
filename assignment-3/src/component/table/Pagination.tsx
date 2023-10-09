import './Pagination.css'

interface PaginationProp {
    total: number;
    pageSize: number;
    currentPage: number;

    onChangePage: Function;
}

interface PaginationButtonProp {
    key: number;
    display: number;
    attributes?: any;

    onClick: Function;
}

function Pagination(props: PaginationProp) {
    const pageButtons: PaginationButtonProp[] = []

    const numberOfPages = Math.ceil(props.total / props.pageSize)
    for (let i = 0; i < numberOfPages; i++) {
        const button: PaginationButtonProp = {
            key: i,
            display: i + 1,

            onClick: () => props.onChangePage(i),
        }
        if (props.currentPage === i) {
            button.attributes = {
                ...button.attributes,
                "active": "true",
            }
        }

        pageButtons.push(button)
    }
    return (
        <div className="pagination-container">
            {pageButtons.map(({ key, display, onClick, attributes }) =>
            (
                <button key={key} onClick={onClick} {...attributes}>
                    {display}
                </button>
            )
            )}
        </div>
    );
}

export default Pagination