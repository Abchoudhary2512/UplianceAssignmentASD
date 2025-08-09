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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
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
        validation: {},
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
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius * 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              p: 1,
              borderRadius: theme.shape.borderRadius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SaveIcon fontSize="medium" />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Form Builder
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

        {/* Form Name and Save */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: theme.palette.background.default,
                },
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
              size="large"
              disabled={!formName.trim()}
              sx={{
                height: "56px",
                borderRadius: theme.shape.borderRadius,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: theme.palette.primary.dark,
                },
                "&.Mui-disabled": {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
              }}
            >
              Save Form
            </Button>
          </Grid>
        </Grid>

        {/* Add new field section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[100],
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius * 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <AddIcon color="primary" />
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Add New Field
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={8} md={9}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="field-type-label">Field Type</InputLabel>
                <Select
                  labelId="field-type-label"
                  value={newFieldType}
                  label="Field Type"
                  onChange={(e) => setNewFieldType(e.target.value)}
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.default,
                    "& .MuiSelect-select": {
                      py: 1.5,
                    },
                  }}
                >
                  {fieldTypes.map((ft) => (
                    <MenuItem key={ft.value} value={ft.value} sx={{ py: 1 }}>
                      {ft.label}
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
                size="large"
                sx={{
                  height: "56px",
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                Add Field
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Existing fields */}
        {fields.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                p: 1,
                borderRadius: theme.shape.borderRadius,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[100],
              }}
            >
              <Chip
                label={fields.length}
                color="primary"
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Form Fields
              </Typography>
            </Box>

            {fields.map((f, idx) => (
              <Paper
                key={f.id}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius * 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    mb: 2,
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 2 : 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={f.type.toUpperCase()}
                      color="primary"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        borderRadius: theme.shape.borderRadius,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {f.label || "Unnamed Field"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      ml: isMobile ? 0 : 2,
                    }}
                  >
                    <Tooltip title="Move up">
                      <span>
                        <IconButton
                          onClick={() =>
                            dispatch(moveField({ from: idx, to: idx - 1 }))
                          }
                          disabled={idx === 0}
                          sx={{
                            backgroundColor: theme.palette.action.hover,
                            "&:hover": {
                              backgroundColor: theme.palette.action.selected,
                            },
                          }}
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
                          sx={{
                            backgroundColor: theme.palette.action.hover,
                            "&:hover": {
                              backgroundColor: theme.palette.action.selected,
                            },
                          }}
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete field">
                      <IconButton
                        onClick={() => dispatch(deleteField(f.id))}
                        color="error"
                        sx={{
                          backgroundColor: theme.palette.error.light + "20",
                          "&:hover": {
                            backgroundColor: theme.palette.error.light + "40",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: theme.palette.divider,
                  }}
                />

                {/* Field Configuration */}
                <Grid container spacing={3}>
                  {/* Basic Settings */}
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "4px",
                          height: "16px",
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "2px",
                        }}
                      />
                      Basic Settings
                    </Typography>
                    <TextField
                      fullWidth
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
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      fullWidth
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
                      variant="outlined"
                      size="small"
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
                          color="primary"
                        />
                      }
                      label="Required field"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.text.secondary,
                        },
                      }}
                    />
                  </Grid>

                  {/* Validation */}
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "4px",
                          height: "16px",
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: "2px",
                        }}
                      />
                      Validation Rules
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
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
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
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
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={f.validation?.email || false}
                              onChange={(e) =>
                                dispatch(
                                  updateFieldProperty({
                                    id: f.id,
                                    key: "validation",
                                    value: {
                                      ...f.validation,
                                      email: e.target.checked,
                                    },
                                  })
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Must be valid email"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              color: theme.palette.text.secondary,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                              color="primary"
                            />
                          }
                          label="Must meet password requirements"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              color: theme.palette.text.secondary,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Derived Field */}
                  {f.type !== "checkbox" && f.type !== "radio" && (
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          fontWeight: 600,
                          color: theme.palette.text.secondary,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: "4px",
                            height: "16px",
                            backgroundColor: theme.palette.info.main,
                            borderRadius: "2px",
                          }}
                        />
                        Derived Field Configuration
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!f.derived}
                            onChange={(e) =>
                              dispatch(
                                updateFieldProperty({
                                  id: f.id,
                                  key: "derived",
                                  value: e.target.checked
                                    ? { parents: [], formula: "" }
                                    : undefined,
                                })
                              )
                            }
                            color="primary"
                          />
                        }
                        label="This is a derived field (value calculated from other fields)"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: theme.palette.text.secondary,
                          },
                        }}
                      />
                      {f.derived && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel>Parent Fields</InputLabel>
                              <Select
                                multiple
                                value={f.derived.parents}
                                onChange={(e) =>
                                  dispatch(
                                    updateFieldProperty({
                                      id: f.id,
                                      key: "derived",
                                      value: {
                                        ...f.derived,
                                        parents: e.target.value,
                                      },
                                    })
                                  )
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => {
                                      const parent = fields.find(
                                        (p) => p.id === value
                                      );
                                      return (
                                        <Chip
                                          key={value}
                                          label={parent?.label || value}
                                          size="small"
                                          sx={{
                                            borderRadius:
                                              theme.shape.borderRadius,
                                          }}
                                        />
                                      );
                                    })}
                                  </Box>
                                )}
                                sx={{
                                  borderRadius: theme.shape.borderRadius,
                                  backgroundColor:
                                    theme.palette.background.default,
                                }}
                              >
                                {fields
                                  .filter((p) => p.id !== f.id)
                                  .map((p) => (
                                    <MenuItem key={p.id} value={p.id}>
                                      {p.label}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Formula (JavaScript)"
                              value={f.derived.formula}
                              onChange={(e) =>
                                dispatch(
                                  updateFieldProperty({
                                    id: f.id,
                                    key: "derived",
                                    value: {
                                      ...f.derived,
                                      formula: e.target.value,
                                    },
                                  })
                                )
                              }
                              placeholder="Example: parent1 + ' ' + parent2"
                              variant="outlined"
                              size="small"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Paper>
            ))}
          </Box>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.grey[100],
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius * 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No fields added yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use the controls above to add your first field
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddField}
              sx={{
                borderRadius: theme.shape.borderRadius,
              }}
            >
              Add First Field
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
