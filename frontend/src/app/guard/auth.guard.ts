// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import {jwtDecode} from 'jwt-decode';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       const decoded: any = jwtDecode(token);
//       if (decoded.exp * 1000 > Date.now()) {
//         return true;
//       }
//     }
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
