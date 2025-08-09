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
  Divider,
} from "@mui/material";

export default function MyFormsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedForms = useSelector((state: RootState) => state.form.savedForms);

  const handleOpenForm = (formIndex: number) => {
    const form = savedForms[formIndex];
    dispatch(loadForm(form));
    navigate("/preview");
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Saved Forms
      </Typography>

      {savedForms.length === 0 ? (
        <Typography>No forms saved yet.</Typography>
      ) : (
        <List>
          {savedForms.map((form, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleOpenForm(index)}>
                  <ListItemText
                    primary={form.name}
                    secondary={`Created on ${new Date(
                      form.createdAt
                    ).toLocaleString()}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Paper>
  );
}
