// src/components/ViewPaste.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { FaCopy, FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';

import { removeFromPastes } from '../redux/pasteSlice';

const ViewPaste = () => {
  const { id } = useParams();          // URL param → /view/:id
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* find the specific paste */
  const paste = useSelector(state =>
    state.paste.pastes.find(p => p._id === id)
  );

  /* handlers */
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success('Copied to clipboard');
  };

  const handleDelete = () => {
    dispatch(removeFromPastes(id));
    toast('Paste deleted');
    navigate('/pastes');
  };

  const handleEdit = () => navigate(`/?pasteId=${id}`);
  const handleBack = () => navigate('/pastes');

  /* render */
  if (!paste) return (
    <div className="paste-page card-elev">
      <p style={{ textAlign: 'center' }}>Paste not found.</p>
      <button onClick={handleBack}><FaArrowLeft />&nbsp;Back</button>
    </div>
  );

  return (
    <div className="paste-page card-elev">
      <button className="btn" onClick={handleBack} style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>
        <FaArrowLeft />&nbsp;Back
      </button>

      <div className="view-header" style={{ textAlign: 'center' }}>
        <h2>{paste.title || 'Untitled'}</h2>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>
          {format(new Date(paste.createdAt), 'MMM d, yyyy p')}
        </span>
      </div>

      <pre
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6',
          background: '#fff8fb',
          border: '1.5px solid var(--pink-light)',
          borderRadius: '12px',
          padding: '18px',
          marginTop: '20px',
          fontSize: '1rem'
        }}
      >
        {paste.content}
      </pre>

      <div className="paste-actions" style={{ marginTop: '24px', justifyContent: 'center' }}>
        <button onClick={handleCopy}><FaCopy />&nbsp;Copy</button>
        <button onClick={handleEdit}><FaEdit />&nbsp;Edit</button>
        <button onClick={handleDelete}><FaTrashAlt />&nbsp;Delete</button>
      </div>
    </div>
  );
};

export default ViewPaste;
