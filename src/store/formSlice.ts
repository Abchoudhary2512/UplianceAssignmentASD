import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  passwordRule?: boolean;
}

export interface DerivedConfig {
  parents: string[]; // IDs of parent fields
  formula: string;   // JS expression, e.g., "2025 - new Date(dob).getFullYear()"
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: string;
  validation?: ValidationRules;
  derived?: DerivedConfig;
}

export interface FormSchema {
  name: string;
  createdAt: string;
  fields: FormField[];
}

interface FormState {
  currentForm: FormField[];
  savedForms: FormSchema[];
}

const initialState: FormState = {
  currentForm: [],
  savedForms: JSON.parse(localStorage.getItem("forms") || "[]"),
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FormField>) => {
      state.currentForm.push(action.payload);
    },
    updateFieldProperty: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ id: string; key: keyof FormField; value: any }>
    ) => {
      const field = state.currentForm.find(f => f.id === action.payload.id);
      if (field) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (field as any)[action.payload.key] = action.payload.value;
      }
    },
    moveField: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const arr = state.currentForm;
      if (action.payload.to < 0 || action.payload.to >= arr.length) return;
      const [moved] = arr.splice(action.payload.from, 1);
      arr.splice(action.payload.to, 0, moved);
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.currentForm = state.currentForm.filter(f => f.id !== action.payload);
    },
    saveForm: (state, action: PayloadAction<string>) => {
      const newForm: FormSchema = {
        name: action.payload,
        createdAt: new Date().toISOString(),
        fields: state.currentForm,
      };
      state.savedForms.push(newForm);
      localStorage.setItem("forms", JSON.stringify(state.savedForms));
      state.currentForm = [];
    },
    loadForm: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload.fields;
    },
  },
});

export const {
  addField,
  updateFieldProperty,
  moveField,
  deleteField,
  saveForm,
  loadForm,
} = formSlice.actions;

export default formSlice.reducer;
