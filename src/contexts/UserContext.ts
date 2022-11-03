import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { UserContextType } from '../@types/user';


export const UserContext = createContext<UserContextType | null>(null);
