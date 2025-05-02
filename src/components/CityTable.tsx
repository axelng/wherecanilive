import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table';
  
  interface Row {
    city: string;
    score: number;
    rent: number;
    transit: number;
    walk: number;
  }
  
  export default function CityTable({ rows }: { rows: Row[] }) {
    const cols: ColumnDef<Row>[] = [
      { accessorKey: 'city', header: 'City' },
      { accessorKey: 'score', header: 'Score' },
      { accessorKey: 'rent', header: 'Avg Rent (1 br)' },
      { accessorKey: 'transit', header: 'Transit' },
      { accessorKey: 'walk', header: 'Walk' },
    ];
  
    const table = useReactTable({
      data: rows,
      columns: cols,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  
    return (
      <table className="min-w-full text-sm">
        <thead className="border-b">
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th
                  key={h.id}
                  className="p-2 cursor-pointer"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === 'asc' && ' ▲'}
                  {h.column.getIsSorted() === 'desc' && ' ▼'}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(r => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              {r.getVisibleCells().map(c => (
                <td key={c.id} className="p-2">
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }