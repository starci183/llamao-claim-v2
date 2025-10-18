
import { configureStore } from "@reduxjs/toolkit"
import {
    nftReducer
} from "./slices"

export const store = configureStore({
    reducer: {
        nftReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
