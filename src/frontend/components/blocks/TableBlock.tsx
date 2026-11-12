import type { TableBlock as TableBlockData } from '@/payload-types'

export function TableBlock({ block }: { block: TableBlockData }) {
  return (
    <div className="table-container">
      <table>
        {block.caption ? <caption>{block.caption}</caption> : null}
        <thead>
          <tr>
            {block.columns.map((column, index) => (
              <th key={column.id || `${column.heading}-${index}`} scope="col">
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={row.id || `row-${rowIndex}`}>
              {block.columns.map((column, columnIndex) => (
                <td key={`${column.id || column.heading}-${columnIndex}`}>
                  {row.cells[columnIndex]?.value || null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
