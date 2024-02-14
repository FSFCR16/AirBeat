import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CreateUserService } from '../services/create-user.service';
import { inject } from '@angular/core';
export const guardGuard: CanActivateFn = (route, state) => {
  return true
}

