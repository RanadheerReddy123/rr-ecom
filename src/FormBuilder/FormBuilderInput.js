import React, { useRef } from 'react';

export default function FormBuilderInput({ onAddField }) {
  // Uncontrolled references
  const labelRef = useRef(null);
  const typeRef = useRef(null);
  const placeholderRef = useRef(null);
  const requiredRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read values directly from DOM elements via refs
    const newField = {
      id: Date.now(),
      label: labelRef.current.value || 'Untitled Field',
      type: typeRef.current.value,
      placeholder: placeholderRef.current.value,
      required: requiredRef.current.checked,
    };

    onAddField(newField);

    // Reset uncontrolled fields via DOM refs
    labelRef.current.value = '';
    placeholderRef.current.value = '';
    requiredRef.current.checked = false;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Add Form Element (Uncontrolled - useRef)</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Field Label</label>
          <input
            type="text"
            ref={labelRef}
            placeholder="e.g., Shipping Address"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Input Type</label>
          <select ref={typeRef} style={styles.input}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Placeholder</label>
          <input
            type="text"
            ref={placeholderRef}
            placeholder="e.g., Enter house number, street name"
            style={styles.input}
          />
        </div>

        <div style={styles.checkboxGroup}>
          <input type="checkbox" id="req-check" ref={requiredRef} />
          <label htmlFor="req-check">Required Field</label>
        </div>

        <button type="submit" style={styles.primaryBtn}>
          Add to Schema
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: { padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' },
  cardTitle: { marginTop: 0, marginBottom: '15px', fontSize: '1.1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#444' },
  input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.9rem' },
  checkboxGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  primaryBtn: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};