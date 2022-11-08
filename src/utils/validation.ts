// export function validateEmail(email: string) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//     return true;
//   }
//   return false;
// }

export  function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}