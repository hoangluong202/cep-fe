import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ButtonIcon
} from '@/components';

export const GetBackConfirm = ({
  icon,
  handleGetBack
}: {
  icon: JSX.Element;
  handleGetBack: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <ButtonIcon icon={icon} className='h-6 w-6' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn kết thúc tiến trình?</DialogTitle>
          <DialogDescription>
            Hành động này sẽ không thể thu hồi và moi dữ liệu trước đó sẽ bị xóa vĩnh viễn.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end gap-x-2'>
          <button className='text-red-500' onClick={handleGetBack}>
            Xác nhận
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
