import _ from 'lodash'
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

function Table(params: TableProps) {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        {params.mappings.map(({ display }) => (
                            <th key={display}>{display}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {params.items.map((item, index) => {
                        const rows = params.mappings.map(({ key }) => {
                            return <td key={key}>{_.get(item, key)}</td>
                        })

                        return <tr key={`book${index}`}>{rows}</tr>
                    })}
                    <tr
                        key="no-record"
                        className="hidden only-of-type:table-row"
                    >
                        <td colSpan={params.mappings.length}>
                            <p className="text-center">No Record</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            {params.total !== 0 ? (
                <Pagination
                    total={params.total}
                    pageSize={params.pageSize}
                    onChangePage={params.onChangePage}
                    currentPage={params.currentPage}
                />
            ) : (
                ''
            )}
        </div>
    )
}

export default Table
