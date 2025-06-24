// src/components/Paste.jsx
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';           // ← added Link
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import {
  FaEdit,
  FaTrashAlt,
  FaCopy,
  FaSearch,
  FaEye,                                                // ← added FaEye icon
} from 'react-icons/fa';

import { removeFromPastes } from '../redux/pasteSlice';

const Paste = () => {
  const pastes = useSelector(state => state.paste.pastes);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ---------------- search filter ---------------- */
  const filtered = useMemo(() => {
    if (!query.trim()) return pastes;
    const q = query.toLowerCase();
    return pastes.filter(
      p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q)
    );
  }, [pastes, query]);

  /* ---------------- handlers --------------------- */
  const handleEdit = id => navigate(`/?pasteId=${id}`);
  const handleDelete = id => {
    dispatch(removeFromPastes(id));
    toast('Paste deleted');
  };
  const handleCopy = content => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  /* ---------------- render ----------------------- */
  if (!pastes.length) {
    return <p className="paste-empty">No pastes yet 🤔</p>;
  }

  return (
    <div className="paste-page card-elev">
      {/* 🔍 search */}
      <div className="paste-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search pastes…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* 📄 list */}
      <div className="paste-container centre-stack">
        {filtered.length ? (
          filtered.map(({ _id, title, content, createdAt }) => (
            <div key={_id} className="paste-card card-elev">
              <div className="paste-header">
                <h3>{title || 'Untitled'}</h3>
                <span className="paste-date">
                  {format(new Date(createdAt), 'MMM d, yyyy p')}
                </span>
              </div>

              {/* centred snippet */}
              <p className="paste-snippet txt-centre">
                {content.slice(0, 120)}
                {content.length > 120 && '…'}
              </p>

              {/* 🛠️ actions */}
              <div className="paste-actions">
                {/* View */}
                <Link to={`/pastes/${_id}`} title="View"> 
                  <FaEye />
                </Link>

                {/* Edit */}
                <button onClick={() => handleEdit(_id)} title="Edit">
                  <FaEdit />
                </button>

                {/* Copy */}
                <button onClick={() => handleCopy(content)} title="Copy">
                  <FaCopy />
                </button>

                {/* Delete */}
                <button onClick={() => handleDelete(_id)} title="Delete">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="paste-empty">No results for “{query}”</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
