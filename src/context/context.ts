import React from 'react';
export type Snackbar = {
    active: boolean;
    message: string;
    isError:boolean;
}
interface IContext {
    burger: [boolean, (active: boolean) => void],
    loader: [boolean, (active: boolean) => void],
    snackbar: [Snackbar,(state: Snackbar) => void]

}
export const ctx = React.createContext<IContext>({} as IContext)
