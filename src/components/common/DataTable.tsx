import type { ReactNode } from "react";

export interface DataTableColumn<Row> {
  id: string;
  header: string;
  className?: string;
  render: (row: Row) => ReactNode;
}

interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  emptyText?: string;
}

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  emptyText = "No hay datos disponibles."
}: DataTableProps<Row>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-tech-divider bg-tech-bg/50 px-4 py-10 text-center text-sm text-tech-textSecond">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-tech-border bg-white">
      <table className="min-w-full divide-y divide-tech-divider text-sm">
        <thead className="bg-tech-bg text-left text-xs font-semibold uppercase tracking-wider text-tech-textSecond">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className={`px-4 py-3 ${column.className ?? ""}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-tech-divider bg-white">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-tech-bg/30 transition">
              {columns.map((column) => (
                <td key={column.id} className={`px-4 py-3 text-tech-textMain ${column.className ?? ""}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

