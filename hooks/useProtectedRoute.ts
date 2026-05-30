"use client";

import { useEffect, useState } from "react";

export function useProtectedRoute() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const user =
      localStorage.getItem(
        "ignite_user"
      );

    if (!user) {

      window.location.href =
        "/login";

      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);

  }, []);

  return loading;
}
