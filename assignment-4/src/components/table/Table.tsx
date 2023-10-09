import { Book } from '../entity/Book'
import Pagination from './Pagination'
import './Table.css'

interface TableMapping {
    key: string
    display: string
}

interface TableProps {
    total: number
    pageSize: number
    currentPage: number
    mappings: TableMapping[]
    items: Book[]

    onChangePage: (pageNumber: number) => void
}

function Table(props: TableProps) {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        {props.mappings.map(({ display }) => (
                            <th key={display}>{display}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => {
                        const rows = props.mappings.map(({ key }) => (
                            <td key={key}>{item[key]}</td>
                        ))

                        return <tr key={`book${index}`}>{rows}</tr>
                    })}
                    <tr
                        key="no-record"
                        className="hidden only-of-type:table-row"
                    >
                        <td colSpan={props.mappings.length}>
                            <p className="text-center">No Record</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            {props.total !== 0 ? (
                <Pagination
                    total={props.total}
                    pageSize={props.pageSize}
                    onChangePage={props.onChangePage}
                    currentPage={props.currentPage}
                />
            ) : null}
        </div>
    )
}

export default Table
