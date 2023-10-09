interface PaginationProp {
    total: number
    pageSize: number
    currentPage: number

    onChangePage: (pageNumber: number) => void
}

interface paginationButtonAttributes {
    'data-current-page': boolean
}

interface paginationButtonProp {
    key: number
    display: number
    attributes?: paginationButtonAttributes

    onClick: () => void
}

function Pagination(props: PaginationProp) {
    const pageButtons: paginationButtonProp[] = []

    const numberOfPages = Math.ceil(props.total / props.pageSize)
    for (let i = 0; i < numberOfPages; i++) {
        const button: paginationButtonProp = {
            key: i,
            display: i + 1,

            onClick: () => props.onChangePage(i),
        }
        if (props.currentPage === i) {
            button.attributes = {
                ...button.attributes,
                'data-current-page': true,
            }
        }

        pageButtons.push(button)
    }
    return (
        <div className="flex justify-center">
            {pageButtons.map(({ key, display, onClick, attributes }) => (
                <button
                    key={key}
                    onClick={onClick}
                    {...attributes}
                    className="min-w-[40px] py-2.5 data-[current-page=true]:text-primary-color data-[current-page=true]:underline"
                >
                    {display}
                </button>
            ))}
        </div>
    )
}

export default Pagination
