import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Divider,
  Tooltip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import SubjectIcon from "@mui/icons-material/Subject";
import ListIcon from "@mui/icons-material/List";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DateRangeIcon from "@mui/icons-material/DateRange";

import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../store";
import {
  addField,
  deleteField,
  updateFieldProperty,
  moveField,
  saveForm,
} from "../store/formSlice";
import { useState } from "react";

const fieldTypes = [
  { value: "text", label: "Text", icon: <TextFieldsIcon fontSize="small" /> },
  { value: "number", label: "Number", icon: <NumbersIcon fontSize="small" /> },
  { value: "textarea", label: "Textarea", icon: <SubjectIcon fontSize="small" /> },
  { value: "select", label: "Select", icon: <ListIcon fontSize="small" /> },
  { value: "radio", label: "Radio", icon: <RadioButtonCheckedIcon fontSize="small" /> },
  { value: "checkbox", label: "Checkbox", icon: <CheckBoxIcon fontSize="small" /> },
  { value: "date", label: "Date", icon: <DateRangeIcon fontSize="small" /> },
];

export default function CreateFormPage() {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.form.currentForm);
  const [newFieldType, setNewFieldType] = useState("text");
  const [formName, setFormName] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddField = () => {
    dispatch(
      addField({
        id: uuidv4(),
        type: newFieldType as any,
        label: "New Field",
        required: false,
        defaultValue: "",
        validation: {
          minLength: undefined,
          maxLength: undefined,
          isEmail: false,
          passwordRule: false,
        },
        options:
          newFieldType === "radio" ||
          newFieldType === "checkbox" ||
          newFieldType === "select"
            ? ["Option 1", "Option 2"]
            : undefined,
        isDerived: false,
        derivedParents: [],
        derivedFormula: "",
      })
    );
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }
    dispatch(saveForm(formName));
    setFormName("");
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sticky header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          p: 2,
          mb: 3,
          borderRadius: 1,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              size="small"
              label="Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="text.secondary">Form:</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveForm}
              disabled={!formName.trim()}
            >
              Save Form
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Add Field */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AddIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Add New Field
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <FormControl fullWidth size="small">
              <InputLabel>Field Type</InputLabel>
              <Select
                value={newFieldType}
                label="Field Type"
                onChange={(e) => setNewFieldType(e.target.value)}
              >
                {fieldTypes.map((ft) => (
                  <MenuItem key={ft.value} value={ft.value}>
                    <ListItemIcon>{ft.icon}</ListItemIcon>
                    <ListItemText primary={ft.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleAddField}
            >
              Add Field
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Fields List */}
      {fields.length > 0 ? (
        <Box>
          {fields.map((f, idx) => (
            <Paper
              key={f.id}
              sx={{
                p: 3,
                mb: 3,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              {/* Header */}
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "flex-start" : "center"}
                spacing={isMobile ? 2 : 0}
                mb={2}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={f.type.toUpperCase()}
                    color="primary"
                    size="small"
                  />
                  <Typography variant="subtitle1">
                    {f.label || "Unnamed Field"}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Move up">
                    <span>
                      <IconButton
                        onClick={() =>
                          dispatch(moveField({ from: idx, to: idx - 1 }))
                        }
                        disabled={idx === 0}
                      >
                        <ArrowUpwardIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Move down">
                    <span>
                      <IconButton
                        onClick={() =>
                          dispatch(moveField({ from: idx, to: idx + 1 }))
                        }
                        disabled={idx === fields.length - 1}
                      >
                        <ArrowDownwardIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete field">
                    <IconButton
                      onClick={() => dispatch(deleteField(f.id))}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Field Config */}
              <Grid container spacing={3}>
                {/* Basic Settings */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Basic Settings
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    label="Label"
                    value={f.label}
                    onChange={(e) =>
                      dispatch(
                        updateFieldProperty({
                          id: f.id,
                          key: "label",
                          value: e.target.value,
                        })
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Default Value"
                    value={f.defaultValue || ""}
                    onChange={(e) =>
                      dispatch(
                        updateFieldProperty({
                          id: f.id,
                          key: "defaultValue",
                          value: e.target.value,
                        })
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={f.required}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "required",
                              value: e.target.checked,
                            })
                          )
                        }
                      />
                    }
                    label="Required field (Not empty)"
                  />
                </Grid>

                {/* Validation */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Validation Rules
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="number"
                        size="small"
                        label="Min Length"
                        value={f.validation?.minLength || ""}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "validation",
                              value: {
                                ...f.validation,
                                minLength: Number(e.target.value),
                              },
                            })
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="number"
                        size="small"
                        label="Max Length"
                        value={f.validation?.maxLength || ""}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "validation",
                              value: {
                                ...f.validation,
                                maxLength: Number(e.target.value),
                              },
                            })
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={f.validation?.isEmail || false}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "validation",
                              value: {
                                ...f.validation,
                                isEmail: e.target.checked,
                              },
                            })
                          )
                        }
                      />
                    }
                    label="Must be a valid Email"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={f.validation?.passwordRule || false}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "validation",
                              value: {
                                ...f.validation,
                                passwordRule: e.target.checked,
                              },
                            })
                          )
                        }
                      />
                    }
                    label="Password Rule: min 8 chars, must contain a number"
                  />
                </Grid>

                {/* Options editor for radio/checkbox/select */}
                {(f.type === "radio" ||
                  f.type === "checkbox" ||
                  f.type === "select") && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" fontWeight={600} mb={1}>
                      Options
                    </Typography>
                    {f.options?.map((opt, optIndex) => (
                      <Box
                        key={optIndex}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          gap: 1,
                        }}
                      >
                        <TextField
                          size="small"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...(f.options || [])];
                            updated[optIndex] = e.target.value;
                            dispatch(
                              updateFieldProperty({
                                id: f.id,
                                key: "options",
                                value: updated,
                              })
                            );
                          }}
                          sx={{ flex: 1 }}
                        />
                        <IconButton
                          color="error"
                          onClick={() => {
                            const updated = (f.options || []).filter(
                              (_, i) => i !== optIndex
                            );
                            dispatch(
                              updateFieldProperty({
                                id: f.id,
                                key: "options",
                                value: updated,
                              })
                            );
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        dispatch(
                          updateFieldProperty({
                            id: f.id,
                            key: "options",
                            value: [
                              ...(f.options || []),
                              `Option ${
                                f.options?.length
                                  ? f.options.length + 1
                                  : 1
                              }`,
                            ],
                          })
                        )
                      }
                    >
                      Add Option
                    </Button>
                  </Grid>
                )}

                {/* Derived Field */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={f.isDerived || false}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "isDerived",
                              value: e.target.checked,
                            })
                          )
                        }
                      />
                    }
                    label="Mark as Derived Field"
                  />
                  {f.isDerived && (
                    <Box sx={{ mt: 2 }}>
                      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Parent Fields</InputLabel>
                        <Select
                          multiple
                          value={f.derivedParents || []}
                          onChange={(e) =>
                            dispatch(
                              updateFieldProperty({
                                id: f.id,
                                key: "derivedParents",
                                value: e.target.value,
                              })
                            )
                          }
                          renderValue={(selected) =>
                            selected
                              .map(
                                (pid) =>
                                  fields.find((fld) => fld.id === pid)?.label
                              )
                              .join(", ")
                          }
                        >
                          {fields
                            .filter((pf) => pf.id !== f.id)
                            .map((pf) => (
                              <MenuItem key={pf.id} value={pf.id}>
                                <Checkbox
                                  checked={
                                    f.derivedParents?.indexOf(pf.id) > -1
                                  }
                                />
                                <ListItemText primary={pf.label} />
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        label="Derived Formula (use field labels, e.g., `${fName} ${lName}`)"
                        value={f.derivedFormula || ""}
                        onChange={(e) =>
                          dispatch(
                            updateFieldProperty({
                              id: f.id,
                              key: "derivedFormula",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>No fields added yet</Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddField}
          >
            Add First Field
          </Button>
        </Paper>
      )}
    </Box>
  );
}
