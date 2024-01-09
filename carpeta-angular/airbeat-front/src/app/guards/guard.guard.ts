import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateUserService } from '../services/create-user.service';
import { inject } from '@angular/core';
export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject (Router)
  const authService = inject(CreateUserService)
  if(authService.decode()){
    console.log("hola")
    return true
  }else{
    const url = router.createUrlTree(["/login-page"])
    console.log("hola")
    return url
  }
}

export const guardAdmin: CanActivateFn = (route, state) => {
  const router = inject (Router)
  const authService = inject(CreateUserService)
  if(authService.admin()){
    console.log("hola")
    return true
  }else{
    const url = router.createUrlTree(["/home"])
    return url
  }
}

