import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CheckUserLoggedProps {
  section: string;
}

function useCheckUserLogged({ section }: CheckUserLoggedProps) {
  const navigate = useNavigate();

  const checkUserLogged = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-user-logged");

      if (
        data.logged === true &&
        (section === "login" || section === "register")
      )
        navigate("/dashboard");
      if (data.logged === false && section === "dashboard") navigate("/login");
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogged();
  }, []);

  return {};
}

export default useCheckUserLogged;
