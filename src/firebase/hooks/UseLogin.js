import { useContext } from "react";
import { loginContext } from "../context/LoginContext";

export function UseLoginContext(){
    return useContext(loginContext);
}