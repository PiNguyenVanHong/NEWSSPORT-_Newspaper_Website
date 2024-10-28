import { SetMetadata } from '@nestjs/common';
import { Role } from '@/modules/roles/role.enum';

export const IS_ROLE_KEY = 'isRole'
export const Roles  = (...roles: Role[]) => SetMetadata(IS_ROLE_KEY, roles);