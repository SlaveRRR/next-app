"use client";
import React, { FC, useState } from "react";
import { Snackbar, ctx } from "./context";

type props = {
    children: React.ReactNode
}
const ContextProvider: FC<props> = ({ children }) => {
    const burger = useState<boolean>(false);
    const loader = useState<boolean>(false);
    const snackbar = useState<Snackbar>({
        active:false,
        message:'',
        isError:false
    })
    return (
        <ctx.Provider value={{
            burger:burger,
            loader:loader,
            snackbar:snackbar
        }}>
            {children}
        </ctx.Provider>
    )
}

export default ContextProvider;