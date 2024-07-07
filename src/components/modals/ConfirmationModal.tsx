// Interfaces
import { ConfirmationModalProps } from '../../utils/app/AppInterface';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className='absolute grid w-[80%] h-fit px-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='bg-white p-4 rounded shadow-lg w-full'>
        <div className='p-2 text-center'>
          <p className='text-xl'>{message}</p>
        </div>
        <div className='grid grid-cols-2 gap-4 justify-end mt-4'>
          <button
            className='px-2 py-2 rounded-lg w-full h-[48px] bg-main-colour text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
            onClick={onConfirm}
          >
            OK
          </button>
          <button
            className='px-2 py-2 rounded-lg w-full h-[48px] bg-gray-300 text-white text-2xl font-semibold active:scale-95 active:bg-main-colour-alt shadow-xl'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
