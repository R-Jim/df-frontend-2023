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

function Pagination(params: PaginationProp) {
    const pageButtons: PaginationButtonProp[] = []

    const numberOfPages = Math.ceil(params.total / params.pageSize)
    for (let i = 0; i < numberOfPages; i++) {
        const button: PaginationButtonProp = {
            key: i,
            display: i + 1,

            onClick: () => params.onChangePage(i),
        }
        if (params.currentPage === i) {
            button.attributes = {
                ...button.attributes,
                "data-current-page": "true",
            }
        }

        pageButtons.push(button)
    }
    return (
        <div className="flex justify-center">
            {pageButtons.map(({ key, display, onClick, attributes }) =>
            (
                <button key={key} onClick={onClick} {...attributes} className='min-w-[40px] py-2.5 data-[current-page=true]:text-primary-color data-[current-page=true]:underline'>
                    {display}
                </button>
            )
            )}
        </div>
    );
}

export default Pagination