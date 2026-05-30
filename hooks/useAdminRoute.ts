"use client";

import { useEffect, useState }
from "react";

export function useAdminRoute() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "ignite_user"
      );

    if (!storedUser) {

      window.location.href =
        "/login";

      return;
    }

    const user =
      JSON.parse(storedUser);

    if (user.role !== "admin") {

      window.location.href = "/";

      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);

  }, []);

  return loading;
}
