import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components';

const capitalizeFirstCharacter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const DeleteConfirm = ({
  name,
  icon,
  handleDelete
}: {
  name: string;
  icon: JSX.Element;
  handleDelete: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`group/button flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100`}
        >
          {icon}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn muốn xóa {name} này?</DialogTitle>
          <DialogDescription>
            Hành động này sẽ không thể thu hồi. {capitalizeFirstCharacter(name)} sẽ được xóa vĩnh
            viễn.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end gap-x-2'>
          <button className='text-red-500' onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
