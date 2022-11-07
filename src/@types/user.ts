export type _UserContextType = null | {data:Record<string, any>, action: (_data: any) => void };

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};


export type UserContextType = {
  userSignupData: any,
  stripeCumtomerInfo?: { prices: any, customer: any},
  setStripeInfo?: (data: any) => void, 
  setUserSignupData: (data: any) => void
}