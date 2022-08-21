import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

interface CheckUserLoggedProps {
  section: string;
}

function useCheckUserLogged({ section }: CheckUserLoggedProps) {
  const navigate = useNavigate();
  const { handleContextData } = useContext(AppContext);

  const checkUserLogged = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-user-logged");

      if (data.userDecoded)
        handleContextData({
          user: {
            username: data.userDecoded.username,
          },
          logged: data.logged,
        });

      if (
        data.logged === true &&
        (section === "login" || section === "register")
      )
        navigate("/dashboard");
      if (data.logged === false && section === "dashboard") navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogged();
  }, []);

  return {};
}

export default useCheckUserLogged;
