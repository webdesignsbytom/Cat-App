import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Data
import { UserCats } from '../../utils/temp/TempData';

const TestPage: React.FC = () => {
  const history = useHistory();
  const [userCats, setUserCats] = useState(UserCats);

  const handleAddCat = () => {
    history.push('/add-edit-cat');
  };

  const totalCells = 16;
  const emptyCells = totalCells - userCats.length;

  return (
    <div className='w-full h-full bg-white p-4'>
      <header className='mb-4'>
        <h2 className='text-2xl font-bold'>My Cats</h2>
      </header>
      <button
        onClick={handleAddCat}
        className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700'
      >
        Add Cat
      </button>
    </div>
  );
};

export default TestPage;
