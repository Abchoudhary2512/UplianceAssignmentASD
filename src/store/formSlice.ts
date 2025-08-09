import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
  parents: string[];
  formula: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: string;
  validation?: ValidationRules;
  derived?: DerivedConfig;
  options?: string[]; 
}

export interface FormSchema {
  updatedAt?: string | number | Date;
  name: string;
  createdAt: string;
  fields: FormField[];
}

interface FormState {
  currentForm: FormField[];
  savedForms: FormSchema[];
  submittedValues: Record<string, any>[];
}

const initialState: FormState = {
  currentForm: [],
  savedForms: JSON.parse(localStorage.getItem("forms") || "[]"),
  submittedValues: JSON.parse(localStorage.getItem("submissions") || "[]"),
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
      action: PayloadAction<{ id: string; key: keyof FormField; value: any }>
    ) => {
      const field = state.currentForm.find(f => f.id === action.payload.id);
      if (field) {
        (field as any)[action.payload.key] = action.payload.value;
      }
    },
    moveField: (state, action: PayloadAction<{ from: number; to: number }>) => {
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
    submitFormValues: (state, action: PayloadAction<Record<string, any>>) => {
      state.submittedValues.push(action.payload);
      localStorage.setItem("submissions", JSON.stringify(state.submittedValues));
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
  submitFormValues,
} = formSlice.actions;

export default formSlice.reducer;
