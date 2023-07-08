import { useContext } from "react";
import { loadingContext } from "../context/LoadingContext";


export function UseLoadingContext(){
    return useContext(loadingContext);
}