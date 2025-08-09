import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import CreateFormPage from "./pages/CreateFormPage";
import PreviewPage from "./pages/PreviewPage";
import MyFormsPage from "./pages/MyFormsPage";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/create">
              Create
            </Button>
            <Button color="inherit" component={Link} to="/preview">
              Preview
            </Button>
            <Button color="inherit" component={Link} to="/myforms">
              My Forms
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<CreateFormPage />} />
          <Route path="/create" element={<CreateFormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/myforms" element={<MyFormsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
