import {
  TextField, MenuItem, Button, Paper, Typography, IconButton,
  Checkbox, FormControlLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../store";
import { addField, deleteField, updateFieldProperty, moveField, saveForm } from "../store/formSlice";
import { useState } from "react";

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
];

export default function CreateFormPage() {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.form.currentForm);
  const [newFieldType, setNewFieldType] = useState("text");
  const [formName, setFormName] = useState("");

  const handleAddField = () => {
    dispatch(
      addField({
        id: uuidv4(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: newFieldType as any,
        label: "New Field",
        required: false,
        defaultValue: "",
        validation: {},
      })
    );
  };

  const handleSaveForm = () => {
    if (!formName.trim()) return alert("Enter form name");
    dispatch(saveForm(formName));
    setFormName("");
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5">Form Builder</Typography>

      {/* Add new field section */}
      <TextField
        select
        label="Field Type"
        value={newFieldType}
        onChange={(e) => setNewFieldType(e.target.value)}
        sx={{ mt: 2, mr: 2 }}
      >
        {fieldTypes.map(ft => (
          <MenuItem key={ft.value} value={ft.value}>{ft.label}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleAddField}>Add Field</Button>

      {/* Existing fields */}
      <div style={{ marginTop: "20px" }}>
        {fields.map((f, idx) => (
          <Paper key={f.id} sx={{ p: 2, mb: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1">{f.type.toUpperCase()}</Typography>
              <div>
                <IconButton onClick={() => dispatch(moveField({ from: idx, to: idx - 1 }))} disabled={idx === 0}><ArrowUpwardIcon /></IconButton>
                <IconButton onClick={() => dispatch(moveField({ from: idx, to: idx + 1 }))} disabled={idx === fields.length - 1}><ArrowDownwardIcon /></IconButton>
                <IconButton onClick={() => dispatch(deleteField(f.id))}><DeleteIcon /></IconButton>
              </div>
            </div>

            {/* Editable configs */}
            <TextField
              label="Label"
              value={f.label}
              onChange={(e) => dispatch(updateFieldProperty({ id: f.id, key: "label", value: e.target.value }))}
              sx={{ mt: 2, mr: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={f.required}
                  onChange={(e) => dispatch(updateFieldProperty({ id: f.id, key: "required", value: e.target.checked }))}
                />
              }
              label="Required"
            />

            <TextField
              label="Default Value"
              value={f.defaultValue || ""}
              onChange={(e) => dispatch(updateFieldProperty({ id: f.id, key: "defaultValue", value: e.target.value }))}
              sx={{ mt: 2, mr: 2 }}
            />

            {/* Validation rules */}
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Validation</Typography>
            <TextField
              type="number"
              label="Min Length"
              value={f.validation?.minLength || ""}
              onChange={(e) => dispatch(updateFieldProperty({
                id: f.id,
                key: "validation",
                value: { ...f.validation, minLength: Number(e.target.value) }
              }))}
              sx={{ mt: 1, mr: 2 }}
            />
            <TextField
              type="number"
              label="Max Length"
              value={f.validation?.maxLength || ""}
              onChange={(e) => dispatch(updateFieldProperty({
                id: f.id,
                key: "validation",
                value: { ...f.validation, maxLength: Number(e.target.value) }
              }))}
              sx={{ mt: 1, mr: 2 }}
            />
            <FormControlLabel
              control={<Checkbox checked={f.validation?.email || false}
                onChange={(e) => dispatch(updateFieldProperty({
                  id: f.id,
                  key: "validation",
                  value: { ...f.validation, email: e.target.checked }
                }))} />}
              label="Email format"
            />
            <FormControlLabel
              control={<Checkbox checked={f.validation?.passwordRule || false}
                onChange={(e) => dispatch(updateFieldProperty({
                  id: f.id,
                  key: "validation",
                  value: { ...f.validation, passwordRule: e.target.checked }
                }))} />}
              label="Password rule"
            />

            {/* Derived field config */}
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Derived Field</Typography>
            <FormControlLabel
              control={<Checkbox
                checked={!!f.derived}
                onChange={(e) =>
                  dispatch(updateFieldProperty({
                    id: f.id,
                    key: "derived",
                    value: e.target.checked
                      ? { parents: [], formula: "" }
                      : undefined
                  }))
                }
              />}
              label="Is Derived?"
            />
            {f.derived && (
              <>
                <TextField
                  select
                  label="Parent Fields"
                  SelectProps={{ multiple: true }}
                  value={f.derived.parents}
                  onChange={(e) => dispatch(updateFieldProperty({
                    id: f.id,
                    key: "derived",
                    value: { ...f.derived, parents: e.target.value }
                  }))}
                  sx={{ mt: 1, mr: 2 }}
                >
                  {fields.filter(p => p.id !== f.id).map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Formula (JS)"
                  value={f.derived.formula}
                  onChange={(e) => dispatch(updateFieldProperty({
                    id: f.id,
                    key: "derived",
                    value: { ...f.derived, formula: e.target.value }
                  }))}
                  sx={{ mt: 1 }}
                />
              </>
            )}
          </Paper>
        ))}
      </div>

      {/* Save form */}
      <TextField
        label="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        sx={{ mt: 2, mr: 2 }}
      />
      <Button variant="outlined" onClick={handleSaveForm}>Save Form</Button>
    </Paper>
  );
}
