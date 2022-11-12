import { FC } from 'react';
import { Table, TablePaginationConfig } from 'antd';

interface Props {
  data: any[];
  columns: any[];
  pagination?: boolean;
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
      <Table
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        pagination={pagination as TablePaginationConfig}
        className={className}
      />
    </div>
  );
};

export default NubTable;
