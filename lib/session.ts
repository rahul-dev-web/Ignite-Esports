export function getUserSession() {

  if (typeof window === "undefined") {
    return null;
  }

  const user =
    localStorage.getItem("ignite_user");

  return user
    ? JSON.parse(user)
    : null;
}

export function clearUserSession() {

  localStorage.removeItem(
    "ignite_user"
  );
}
