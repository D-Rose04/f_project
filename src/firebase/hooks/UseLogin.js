import { context } from "../context/LoginContext";
import { useContext } from "react";

export function UseLoginContext(){
    return useContext(context);
}