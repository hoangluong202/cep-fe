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
  getFilteredRowModel,
  PaginationState
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
import moveFirstIcon from '@/assets/svg/move-first.svg';
import moveLastIcon from '@/assets/svg/move-last.svg';
import moveNextIcon from '@/assets/svg/move-next.svg';
import movePreviousIcon from '@/assets/svg/move-previous.svg';
import xIcon from '@/assets/svg/x.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { AREA, GROUP } from '@/constants';
// import { TArea } from '@/types/alarm';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type TFilter = {
  [key: string]: boolean;
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [area, setArea] = React.useState<TFilter>({
    hcmut1: false,
    hcmut2: false
  });
  const [group, setGroup] = React.useState<TFilter>({
    a3: false,
    a5: false,
    h1: false,
    h6: false
  });
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters
    }
  });

  const isAreaFiltered = Object.values(area).some((value) => value);
  const isGroupFiltered = Object.values(group).some((value) => value);
  const isFiltered = isAreaFiltered || isGroupFiltered;
  const clearAreaFilter = () => {
    console.log('clearAreaFilter');
    setArea({
      hcmut1: false,
      hcmut2: false
    });
  };
  const clearGroupFilter = () => {
    console.log('clearGroupFilter');
    setGroup({
      a3: false,
      a5: false,
      h1: false,
      h6: false
    });
  };
  const clearFilters = () => {
    console.log('clearFilters');
    clearAreaFilter();
    clearGroupFilter();
  };

  return (
    <div>
      <div className='flex items-center py-4 gap-2'>
        <Input
          placeholder='Tìm kiếm mã trụ đèn'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className='w-48 focus-visible:ring-none focus-visible:ring-offset-none focus-visible:ring-0'
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex gap-1 border-dashed border-2 rounded'>
              <img src={plusIcon} alt='plusIcon' />
              <p className='font-bold text-[12px]'>Khu vực</p>
              {isAreaFiltered && <Separator orientation='vertical' className='mx-1' />}
              {AREA.map((a) => {
                if (area[a.key]) {
                  return (
                    <p id={a.key} className='font-small text-[12px] rounded px-1 bg-gray-300'>
                      {a.label}
                    </p>
                  );
                }
              })}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='flex flex-col gap-2 w-48'>
            {AREA.map((areaItem) => (
              <div className='flex flex-row items-center gap-2 w-full'>
                <Checkbox
                  id={areaItem.key}
                  checked={area[areaItem.key]}
                  onClick={() => {
                    setArea((prev) => ({
                      ...prev,
                      [areaItem.key]: !prev[areaItem.key]
                    }));
                  }}
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {areaItem.label}
                </label>
                <p className='text-[12px] font-medium ml-auto'>23</p>
              </div>
            ))}
            {isAreaFiltered && (
              <>
                <Separator orientation='horizontal' />
                <button
                  className='font-normal text-[14px] hover:bg-gray-100 rounded py-1'
                  onClick={clearAreaFilter}
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
              <img src={plusIcon} alt='plusIcon' />
              <p className='font-bold text-[12px]'>Nhóm</p>
              {isGroupFiltered && <Separator orientation='vertical' className='mx-1' />}
              {GROUP.map((groupItem) => {
                if (group[groupItem.key]) {
                  return (
                    <p
                      id={groupItem.key}
                      className='font-small text-[12px] rounded px-1 bg-gray-300'
                    >
                      {groupItem.label}
                    </p>
                  );
                }
              })}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='flex flex-col gap-2 w-48'>
            {GROUP.map((groupItem) => (
              <div className='flex flex-row items-center gap-2 w-full'>
                <Checkbox
                  id={groupItem.key}
                  checked={group[groupItem.key]}
                  onClick={() => {
                    setGroup((prev) => ({
                      ...prev,
                      [groupItem.key]: !prev[groupItem.key]
                    }));
                  }}
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {groupItem.label}
                </label>
                <p className='text-[12px] font-medium ml-auto'>23</p>
              </div>
            ))}
            {isGroupFiltered && (
              <>
                <Separator orientation='horizontal' />
                <button
                  className='font-normal text-[14px] hover:bg-gray-100 rounded py-1'
                  onClick={clearGroupFilter}
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
          <p className='font-normal text-[12px] text-gray-500'>
            Tổng {table.getRowCount()} giá trị
          </p>
          <p className='font-normal text-[12px] text-gray-500'>
            Hiển thị {pagination.pageSize} giá trị/trang
          </p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <p className='font-normal text-[12px] text-gray-500'>
            Trang {pagination.pageIndex + 1}/{table.getPageCount()}
          </p>
          <button
            className={`border-2 p-1 rounded ${
              table.getCanPreviousPage() ? 'bg-gray-100' : 'bg-gray-300'
            }`}
            onClick={() => {
              table.firstPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <img src={moveFirstIcon} alt='moveFirst' />
          </button>
          <button
            className={`border-2 p-1 rounded ${
              table.getCanPreviousPage() ? 'bg-gray-100' : 'bg-gray-300'
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <img src={movePreviousIcon} alt='movePrevious' />
          </button>
          <button
            className={`border-2 p-1 rounded ${
              table.getCanNextPage() ? 'bg-gray-100' : 'bg-gray-300'
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <img src={moveNextIcon} alt='moveNext' />
          </button>
          <button
            className={`border-2 p-1 rounded ${
              table.getCanNextPage() ? 'bg-gray-100' : 'bg-gray-300'
            }`}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <img src={moveLastIcon} alt='moveLast' />
          </button>
        </div>
      </div>
    </div>
  );
}
