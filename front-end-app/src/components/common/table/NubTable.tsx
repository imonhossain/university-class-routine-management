import { FC } from 'react';
import { DataTable, Column } from 'components/ui/data-table';

interface Props {
  data: any[];
  columns: Column<any>[];
  pagination?: boolean | object;
  rowKey?: string;
  className?: string;
}
const NubTable: FC<Props> = ({
  data,
  columns,
  pagination = true,
  rowKey = 'id',
  className = '',
}) => {
  return (
    <div className="block w-full shadow-md">
      <DataTable
        data={data}
        columns={columns}
        rowKey={rowKey}
        pagination={pagination !== false}
        className={className}
      />
    </div>
  );
};

export default NubTable;
