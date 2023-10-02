import { useEffect } from 'react';
import Pagination from './Pagination';
import './Table.css'

interface TableMapping {
    key: string;
    display: string;
}

interface TableProps {
    total: number;
    pageSize: number;
    currentPage: number;
    mappings: TableMapping[];
    items: any[];

    onChangePage: Function;
}

function Table(params: TableProps) {
    let itemsRender: JSX.Element[] = params.items.map((item, index) => {
        const rows = params.mappings.map(({ key }) =>
            <td key={key}>{item[key]}</td>
        );

        return (
            <tr key={`book${index}`}>
                {rows}
            </tr>
        );
    })

    if (itemsRender.length === 0) {
        itemsRender = [(
            <tr key="no-record">
                <td colSpan={params.mappings.length}>
                    <p className='no-record-txt'>No Record</p>
                </td>
            </tr>
        )];
    }

    if (params.currentPage !== 0 && params.total < params.currentPage * params.pageSize) {
        params.onChangePage(0);
    }

    useEffect(() => {
        if (params.currentPage !== 0 && params.items.length === 0) {
            const numberOfPages = Math.ceil(params.total / params.pageSize)
            params.onChangePage(numberOfPages - 1);
        }
    })
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {params.mappings.map(({ display }) =>
                            <td key={display}>{display}</td>
                        )}
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