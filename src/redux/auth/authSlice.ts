import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/network/axiosClient";

interface AdminLoginResponse {
  admin: {
    username: string;
    password: string;
    role: string;
    admin_id: string;
    name: string;
  } | null;
  token: string | null;
}

export interface LoginArguments {
  username: string;
  password: string;
}

const initialAuthState: AdminLoginResponse = {
  admin: null,
  token: null,
};

const adminLoginApi = async (username: string, password: string) => {
  const res = await axiosClient.post("/login", {
    username,
    password,
  });
  return res.data;
};

export const adminLogin = createAsyncThunk<AdminLoginResponse, LoginArguments>(
  "auth/adminLogin",
  async ({ username, password }: { username: string; password: string }) => {
    const res = await adminLoginApi(username, password);
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialAuthState },
  reducers: {
    clearToken() {
      return { ...initialAuthState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      adminLogin.fulfilled,
      (state, action: PayloadAction<AdminLoginResponse>) => {
        state.token = action.payload.token;
        state.admin = action.payload.admin;
      }
    );
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
