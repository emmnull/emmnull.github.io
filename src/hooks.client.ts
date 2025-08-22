// import {
//   defineCustomClientStrategy,
//   isLocale,
// } from '$lib/i18n/generated/runtime';
// import type { ServerInit } from '@sveltejs/kit';

// export const init: ServerInit = () => {
//   defineCustomClientStrategy('custom-localStorage', {
//     getLocale() {
//       const [param] = window.location.pathname.split('/').filter(Boolean);
//       console.log(param);
//       if (param && isLocale(param)) {
//         return param;
//       }
//       const stored = localStorage.getItem('locale');
//       if (isLocale(stored)) {
//         return stored;
//       }
//       return undefined;
//     },
//     setLocale(locale) {
//       localStorage.setItem('locale', locale);
//     },
//   });
// };
