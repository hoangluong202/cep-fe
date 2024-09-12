import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { getLabel } from '@/utils/getLabel';
import { AREA } from '@/constants';
import { TPoleData } from '@/types/smartPole';
import lightOnIcon from '@/assets/svg/light-on.svg';
import lightOffIcon from '@/assets/svg/light-off.svg';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='-ml-3 h-8 data-[state=open]:bg-accent'>
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const columns: ColumnDef<TPoleData>[] = [
  {
    accessorKey: 'id',
    header: () => <div className='font-bold text-[15px]'>Mã đèn</div>,
    cell: ({ row }) => {
      const poleId = row.original.id;
      return <div className='text-sm text-gray-500'>POLE-{poleId}</div>;
    }
  },
  {
    accessorKey: 'area',
    header: () => <div className='font-bold text-[15px]'>Khu vực</div>,
    cell: ({ row }) => {
      const area = row.original.area;
      const areaLabel = getLabel(area, AREA);
      return <div className='text-sm text-gray-500'>{areaLabel}</div>;
    }
  },
  {
    accessorKey: 'group',
    header: () => <div className='font-bold text-[15px]'>Nhóm</div>,
    cell: ({ row }) => {
      const group = row.original.group;
      return <div className='text-sm text-gray-500'>{group ?? 'Không'}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: () => <div className='font-bold text-[15px]'>Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className='flex flex-row gap-1 items-center'>
          <img src={status ? lightOnIcon : lightOffIcon} alt='status' className='w-4 h-4' />
          <span className='text-sm text-gray-500'>{status ? 'Bật' : 'Tắt'}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'level',
    header: () => <div className='font-bold text-[15px]'>Cường độ sáng</div>,
    cell: ({ row }) => {
      const level = row.original.level;
      return <div className='text-sm text-gray-500'>{level}%</div>;
    }
  },

  {
    accessorKey: 'frequency',
    header: () => <div className='font-bold text-[15px]'>Tần suất</div>,
    cell: ({ row }) => {
      const frequency = row.original.frequency;
      return <div className='text-sm text-gray-500'>{frequency}lần</div>;
    }
  },
  {
    accessorKey: 'burningHours',
    header: () => <div className='font-bold text-[15px]'>Thời lượng sáng</div>,
    cell: ({ row }) => {
      const burningHours = row.original.burningHours;
      return <div className='text-sm text-gray-500'>{burningHours}giờ</div>;
    }
  },
  {
    accessorKey: 'current',
    header: () => <div className='font-bold text-[15px]'>Dòng điện</div>,
    cell: ({ row }) => {
      const current = row.original.current;
      return <div className='text-sm text-gray-500'>{current}A</div>;
    }
  },
  {
    accessorKey: 'voltage',
    header: () => <div className='font-bold text-[15px]'>Điện áp</div>,
    cell: ({ row }) => {
      const voltage = row.original.voltage;
      return <div className='text-sm text-gray-500'>{voltage}V</div>;
    }
  },
  {
    accessorKey: 'power',
    header: () => <div className='font-bold text-[15px]'>Công suất</div>,
    cell: ({ row }) => {
      const power = row.original.power;
      return <div className='text-sm text-gray-500'>{power}W</div>;
    }
  }
];
