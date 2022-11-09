// export function validateEmail(email: string) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//     return true;
//   }
//   return false;
// }

export  function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export const validatePhoneField = (e: any) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
}