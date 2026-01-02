import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from 'lib/utils';

export interface Column<T> {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  onFilter?: (value: string, record: T) => boolean;
  filterDropdown?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: string | ((record: T) => string);
  pagination?: boolean | object;
  className?: string;
}

interface FilterState {
  [key: string]: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey = 'id',
  pagination = true,
  className,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({});
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [filterInputs, setFilterInputs] = React.useState<FilterState>({});

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index.toString();
  };

  const getValue = (record: T, dataIndex: string): any => {
    return record[dataIndex];
  };

  // Apply filters to data
  const filteredData = React.useMemo(() => {
    return data.filter((record) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const column = columns.find((col) => col.dataIndex === key);
        if (column?.onFilter) {
          return column.onFilter(filterValue, record);
        }
        const value = getValue(record, key);
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  const handleFilterConfirm = (dataIndex: string) => {
    setFilters({ ...filters, [dataIndex]: filterInputs[dataIndex] || '' });
    setActiveFilter(null);
  };

  const handleFilterReset = (dataIndex: string) => {
    setFilterInputs({ ...filterInputs, [dataIndex]: '' });
    setFilters({ ...filters, [dataIndex]: '' });
    setActiveFilter(null);
  };

  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key || column.dataIndex}>
                <div className="flex items-center gap-2">
                  <span>{column.title}</span>
                  {column.onFilter && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveFilter(
                            activeFilter === column.dataIndex
                              ? null
                              : column.dataIndex
                          )
                        }
                        className={cn(
                          'p-1 hover:bg-gray-100 rounded',
                          filters[column.dataIndex] ? 'text-primary' : 'text-gray-400'
                        )}
                      >
                        <Search className="h-4 w-4" />
                      </button>
                      {activeFilter === column.dataIndex && (
                        <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-50 min-w-[200px]">
                          <Input
                            placeholder="Search..."
                            value={filterInputs[column.dataIndex] || ''}
                            onChange={(e) =>
                              setFilterInputs({
                                ...filterInputs,
                                [column.dataIndex]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleFilterConfirm(column.dataIndex);
                              }
                            }}
                            className="mb-2"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleFilterConfirm(column.dataIndex)}
                            >
                              Search
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleFilterReset(column.dataIndex)}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((record, index) => (
              <TableRow key={getRowKey(record, index)}>
                {columns.map((column) => (
                  <TableCell key={column.key || column.dataIndex}>
                    {column.render
                      ? column.render(
                          getValue(record, column.dataIndex),
                          record,
                          index
                        )
                      : getValue(record, column.dataIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
