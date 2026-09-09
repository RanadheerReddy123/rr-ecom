import React, { useRef } from 'react';

function QuickSearch({ onSearchSubmit }) {
  // 1. Create a reference for the uncontrolled input element
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Read value directly from current DOM node
    const searchValue = inputRef.current.value;
    onSearchSubmit(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '10px 0' }}>
      <input
        type="text"
        ref={inputRef} // Uncontrolled input binding
        placeholder="Uncontrolled search..."
        style={{ padding: '6px' }}
      />
      <button type="submit" style={{ marginLeft: '5px' }}>
        Quick Find
      </button>
    </form>
  );
}

export default QuickSearch;