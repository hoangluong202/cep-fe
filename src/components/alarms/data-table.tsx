import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import plusIcon from '@/assets/svg/plus-circle.svg';
import highPriorityIcon from '@/assets/svg/high-priority.svg';
import mediumPriorityIcon from '@/assets/svg/medium-priority.svg';
import lowPriorityIcon from '@/assets/svg/low-priority.svg';
import pendingStatusIcon from '@/assets/svg/pending-status.svg';
import inProgressStatusIcon from '@/assets/svg/in-progress-status.svg';
import resolvedStatusIcon from '@/assets/svg/resolved-status.svg';
import moveFirstIcon from '@/assets/svg/move-first.svg';
import moveLastIcon from '@/assets/svg/move-last.svg';
import moveNextIcon from '@/assets/svg/move-next.svg';
import movePreviousIcon from '@/assets/svg/move-previous.svg';
import xIcon from '@/assets/svg/x.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const priorities = [
  {
    value: 'high',
    label: 'Cao'
  },
  {
    value: 'medium',
    label: 'Trung bình'
  },
  {
    value: 'low',
    label: 'Thấp'
  }
];

const statuses = [
  {
    value: 'pending',
    label: 'Chờ xử lý'
  },
  {
    value: 'in-progress',
    label: 'Đang xử lý'
  },
  {
    value: 'resolved',
    label: 'Đã xử lý'
  }
];

type TFilter = {
  [key: string]: boolean;
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [priority, setPriority] = React.useState<TFilter>({
    high: false,
    medium: false,
    low: false
  });
  const [status, setStatus] = React.useState<TFilter>({
    pending: false,
    'in-progress': false,
    resolved: false
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  });

  const isPriorityFiltered = Object.values(priority).some((value) => value);
  const isStatusFiltered = Object.values(status).some((value) => value);
  const isFiltered = isPriorityFiltered || isStatusFiltered;
  const clearFilters = () => {
    setPriority({
      high: false,
      medium: false,
      low: false
    });
    setStatus({
      pending: false,
      'in-progress': false,
      resolved: false
    });
  };
  const clearPriorityFilter = () => {
    setPriority({
      high: false,
      medium: false,
      low: false
    });
  };
  const clearStatusFilter = () => {
    setStatus({
      pending: false,
      'in-progress': false,
      resolved: false
    });
  };

  return (
    <div>
      <div className='flex items-center py-4 gap-2'>
        <Input
          placeholder='Tìm kiếm mã lỗi'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='w-48 focus-visible:ring-none focus-visible:ring-offset-none focus-visible:ring-0'
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex gap-1 border-dashed border-2 rounded'>
              <img src={plusIcon} alt='squad' />
              <p className='font-bold text-[12px]'>Độ ưu tiên</p>
              {(priority['high'] || priority['medium'] || priority['low']) && (
                <Separator orientation='vertical' className='mx-1' />
              )}
              {priority['high'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>Cao</p>
              )}
              {priority['medium'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>Trung bình</p>
              )}
              {priority['low'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>Thấp</p>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='flex flex-col gap-2 w-48'>
            {priorities.map((p) => (
              <div className='flex flex-row items-center gap-2 w-full'>
                <Checkbox
                  id={p.value}
                  checked={priority[p.value]}
                  onClick={() => {
                    setPriority((prev) => ({
                      ...prev,
                      [p.value]: !prev[p.value]
                    }));
                  }}
                />
                <img
                  src={
                    p.value === 'high'
                      ? highPriorityIcon
                      : p.value === 'medium'
                      ? mediumPriorityIcon
                      : lowPriorityIcon
                  }
                  alt='squad'
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {p.label}
                </label>
                <p className='text-[12px] font-medium ml-auto'>143</p>
              </div>
            ))}
            {isPriorityFiltered && (
              <>
                <Separator orientation='horizontal' />
                <button
                  className='font-normal text-[14px] hover:bg-gray-100 rounded py-1'
                  onClick={clearPriorityFilter}
                >
                  Xóa bộ lọc
                </button>
              </>
            )}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex gap-1 border-dashed border-2 rounded'>
              <img src={plusIcon} alt='squad' />
              <p className='font-bold text-[12px]'>Trạng thái</p>
              {(status['pending'] || status['in-progress'] || status['resolved']) && (
                <Separator orientation='vertical' className='mx-1' />
              )}
              {status['pending'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>
                  {statuses.filter((item) => item.value === 'pending')[0].label}
                </p>
              )}
              {status['in-progress'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>
                  {statuses.filter((item) => item.value === 'in-progress')[0].label}
                </p>
              )}
              {status['resolved'] && (
                <p className='font-small text-[12px] rounded px-1 bg-gray-300'>
                  {statuses.filter((item) => item.value === 'resolved')[0].label}
                </p>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='flex flex-col gap-2 w-48'>
            {statuses.map((s) => (
              <div className='flex flex-row items-center gap-2 w-full'>
                <Checkbox
                  id={s.value}
                  checked={status[s.value]}
                  onClick={() => {
                    setStatus((prev) => ({
                      ...prev,
                      [s.value]: !prev[s.value]
                    }));
                  }}
                />
                <img
                  src={
                    s.value === 'pending'
                      ? pendingStatusIcon
                      : s.value === 'in-progress'
                      ? inProgressStatusIcon
                      : resolvedStatusIcon
                  }
                  alt='squad'
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {s.label}
                </label>
                <p className='text-[12px] font-medium ml-auto'>143</p>
              </div>
            ))}
            {isStatusFiltered && (
              <>
                <Separator orientation='horizontal' />
                <button
                  className='font-normal text-[14px] hover:bg-gray-100 rounded py-1'
                  onClick={clearStatusFilter}
                >
                  Xóa bộ lọc
                </button>
              </>
            )}
          </PopoverContent>
        </Popover>
        {isFiltered && (
          <button
            className='h-8 px-2 flex flex-row gap-1 items-center rounded hover:bg-gray-100 justify-self-stretch'
            onClick={clearFilters}
          >
            <p className='font-bold text-[12px]'>Xóa bộ lọc</p>
            <img src={xIcon} alt='xIcon' />
          </button>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex flex-row justify-between	items-center py-3'>
        <div className='flex flex-row gap-2 items-center'>
          <p className='font-normal text-[12px] text-gray-500'>Tổng 160 giá trị</p>
          <p className='font-normal text-[12px] text-gray-500'>Hiển thị 8 giá trị/trang</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <p className='font-normal text-[12px] text-gray-500'>Trang 1/20</p>
          <button className='border-2 p-1 rounded'>
            <img src={moveFirstIcon} alt='moveFirst' />
          </button>
          <button className='border-2 p-1 rounded'>
            <img src={movePreviousIcon} alt='movePrevious' />
          </button>
          <button className='border-2 p-1 rounded'>
            <img src={moveNextIcon} alt='moveNext' />
          </button>
          <button className='border-2 p-1 rounded'>
            <img src={moveLastIcon} alt='moveLast' />
          </button>
        </div>
      </div>
    </div>
  );
}
