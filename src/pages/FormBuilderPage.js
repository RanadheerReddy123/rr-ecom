import React, { useState } from 'react';
import FormBuilderInput from '../FormBuilder/FormBuilderInput';
import FormSchemaPreview from '../FormBuilder/FormSchemaPreview';
import ExportedFormView from '../FormBuilder/ExportedFormView';

export default function FormBuilderPage() {
  const [schema, setSchema] = useState([]);

  const handleAddField = (field) => {
    setSchema((prev) => [...prev, field]);
  };

  const handleRemoveField = (id) => {
    setSchema((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2>Custom Checkout & Form Builder Module</h2>
      <p style={{ color: '#666' }}>
        Demonstrating <strong>Uncontrolled Components (`useRef`)</strong> for schema building and <strong>Controlled Components (`useState`)</strong> for interactive previews.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Left Column: Builder and Schema */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormBuilderInput onAddField={handleAddField} />
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h4 style={{ marginTop: 0 }}>Active Schema ({schema.length} items)</h4>
            <FormSchemaPreview fields={schema} onRemoveField={handleRemoveField} />
          </div>
        </div>

        {/* Right Column: Live Execution */}
        <div>
          <ExportedFormView fields={schema} />
        </div>
      </div>
    </div>
  );
}