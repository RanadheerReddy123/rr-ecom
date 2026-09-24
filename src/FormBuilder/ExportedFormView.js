import React, { useState } from 'react';

export default function ExportedFormView({ fields }) {
  const [formData, setFormData] = useState({});
  const [submittedJson, setSubmittedJson] = useState(null);

  const handleChange = (id, val) => {
    setFormData((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedJson(formData);
  };

  if (fields.length === 0) {
    return <p style={{ color: '#888' }}>Build a form schema to test live execution.</p>;
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Live Form (Controlled Component)</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {fields.map((field) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>
              {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={styles.input}
              />
            ) : field.type === 'checkbox' ? (
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={!!formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                />
                {field.placeholder || field.label}
              </label>
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={styles.input}
              />
            )}
          </div>
        ))}

        <button type="submit" style={styles.successBtn}>Submit Generated Form</button>
      </form>

      {submittedJson && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eef9f1', borderRadius: '4px' }}>
          <strong>Captured Response Payload:</strong>
          <pre style={{ margin: '5px 0 0 0', fontSize: '0.85rem' }}>{JSON.stringify(submittedJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { padding: '20px', border: '1px solid #c3e6cb', borderRadius: '8px', backgroundColor: '#fafffa' },
  cardTitle: { marginTop: 0, marginBottom: '15px', color: '#155724' },
  input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.9rem' },
  successBtn: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};