import { Button, Input, InputRef } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useRef } from 'react';

function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      const searchInputRef = useRef<InputRef>(null);
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInputRef}
            placeholder="Search"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            onClick={() => confirm()}
            size="small"
            type="primary"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button size="small" style={{ width: 90 }} onClick={() => clearFilters?.()}>
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <i
        className="fas fa-search"
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          // Focus will be handled by React's ref
        });
      }
    },
  };
}
export default tableColumnTextFilterConfig;
