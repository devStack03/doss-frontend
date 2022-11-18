export * from './axios';
export * from  './jwt';

// export const  humanizeFutureToNow = (fDate: Date) => {
//   let result = Array(), now = new Date()
//   let parts = ['year', 'month', 'day', 'hour', 'minute']

//   parts.forEach((p, i) => {
//     let uP = p.charAt(0).toUpperCase() + p.slice(1)
//     let t = dateFns[`differenceIn${uP}s`](fDate, now);
//     if (t) {
//       result.push(`${i===parts.length-1 ? 'and ' : ''}${t} ${uP}${t===1 ? '' : 's'}`);
//       if (i < parts.length)
//         fDate = dateFns[`sub${uP}s`](fDate, t);
//     }
//   })
//   return result.join(' ');
// }