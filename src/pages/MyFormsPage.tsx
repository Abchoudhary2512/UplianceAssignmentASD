import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { loadForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Chip,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import { Visibility, Description, Folder } from "@mui/icons-material";
import { format } from "date-fns";

export default function MyFormsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const savedForms = useSelector((state: RootState) => state.form.savedForms);

  const handleOpenForm = (formIndex: number) => {
    const form = savedForms[formIndex];
    dispatch(loadForm(form));
    navigate("/preview");
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        m: 2,
        borderRadius: Number(theme.shape.borderRadius) * 2,
        backgroundColor: theme.palette.background.paper,
      }}
      elevation={3}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Description
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
            }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            My Saved Forms
          </Typography>
        </Box>
      </Stack>

      {savedForms.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            textAlign: "center",
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Folder
            sx={{
              fontSize: 60,
              color: theme.palette.text.disabled,
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No forms saved yet
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {savedForms.map((form, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                },
                transition: "all 0.2s ease",
              }}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <Tooltip title="Preview">
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenForm(index)}
                      sx={{
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light + "20",
                        },
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemButton
                  onClick={() => handleOpenForm(index)}
                  sx={{
                    p: 2,
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {form.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          Created: {format(new Date(form.createdAt), "PPpp")}
                        </Typography>
                        {form.updatedAt && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                            sx={{ display: "block" }}
                          >
                            Last updated:{" "}
                            {format(new Date(form.updatedAt), "PPpp")}
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <Chip
                    label={`${form.fields.length} fields`}
                    size="small"
                    sx={{
                      ml: 2,
                      backgroundColor: theme.palette.action.selected,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Paper>
  );
}
