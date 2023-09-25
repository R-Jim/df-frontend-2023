import Pagination from './Pagination';
import './Table.css'

function Table(params) {
    var itemsRender = params.items.map((item, index) => {
        const rows = params.mapping.map(({ key }) =>
            <td key={key}>{item[key]}</td>
        );

        return (
            <tr key={"book" + index}>
                {rows}
            </tr>
        );
    })

    if (itemsRender.length === 0) {
        itemsRender = (<td colSpan={params.mapping.length}>
            <p className='no-record-txt'>No Record</p>
        </td>);
    }

    const headersRender = params.mapping.map(({ display }) =>
        <td key={display}>{display}</td>
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headersRender}
                    </tr>
                </thead>
                <tbody id="bookTableBody">
                    {itemsRender}
                </tbody>
            </table>
            {params.total !== 0 ?
                <Pagination total={params.total} pageSize={params.pageSize} onChangePage={params.onChangePage} currentPage={params.currentPage} />
                : ""}
        </div>
    );
}

export default Table;