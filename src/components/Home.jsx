import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue]   = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId  = searchParams.get('pasteId');

  const dispatch = useDispatch();

  /* ---------------- save / update ---------------- */
  const handleSave = () => {
    const paste = {
      _id:       pasteId || Date.now().toString(36),
      title,
      content:   value,
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success('Paste updated');
    } else {
      dispatch(addToPastes(paste));
      toast.success('Paste created');
    }

    // reset form + URL
    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="home-container card-elev">
      <div className="home">
        <input
          className="home-input"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button onClick={handleSave}>
          {pasteId ? 'Update My Paste' : 'Create My Paste'}
        </button>
      </div>

      <textarea
        className="textarea"
        rows={20}
        placeholder="Enter Content here"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
