import React from 'react';

export default function FormSchemaPreview({ fields, onRemoveField }) {
  if (fields.length === 0) {
    return <p style={{ color: '#888' }}>No fields configured yet. Add fields using the panel on the left.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {fields.map((field, idx) => (
        <div key={field.id} style={styles.item}>
          <div>
            <strong>{idx + 1}. {field.label}</strong>
            <span style={styles.meta}> ({field.type}) {field.required ? '• Required' : ''}</span>
          </div>
          <button onClick={() => onRemoveField(field.id)} style={styles.deleteBtn}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fafafa' },
  meta: { fontSize: '0.8rem', color: '#666' },
  deleteBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }
};