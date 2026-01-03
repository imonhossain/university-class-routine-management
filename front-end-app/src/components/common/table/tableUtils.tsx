import { Column } from 'components/ui/data-table';

// This utility function enables the filter dropdown for a column in the DataTable
// The actual filtering logic is handled by the DataTable component using the onFilter callback
function tableColumnTextFilterConfig<T>(): Partial<Column<T>> {
  return {
    filterDropdown: true,
  };
}
export default tableColumnTextFilterConfig;
