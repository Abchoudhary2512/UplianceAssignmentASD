import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function PreviewPage() {
  const fields = useSelector((state: RootState) => state.form.currentForm);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize form values with defaults
  useEffect(() => {
    const initValues: Record<string, any> = {};
    fields.forEach((f) => {
      initValues[f.id] = f.defaultValue || (f.type === "checkbox" ? false : "");
    });
    setFormValues(initValues);
  }, [fields]);

  // Auto-update derived fields when parents change
// Auto-update derived fields when parents change
useEffect(() => {
  const updatedValues = { ...formValues };
  let changed = false;
  
  fields.forEach((f) => {
    if (f.derived) {
      try {
        const context: Record<string, any> = {};
        f.derived.parents.forEach((pid) => {
          context[pid] = formValues[pid];
        });
        
        // Only calculate if all parent values exist
        if (Object.values(context).every(val => val !== undefined)) {
          const fn = new Function(
            ...Object.keys(context),
            `return ${f.derived!.formula};`
          );
          const newVal = fn(...Object.values(context));
          if (updatedValues[f.id] !== newVal) {
            updatedValues[f.id] = newVal;
            changed = true;
          }
        }
      } catch {
        updatedValues[f.id] = "";
        changed = true;
      }
    }
  });

  if (changed) {
    setFormValues(updatedValues);
  }
}, [fields, JSON.stringify(formValues)]); // Using JSON.stringify to compare object changes

  // Validate one field
  const validateField = (fieldId: string, value: any): string => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return "";

    if (
      field.required &&
      (value === "" || value === null || value === undefined)
    ) {
      return "This field is required";
    }
    if (
      field.validation?.minLength &&
      typeof value === "string" &&
      value.length < field.validation.minLength
    ) {
      return `Minimum length is ${field.validation.minLength}`;
    }
    if (
      field.validation?.maxLength &&
      typeof value === "string" &&
      value.length > field.validation.maxLength
    ) {
      return `Maximum length is ${field.validation.maxLength}`;
    }
    if (field.validation?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format";
    }
    if (field.validation?.passwordRule) {
      const passwordRegex = /^(?=.*[0-9]).{8,}$/;
      if (!passwordRegex.test(value))
        return "Password must be at least 8 characters and contain a number";
    }
    return "";
  };

  // Handle input change
  const handleChange = (id: string, value: any) => {
    const errMsg = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: errMsg }));
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Handle submit
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const errMsg = validateField(f.id, formValues[f.id]);
      if (errMsg) newErrors[f.id] = errMsg;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!\n");
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Form Preview
      </Typography>
      {fields.length === 0 && (
        <Typography>
          No fields to preview. Please create a form first.
        </Typography>
      )}

      {fields.map((f) => (
        <div key={f.id} style={{ marginTop: "20px" }}>
          {/* Text / Number / Date */}
          {["text", "number", "date"].includes(f.type) && (
            <TextField
              type={f.type}
              label={f.label}
              value={formValues[f.id] || ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              fullWidth
              error={!!errors[f.id]}
              helperText={errors[f.id]}
              disabled={!!f.derived}
            />
          )}

          {/* Textarea */}
          {f.type === "textarea" && (
            <TextField
              multiline
              minRows={3}
              label={f.label}
              value={formValues[f.id] || ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              fullWidth
              error={!!errors[f.id]}
              helperText={errors[f.id]}
              disabled={!!f.derived}
            />
          )}

          {/* Select */}
          {f.type === "select" && (
            <TextField
              select
              label={f.label}
              value={formValues[f.id] || ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              fullWidth
              error={!!errors[f.id]}
              helperText={errors[f.id]}
              disabled={!!f.derived}
            >
              <MenuItem value="">-- Select --</MenuItem>
              {/* Example static options */}
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>
          )}

          {/* Radio */}
          {f.type === "radio" && (
            <>
              <Typography>{f.label}</Typography>
              <RadioGroup
                value={formValues[f.id] || ""}
                onChange={(e) => handleChange(f.id, e.target.value)}
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Option 2"
                />
              </RadioGroup>
              {errors[f.id] && (
                <Typography color="error">{errors[f.id]}</Typography>
              )}
            </>
          )}

          {/* Checkbox */}
          {f.type === "checkbox" && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues[f.id] || false}
                  onChange={(e) => handleChange(f.id, e.target.checked)}
                />
              }
              label={f.label}
            />
          )}
        </div>
      ))}

      {fields.length > 0 && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </Paper>
  );
}
