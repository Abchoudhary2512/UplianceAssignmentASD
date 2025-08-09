import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormGroup,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../store";

export default function PreviewFormPage() {
  const form = useSelector((state: RootState) => state.form.currentForm);
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: any, value: any) => {
    let error = "";

    // Required
    if (field.required && !value?.toString().trim()) {
      error = "This field is required";
    }

    // Min length
    if (!error && field.validation?.minLength) {
      if (value?.length < field.validation.minLength) {
        error = `Minimum length is ${field.validation.minLength}`;
      }
    }

    // Max length
    if (!error && field.validation?.maxLength) {
      if (value?.length > field.validation.maxLength) {
        error = `Maximum length is ${field.validation.maxLength}`;
      }
    }

    // Email format
    if (!error && field.validation?.isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        error = "Invalid email format";
      }
    }

    // Password rule
    if (!error && field.validation?.passwordRule) {
      const passwordRegex = /^(?=.*\d).{8,}$/;
      if (value && !passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters and contain a number";
      }
    }

    return error;
  };

  const handleChange = (id: string, value: any) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({
      ...prev,
      [id]: validateField(form.find((f) => f.id === id), value),
    }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Preview Form
      </Typography>
      {form.length === 0 ? (
        <Typography color="text.secondary">
          No fields to preview.
        </Typography>
      ) : (
        <Paper sx={{ p: 3 }}>
          {form.map((field) => {
            const value = values[field.id] || "";
            const error = errors[field.id] || "";

            switch (field.type) {
              case "text":
              case "number":
              case "date":
                return (
                  <TextField
                    key={field.id}
                    fullWidth
                    margin="normal"
                    type={field.type === "number" ? "number" : field.type}
                    label={field.label}
                    value={value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    error={!!error}
                    helperText={error}
                  />
                );
              case "textarea":
                return (
                  <TextField
                    key={field.id}
                    fullWidth
                    margin="normal"
                    label={field.label}
                    value={value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    error={!!error}
                    helperText={error}
                    multiline
                    minRows={3}
                  />
                );
              case "select":
                return (
                  <TextField
                    key={field.id}
                    select
                    fullWidth
                    margin="normal"
                    label={field.label}
                    value={value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    error={!!error}
                    helperText={error}
                  >
                    {field.options?.map((opt, idx) => (
                      <MenuItem key={idx} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              case "radio":
                return (
                  <Box key={field.id} sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">
                      {field.label}
                    </Typography>
                    <RadioGroup
                      value={value}
                      onChange={(e) =>
                        handleChange(field.id, e.target.value)
                      }
                    >
                      {field.options?.map((opt, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={opt}
                          control={<Radio />}
                          label={opt}
                        />
                      ))}
                    </RadioGroup>
                    {error && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        {error}
                      </Typography>
                    )}
                  </Box>
                );
              case "checkbox":
                return (
                  <Box key={field.id} sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">
                      {field.label}
                    </Typography>
                    <FormGroup>
                      {field.options?.map((opt, idx) => (
                        <FormControlLabel
                          key={idx}
                          control={
                            <Checkbox
                              checked={
                                Array.isArray(value) &&
                                value.includes(opt)
                              }
                              onChange={(e) => {
                                let newValue = Array.isArray(value)
                                  ? [...value]
                                  : [];
                                if (e.target.checked) {
                                  newValue.push(opt);
                                } else {
                                  newValue = newValue.filter(
                                    (v) => v !== opt
                                  );
                                }
                                handleChange(field.id, newValue);
                              }}
                            />
                          }
                          label={opt}
                        />
                      ))}
                    </FormGroup>
                    {error && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        {error}
                      </Typography>
                    )}
                  </Box>
                );
              default:
                return null;
            }
          })}
        </Paper>
      )}
    </Box>
  );
}
