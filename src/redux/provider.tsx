'use client'
import { Provider as ProviderRedux } from "react-redux"
import { store } from "./store"
    
export function Provider({children}: {children: React.ReactNode}) {
        return <ProviderRedux store={store}>{children}</ProviderRedux>
    }