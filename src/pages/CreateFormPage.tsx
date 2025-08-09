/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Tooltip,
  InputAdornment,
  Stack,
  Card,
  CardActionArea,
  Fade,
  Grow,
  Slide,
  Container,
  Avatar,
} from "@mui/material";
import { parseISO } from "date-fns";

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
import CreateIcon from "@mui/icons-material/Create";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PaletteIcon from "@mui/icons-material/Palette";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
import React from "react";

const fieldTypes = [
  {
    value: "text",
    label: "Text Input",
    icon: <TextFieldsIcon />,
    description: "Single line text input",
    color: "#4CAF50",
    gradient: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
  },
  {
    value: "number",
    label: "Number",
    icon: <NumbersIcon />,
    description: "Numeric input field",
    color: "#2196F3",
    gradient: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
  },
  {
    value: "textarea",
    label: "Text Area",
    icon: <SubjectIcon />,
    description: "Multi-line text input",
    color: "#FF9800",
    gradient: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
  },
  {
    value: "select",
    label: "Dropdown",
    icon: <ListIcon />,
    description: "Select from options",
    color: "#9C27B0",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",
  },
  {
    value: "radio",
    label: "Radio Buttons",
    icon: <RadioButtonCheckedIcon />,
    description: "Choose one option",
    color: "#E91E63",
    gradient: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
  },
  {
    value: "checkbox",
    label: "Checkboxes",
    icon: <CheckBoxIcon />,
    description: "Multiple selections",
    color: "#00BCD4",
    gradient: "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)",
  },
  {
    value: "date",
    label: "Date Picker",
    icon: <DateRangeIcon />,
    description: "Date selection",
    color: "#795548",
    gradient: "linear-gradient(135deg, #795548 0%, #5D4037 100%)",
  },
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
        type: newFieldType as any,
        label: "New Field",
        required: false,
        defaultValue: "",
        validation: {
          minLength: undefined,
          maxLength: undefined,
          passwordRule: false,
        },
        options:
          newFieldType === "radio" ||
          newFieldType === "checkbox" ||
          newFieldType === "select"
            ? ["Option 1", "Option 2"]
            : undefined,
      })
    );
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field to the form");
      return;
    }
    dispatch(saveForm(formName));
    setFormName("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "400px",
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Hero Header Section */}
          <Box sx={{ pt: 6, pb: 4, textAlign: "center" }}>
            <Fade in timeout={1000}>
              <Box>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 24px",
                    background:
                      "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <CreateIcon sx={{ fontSize: 40, color: "white" }} />
                </Avatar>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    mb: 2,
                    textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Create Amazing Forms
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    mb: 4,
                    fontWeight: 300,
                    maxWidth: 600,
                    margin: "0 auto 32px",
                  }}
                >
                  Build beautiful, interactive forms with our intuitive
                  drag-and-drop builder
                </Typography>
              </Box>
            </Fade>

            {/* Form Name Input Section */}
            <Grow in timeout={1200}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  maxWidth: 600,
                  margin: "0 auto",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    label="Form Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.9)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AutoFixHighIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your form name..."
                  />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveForm}
                    disabled={!formName.trim() || fields.length === 0}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                        boxShadow: "0 6px 24px rgba(102, 126, 234, 0.6)",
                      },
                      "&:disabled": {
                        background: "rgba(0,0,0,0.12)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Save Form
                  </Button>
                </Stack>
              </Paper>
            </Grow>
          </Box>

          {/* Field Type Selection */}
          <Slide direction="up" in timeout={1400}>
            <Box sx={{ mb: 6 }}>
              <Paper
                elevation={20}
                sx={{
                  p: 4,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 2,
                    }}
                  >
                    Choose Your Field Type
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Select from our collection of interactive field types
                  </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {fieldTypes.map((fieldType, index) => (
                    <Grid>
                      <Fade in timeout={1600 + index * 100}>
                        <Card
                          sx={{
                            height: "100%",
                            cursor: "pointer",
                            borderRadius: 4,
                            border:
                              newFieldType === fieldType.value
                                ? `3px solid ${fieldType.color}`
                                : "3px solid transparent",
                            background:
                              newFieldType === fieldType.value
                                ? `${fieldType.gradient}`
                                : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                            boxShadow:
                              newFieldType === fieldType.value
                                ? `0 8px 32px ${fieldType.color}40`
                                : "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform:
                              newFieldType === fieldType.value
                                ? "translateY(-4px)"
                                : "translateY(0)",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: `0 12px 40px ${fieldType.color}30`,
                              border: `3px solid ${fieldType.color}`,
                            },
                          }}
                          onClick={() => setNewFieldType(fieldType.value)}
                        >
                          <CardActionArea
                            sx={{
                              height: "100%",
                              p: 3,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 64,
                                height: 64,
                                mb: 2,
                                background:
                                  newFieldType === fieldType.value
                                    ? "rgba(255,255,255,0.2)"
                                    : fieldType.gradient,
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                              }}
                            >
                              {React.cloneElement(fieldType.icon, {
                                sx: {
                                  fontSize: 28,
                                  color:
                                    newFieldType === fieldType.value
                                      ? "white"
                                      : "white",
                                },
                              })}
                            </Avatar>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                color:
                                  newFieldType === fieldType.value
                                    ? "white"
                                    : "text.primary",
                                textAlign: "center",
                              }}
                            >
                              {fieldType.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  newFieldType === fieldType.value
                                    ? "rgba(255,255,255,0.9)"
                                    : "text.secondary",
                                textAlign: "center",
                                lineHeight: 1.4,
                              }}
                            >
                              {fieldType.description}
                            </Typography>
                          </CardActionArea>
                        </Card>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<RocketLaunchIcon />}
                    onClick={handleAddField}
                    sx={{
                      borderRadius: 4,
                      px: 6,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background:
                        fieldTypes.find((ft) => ft.value === newFieldType)
                          ?.gradient ||
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: `0 6px 24px ${
                        fieldTypes.find((ft) => ft.value === newFieldType)
                          ?.color || "#667eea"
                      }40`,
                      "&:hover": {
                        boxShadow: `0 8px 32px ${
                          fieldTypes.find((ft) => ft.value === newFieldType)
                            ?.color || "#667eea"
                        }60`,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Add{" "}
                    {fieldTypes.find((ft) => ft.value === newFieldType)?.label}{" "}
                    Field
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Slide>

          {/* Fields List */}
          {fields.length > 0 ? (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Your Form Fields ({fields.length})
              </Typography>

              {fields.map((f, idx) => {
                const fieldTypeData = fieldTypes.find(
                  (ft) => ft.value === f.type
                );
                return (
                  <Fade in timeout={800 + idx * 100} key={f.id}>
                    <Paper
                      elevation={12}
                      sx={{
                        mb: 4,
                        borderRadius: 5,
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      {/* Stunning Header with Gradient Bar */}
                      <Box
                        sx={{
                          background:
                            fieldTypeData?.gradient ||
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          p: 3,
                          color: "white",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ position: "relative", zIndex: 1 }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                background: "rgba(255,255,255,0.2)",
                                backdropFilter: "blur(10px)",
                                border: "2px solid rgba(255,255,255,0.3)",
                              }}
                            >
                              {fieldTypeData?.icon &&
                                React.cloneElement(fieldTypeData.icon, {
                                  sx: { color: "white", fontSize: 24 },
                                })}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, color: "white" }}
                              >
                                {f.label || "Unnamed Field"}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "rgba(255,255,255,0.8)" }}
                              >
                                {fieldTypeData?.description ||
                                  f.type.toUpperCase()}
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Drag to reorder">
                              <IconButton
                                sx={{
                                  color: "rgba(255,255,255,0.8)",
                                  "&:hover": {
                                    color: "white",
                                    background: "rgba(255,255,255,0.1)",
                                  },
                                }}
                              >
                                <DragIndicatorIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Move up">
                              <span>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      moveField({ from: idx, to: idx - 1 })
                                    )
                                  }
                                  disabled={idx === 0}
                                  sx={{
                                    color:
                                      idx === 0
                                        ? "rgba(255,255,255,0.3)"
                                        : "rgba(255,255,255,0.8)",
                                    "&:hover": {
                                      color: "white",
                                      background: "rgba(255,255,255,0.1)",
                                    },
                                  }}
                                >
                                  <ArrowUpwardIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                            <Tooltip title="Move down">
                              <span>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      moveField({ from: idx, to: idx + 1 })
                                    )
                                  }
                                  disabled={idx === fields.length - 1}
                                  sx={{
                                    color:
                                      idx === fields.length - 1
                                        ? "rgba(255,255,255,0.3)"
                                        : "rgba(255,255,255,0.8)",
                                    "&:hover": {
                                      color: "white",
                                      background: "rgba(255,255,255,0.1)",
                                    },
                                  }}
                                >
                                  <ArrowDownwardIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                            <Tooltip title="Delete field">
                              <IconButton
                                onClick={() => dispatch(deleteField(f.id))}
                                sx={{
                                  color: "rgba(255,255,255,0.8)",
                                  "&:hover": {
                                    color: "#ff6b6b",
                                    background: "rgba(255,107,107,0.1)",
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </Box>

                      {/* Field Configuration */}
                      <Box sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                          <Grid>
                            <Paper
                              elevation={4}
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                background:
                                  "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                                border: "1px solid rgba(0,0,0,0.05)",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 3,
                                  color: "text.primary",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <PaletteIcon color="primary" />
                                Basic Settings
                              </Typography>
                              <TextField
                                fullWidth
                                label="Field Label"
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
                                sx={{
                                  mb: 3,
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                    "&:hover": {
                                      backgroundColor: "rgba(255,255,255,0.9)",
                                    },
                                    "&.Mui-focused": {
                                      backgroundColor: "white",
                                    },
                                  },
                                }}
                              />

                              {f.type === "date" ? (
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DatePicker
                                    label="Default Date"
                                    value={
                                      f.defaultValue
                                        ? parseISO(f.defaultValue)
                                        : null
                                    }
                                    onChange={(newValue: Date | null) => {
                                      dispatch(
                                        updateFieldProperty({
                                          id: f.id,
                                          key: "defaultValue",
                                          value: newValue
                                            ? newValue.toISOString()
                                            : null,
                                        })
                                      );
                                    }}
                                    slotProps={{
                                      textField: {
                                        fullWidth: true,
                                        sx: {
                                          mb: 3,
                                          "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            backgroundColor:
                                              "rgba(255,255,255,0.8)",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255,255,255,0.9)",
                                            },
                                            "&.Mui-focused": {
                                              backgroundColor: "white",
                                            },
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                              ) : (
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
                                  sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      backgroundColor: "rgba(255,255,255,0.8)",
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(255,255,255,0.9)",
                                      },
                                      "&.Mui-focused": {
                                        backgroundColor: "white",
                                      },
                                    },
                                  }}
                                />
                              )}

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
                                    sx={{
                                      color:
                                        fieldTypeData?.color || "primary.main",
                                      "&.Mui-checked": {
                                        color:
                                          fieldTypeData?.color ||
                                          "primary.main",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography variant="body2" fontWeight={500}>
                                    Required field (Not empty)
                                  </Typography>
                                }
                              />
                            </Paper>
                          </Grid>

                          {/* Validation Rules */}
                          <Grid>
                            <Paper
                              elevation={4}
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                background:
                                  "linear-gradient(135deg, #f1f3f4 0%, #ffffff 100%)",
                                border: "1px solid rgba(0,0,0,0.05)",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  mb: 3,
                                  color: "text.primary",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <AutoFixHighIcon color="secondary" />
                                Validation Rules
                              </Typography>
                              <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid>
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
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor:
                                          "rgba(255,255,255,0.8)",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(255,255,255,0.9)",
                                        },
                                        "&.Mui-focused": {
                                          backgroundColor: "white",
                                        },
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid>
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
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor:
                                          "rgba(255,255,255,0.8)",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(255,255,255,0.9)",
                                        },
                                        "&.Mui-focused": {
                                          backgroundColor: "white",
                                        },
                                      },
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              <Stack spacing={2}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
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
                                      sx={{
                                        color:
                                          fieldTypeData?.color ||
                                          "primary.main",
                                        "&.Mui-checked": {
                                          color:
                                            fieldTypeData?.color ||
                                            "primary.main",
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      variant="body2"
                                      fontWeight={500}
                                    >
                                      Must be a valid Email
                                    </Typography>
                                  }
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={
                                        f.validation?.passwordRule || false
                                      }
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
                                      sx={{
                                        color:
                                          fieldTypeData?.color ||
                                          "primary.main",
                                        "&.Mui-checked": {
                                          color:
                                            fieldTypeData?.color ||
                                            "primary.main",
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      variant="body2"
                                      fontWeight={500}
                                    >
                                      Password Rule: min 8 chars, must contain a
                                      number
                                    </Typography>
                                  }
                                />
                              </Stack>
                            </Paper>
                          </Grid>

                          {/* Options editor for radio/checkbox/select */}
                          {(f.type === "radio" ||
                            f.type === "checkbox" ||
                            f.type === "select") && (
                            <Grid>
                              <Paper
                                elevation={4}
                                sx={{
                                  p: 3,
                                  borderRadius: 3,
                                  background:
                                    "linear-gradient(135deg, #e8f5e8 0%, #ffffff 100%)",
                                  border: "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: "text.primary",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <ListIcon color="success" />
                                  Options Configuration
                                </Typography>
                                <Stack spacing={2}>
                                  {f.options?.map((opt, optIndex) => (
                                    <Box
                                      key={optIndex}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                      }}
                                    >
                                      <TextField
                                        fullWidth
                                        value={opt}
                                        label={`Option ${optIndex + 1}`}
                                        onChange={(e) => {
                                          const updated = [
                                            ...(f.options || []),
                                          ];
                                          updated[optIndex] = e.target.value;
                                          dispatch(
                                            updateFieldProperty({
                                              id: f.id,
                                              key: "options",
                                              value: updated,
                                            })
                                          );
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            backgroundColor:
                                              "rgba(255,255,255,0.8)",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255,255,255,0.9)",
                                            },
                                            "&.Mui-focused": {
                                              backgroundColor: "white",
                                            },
                                          },
                                        }}
                                      />
                                      <IconButton
                                        onClick={() => {
                                          const updated = (
                                            f.options || []
                                          ).filter((_, i) => i !== optIndex);
                                          dispatch(
                                            updateFieldProperty({
                                              id: f.id,
                                              key: "options",
                                              value: updated,
                                            })
                                          );
                                        }}
                                        sx={{
                                          color: "#ff6b6b",
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(255,107,107,0.1)",
                                          },
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Box>
                                  ))}
                                  <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
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
                                    sx={{
                                      borderRadius: 2,
                                      borderColor: fieldTypeData?.color,
                                      color: fieldTypeData?.color,
                                      "&:hover": {
                                        borderColor: fieldTypeData?.color,
                                        backgroundColor: `${fieldTypeData?.color}15`,
                                      },
                                    }}
                                  >
                                    Add Option
                                  </Button>
                                </Stack>
                              </Paper>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Paper>
                  </Fade>
                );
              })}
            </Box>
          ) : (
            <Slide direction="up" in timeout={1600}>
              <Paper
                elevation={12}
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 24px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <CreateIcon sx={{ fontSize: 40, color: "white" }} />
                </Avatar>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  mb={2}
                  color="text.primary"
                >
                  No fields added yet
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                  Start building your form by adding your first field
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketLaunchIcon />}
                  onClick={handleAddField}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 6px 24px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Add Your First Field
                </Button>
              </Paper>
            </Slide>
          )}
        </Container>
      </Box>
    </LocalizationProvider>
  );
}
