import apiFetch from "./api";

export async function registerUser({ role, fullName, studentId, employeeId, email, password, password_confirmation }) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      password_confirmation,
      role,
      ...(role === "student"
        ? { studentId: studentId.trim() }
        : { employeeId: employeeId.trim() }),
    }),
  });
}

// login accepts either email or a role ID (student_id / employee_id).
// The API field is `login` — we pass whatever the user typed as-is.
export async function loginUser({ login, password, role }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ login: login.trim(), password, role }),
  });
}

// Returns: { message }
export async function forgotPassword({ email }) {
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
}

// Returns: { message }
export async function resetPassword({ token, email, password, password_confirmation }) {
  return apiFetch("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      email: email.trim().toLowerCase(),
      password,
      password_confirmation,
    }),
  });
}

export function saveSession({ token, token_type, user }) {
  localStorage.setItem("token", `${token_type} ${token}`);
  localStorage.setItem("role", user.role);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
}

export async function updateProfile(data) {
  return apiFetch("/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}