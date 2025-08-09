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
  Container,
  Avatar,
  Stack,
  Card,
  Fade,
  Grow,
  Slide,
  Alert,
  LinearProgress,
  Chip,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import type { RootState } from "../store";

// Icons
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import SubjectIcon from "@mui/icons-material/Subject";
import ListIcon from "@mui/icons-material/List";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DateRangeIcon from "@mui/icons-material/DateRange";

const fieldTypeIcons = {
  text: <TextFieldsIcon />,
  number: <NumbersIcon />,
  textarea: <SubjectIcon />,
  select: <ListIcon />,
  radio: <RadioButtonCheckedIcon />,
  checkbox: <CheckBoxIcon />,
  date: <DateRangeIcon />,
};

const fieldTypeColors = {
  text: "#4CAF50",
  number: "#2196F3", 
  textarea: "#FF9800",
  select: "#9C27B0",
  radio: "#E91E63",
  checkbox: "#00BCD4",
  date: "#795548",
};

export default function PreviewFormPage() {
  const form = useSelector((state: RootState) => state.form.currentForm);
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formProgress, setFormProgress] = useState(0);

  const validateField = (field: any, value: string | string[]) => {
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
    if (!error && field.validation?.email) {
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

  const handleChange = (id: string, value: string | string[]) => {
    setValues((prev) => {
      const newValues = { ...prev, [id]: value };
      // Update progress
      const filledFields = Object.values(newValues).filter(v => 
        v !== "" && v !== undefined && v !== null && (!Array.isArray(v) || v.length > 0)
      ).length;
      setFormProgress((filledFields / form.length) * 100);
      return newValues;
    });
    setErrors((prev) => ({
      ...prev,
      [id]: validateField(form.find((f) => f.id === id), value),
    }));
  };



  return (
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
          height: "300px",
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Hero Header Section */}
        <Box sx={{ pt: 6, pb: 4, textAlign: "center" }}>
          <Fade in timeout={1000}>
            <Box>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 24px",
                  background: "linear-gradient(135deg, #4ECDC4 0%, #667eea 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <PreviewIcon sx={{ fontSize: 40, color: "white" }} />
              </Avatar>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  mb: 2,
                  textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem" }
                }}
              >
                Form Preview
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
                Test your form and see how it looks to users
              </Typography>
            </Box>
          </Fade>
        </Box>

        {form.length === 0 ? (
          <Slide direction="up" in timeout={1200}>
            <Paper
              elevation={24}
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 6,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto 24px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }}
              >
                <VisibilityIcon sx={{ fontSize: 60, color: "white" }} />
              </Avatar>
              <Typography variant="h4" fontWeight={600} mb={2} color="text.primary">
                No Form to Preview
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Create a form first, then come back here to preview it
              </Typography>
              <Button
                variant="contained"
                size="large"
                component="a"
                href="/create"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 6px 24px rgba(102, 126, 234, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.6)",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                Create Form
              </Button>
            </Paper>
          </Slide>
        ) : (
          <Grow in timeout={1200}>
            <Box>
              {/* Progress Bar */}
              <Paper
                elevation={12}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <AssignmentIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Form Completion: {Math.round(formProgress)}%
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={formProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: "linear-gradient(135deg, #4ECDC4 0%, #667eea 100%)",
                    }
                  }}
                />
              </Paper>

              {/* Form Container */}
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Box sx={{ p: 6 }}>
                  {form.map((field, index) => {
                    const value = values[field.id] || "";
                    const error = errors[field.id] || "";
                    const fieldColor = fieldTypeColors[field.type as keyof typeof fieldTypeColors];
                    const fieldIcon = fieldTypeIcons[field.type as keyof typeof fieldTypeIcons];

                    return (
                      <Fade in timeout={800 + index * 100} key={field.id}>
                        <Card
                          elevation={4}
                          sx={{
                            mb: 3,
                            borderRadius: 3,
                            border: error ? "2px solid #f44336" : "2px solid transparent",
                            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                            }
                          }}
                        >
                          <Box sx={{ p: 3 }}>
                            {/* Field Header */}
                            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  background: `linear-gradient(135deg, ${fieldColor} 0%, ${fieldColor}CC 100%)`,
                                  boxShadow: `0 4px 12px ${fieldColor}40`,
                                }}
                              >
                                {React.cloneElement(fieldIcon, {
                                  sx: { fontSize: 20, color: "white" }
                                })}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" fontWeight={600}>
                                  {field.label}
                                </Typography>
                                <Chip
                                  label={field.type.toUpperCase()}
                                  size="small"
                                  sx={{
                                    background: `${fieldColor}20`,
                                    color: fieldColor,
                                    fontWeight: 600,
                                  }}
                                />
                              </Box>
                              {field.required && (
                                <Chip
                                  label="Required"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </Stack>

                            {/* Field Input */}
                            {(() => {
                              switch (field.type) {
                                case "text":
                                case "number":
                                case "date":
                                  return (
                                    <TextField
                                      fullWidth
                                      type={field.type === "number" ? "number" : field.type}
                                      label={`Enter ${field.label}`}
                                      value={value}
                                      onChange={(e) => handleChange(field.id, e.target.value)}
                                      error={!!error}
                                      helperText={error}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 2,
                                          backgroundColor: "rgba(255,255,255,0.8)",
                                          "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.9)",
                                          },
                                          "&.Mui-focused": {
                                            backgroundColor: "white",
                                            boxShadow: `0 0 0 2px ${fieldColor}40`,
                                          }
                                        }
                                      }}
                                    />
                                  );
                                case "textarea":
                                  return (
                                    <TextField
                                      fullWidth
                                      multiline
                                      minRows={3}
                                      label={`Enter ${field.label}`}
                                      value={value}
                                      onChange={(e) => handleChange(field.id, e.target.value)}
                                      error={!!error}
                                      helperText={error}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 2,
                                          backgroundColor: "rgba(255,255,255,0.8)",
                                          "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.9)",
                                          },
                                          "&.Mui-focused": {
                                            backgroundColor: "white",
                                            boxShadow: `0 0 0 2px ${fieldColor}40`,
                                          }
                                        }
                                      }}
                                    />
                                  );

                                case "select":
                                  return (
                                    <TextField
                                      select
                                      fullWidth
                                      label={`Select ${field.label}`}
                                      value={value}
                                      onChange={(e) => handleChange(field.id, e.target.value)}
                                      error={!!error}
                                      helperText={error}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 2,
                                          backgroundColor: "rgba(255,255,255,0.8)",
                                          "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.9)",
                                          },
                                          "&.Mui-focused": {
                                            backgroundColor: "white",
                                            boxShadow: `0 0 0 2px ${fieldColor}40`,
                                          }
                                        }
                                      }}
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
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                                        Choose one option:
                                      </Typography>
                                      <RadioGroup
                                        value={value}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                      >
                                        {field.options?.map((opt, idx) => (
                                          <FormControlLabel
                                            key={idx}
                                            value={opt}
                                            control={
                                              <Radio
                                                sx={{
                                                  color: fieldColor,
                                                  "&.Mui-checked": {
                                                    color: fieldColor,
                                                  }
                                                }}
                                              />
                                            }
                                            label={
                                              <Typography variant="body1" fontWeight={500}>
                                                {opt}
                                              </Typography>
                                            }
                                            sx={{
                                              mb: 1,
                                              borderRadius: 2,
                                              border: "1px solid rgba(0,0,0,0.1)",
                                              mx: 0,
                                              px: 2,
                                              py: 1,
                                              "&:hover": {
                                                backgroundColor: `${fieldColor}10`,
                                                borderColor: fieldColor,
                                              }
                                            }}
                                          />
                                        ))}
                                      </RadioGroup>
                                      {error && (
                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                          {error}
                                        </Typography>
                                      )}
                                    </Box>
                                  );

                                case "checkbox":
                                  return (
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                                        Select all that apply:
                                      </Typography>
                                      <FormGroup>
                                        {field.options?.map((opt, idx) => (
                                          <FormControlLabel
                                            key={idx}
                                            control={
                                              <Checkbox
                                                checked={Array.isArray(value) && value.includes(opt)}
                                                onChange={(e) => {
                                                  let newValue = Array.isArray(value) ? [...value] : [];
                                                  if (e.target.checked) {
                                                    newValue.push(opt);
                                                  } else {
                                                    newValue = newValue.filter((v) => v !== opt);
                                                  }
                                                  handleChange(field.id, newValue);
                                                }}
                                                sx={{
                                                  color: fieldColor,
                                                  "&.Mui-checked": {
                                                    color: fieldColor,
                                                  }
                                                }}
                                              />
                                            }
                                            label={
                                              <Typography variant="body1" fontWeight={500}>
                                                {opt}
                                              </Typography>
                                            }
                                            sx={{
                                              mb: 1,
                                              borderRadius: 2,
                                              border: "1px solid rgba(0,0,0,0.1)",
                                              mx: 0,
                                              px: 2,
                                              py: 1,
                                              "&:hover": {
                                                backgroundColor: `${fieldColor}10`,
                                                borderColor: fieldColor,
                                              }
                                            }}
                                          />
                                        ))}
                                      </FormGroup>
                                      {error && (
                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                          {error}
                                        </Typography>
                                      )}
                                    </Box>
                                  );

                                default:
                                  return (
                                    <Alert severity="warning">
                                      Unsupported field type: {field.type}
                                    </Alert>
                                  );
                              }
                            })()}
                          </Box>
                        </Card>
                      </Fade>
                    );
                  })}


                </Box>
              </Paper>
            </Box>
          </Grow>
        )}


      </Container>
    </Box>
  );
}
