import { ColumnDef } from '@tanstack/react-table';
import { Check, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import highPriorityIcon from '@/assets/svg/high-priority.svg';
import mediumPriorityIcon from '@/assets/svg/medium-priority.svg';
import lowPriorityIcon from '@/assets/svg/low-priority.svg';
import pendingStatusIcon from '@/assets/svg/pending-status.svg';
import inProgressStatusIcon from '@/assets/svg/in-progress-status.svg';
import resolvedStatusIcon from '@/assets/svg/resolved-status.svg';
import moveNextIcon from '@/assets/svg/move-next.svg';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { TAlarmData } from '@/types/alarm';
import { getLabel } from '@/utils/getLabel';
import { ALARM_ERROR, ALARM_STATUS, AREA, PRIORITY } from '@/constants';

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

export const columns: ColumnDef<TAlarmData>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='font-bold text-[15px]'>Mã lỗi</div>
  },
  {
    accessorKey: 'time',
    header: () => <div className='font-bold text-[15px]'>Thời gian</div>
  },
  {
    accessorKey: 'area',
    header: () => <div className='font-bold text-[15px]'>Vị trí</div>,
    cell: ({ row }) => {
      const area = row.original.area;
      const poleId = row.original.poleId;
      const areaLabel = getLabel(area, AREA);
      return (
        <div className='text-sm text-gray-500'>
          Khu vực {areaLabel}, trụ đèn POLE-{poleId}
        </div>
      );
    }
  },
  {
    accessorKey: 'label',
    header: () => <div className='font-bold text-[15px]'>Kiểu lỗi</div>,
    cell: ({ row }) => {
      const errType = row.original.errType;
      return <Badge variant='secondary'>{getLabel(errType, ALARM_ERROR)}</Badge>;
    }
  },
  {
    accessorKey: 'priority',
    header: () => <div className='font-bold text-[15px]'>Độ ưu tiên</div>,
    cell: ({ row }) => {
      const priority = row.original.priority;
      return (
        <div className='flex gap-1 items-center'>
          <img
            src={
              priority === 'high'
                ? highPriorityIcon
                : priority === 'medium'
                ? mediumPriorityIcon
                : lowPriorityIcon
            }
            alt='squad'
          />
          <Badge
            variant='secondary'
            style={{
              backgroundColor:
                priority === 'high' ? '#fca5a5' : priority === 'medium' ? '#fb923c' : '#fcd34d'
            }}
          >
            {getLabel(priority, PRIORITY)}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: () => <div className='font-bold text-[15px]'>Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className='flex gap-1'>
          <img
            src={
              status === 'pending'
                ? pendingStatusIcon
                : status === 'in-progress'
                ? inProgressStatusIcon
                : resolvedStatusIcon
            }
            alt='squad'
          />
          <Badge
            variant='secondary'
            className='bg-sky-300'
            style={{
              backgroundColor:
                status === 'pending' ? '#fde047' : status === 'in-progress' ? '#86efac' : '#5eead4'
            }}
          >
            {getLabel(status, ALARM_STATUS)}
          </Badge>
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Cập nhật</DropdownMenuLabel>
            <DropdownMenuItem>
              <HoverCard>
                <HoverCardTrigger className='flex flex-row items-center w-full'>
                  <p>Trạng thái</p>
                  <img src={moveNextIcon} alt='move next' className='ml-auto' />
                </HoverCardTrigger>
                <HoverCardContent side={'left'} sideOffset={12} className='w-[150px]'>
                  <div className='flex flex-col gap-2'>
                    {ALARM_STATUS.map((s) => {
                      const stat = rowData.status;
                      return (
                        <div className='flex flex-row gap-2 items-center'>
                          <button
                            id={s.key}
                            className='text-sm text-gray-500'
                            onClick={() => {
                              //TO DO: call api to update priority
                            }}
                          >
                            {s.label}
                          </button>
                          {stat === s.key && <Check className='h-5 w-5 ml-auto' />}
                        </div>
                      );
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HoverCard>
                <HoverCardTrigger className='flex flex-row items-center w-full'>
                  <p>Độ ưu tiên</p>
                  <img src={moveNextIcon} alt='move next' className='ml-auto' />
                </HoverCardTrigger>
                <HoverCardContent side={'left'} sideOffset={12} className='w-[150px]'>
                  <div className='flex flex-col gap-2'>
                    {PRIORITY.map((p) => {
                      const pri = rowData.priority;
                      return (
                        <div className='flex flex-row gap-2 items-center'>
                          <button
                            id={p.key}
                            className='text-sm text-gray-500'
                            onClick={() => {
                              //TO DO: call api to update priority
                            }}
                          >
                            {p.label}
                          </button>
                          {pri === p.key && <Check className='h-5 w-5 ml-auto' />}
                        </div>
                      );
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
