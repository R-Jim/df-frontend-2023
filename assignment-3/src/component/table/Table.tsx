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

function Table(props: TableProps) {
    let itemsRender: JSX.Element[] = props.items.map((item, index) => {
        const rows = props.mappings.map(({ key }) =>
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
                <td colSpan={props.mappings.length}>
                    <p className='no-record-txt'>No Record</p>
                </td>
            </tr>
        )];
    }

    if (props.currentPage !== 0 && props.total < props.currentPage * props.pageSize) {
        props.onChangePage(0);
    }

    useEffect(() => {
        if (props.currentPage !== 0 && props.items.length === 0) {
            const numberOfPages = Math.ceil(props.total / props.pageSize)
            props.onChangePage(numberOfPages - 1);
        }
    })
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {props.mappings.map(({ display }) =>
                            <td key={display}>{display}</td>
                        )}
                    </tr>
                </thead>
                <tbody id="bookTableBody">
                    {itemsRender}
                </tbody>
            </table>
            {props.total !== 0 ?
                <Pagination total={props.total} pageSize={props.pageSize} onChangePage={props.onChangePage} currentPage={props.currentPage} />
                : ""}
        </div>
    );
}

export default Table;