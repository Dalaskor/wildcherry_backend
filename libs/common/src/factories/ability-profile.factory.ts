import { Product, Profile, User } from '@app/database';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ACTIONS } from '../consts/action.enum';
import { ROLES } from '../consts/roles.enum';

export type Subjects =
  | InferSubjects<typeof User | typeof Profile | typeof Product>
  | 'all';
export type AppAbility = Ability<[ACTIONS, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[ACTIONS, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (this.checkAdmin(user)) {
      can(ACTIONS.MANAGE, 'all');
    } else if (this.checkSeller(user)) {
      can(ACTIONS.CREATE, Product);
      can(ACTIONS.UPDATE, Product);
      can(ACTIONS.DELETE, Product);
    } else {
      can(ACTIONS.READ, Profile);
      can(ACTIONS.READ, Product);
    }
    can(ACTIONS.READ, User, { id: user.id });
    can(ACTIONS.UPDATE, User, { id: user.id });
    can(ACTIONS.UPDATE, Profile, { fk_profileid: user.id });
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
  checkAdmin(user: User): Boolean {
    for (let i = 0; i < user.roles.length; i++) {
      if (user.roles[i].value === ROLES.ADMIN) {
        return true;
      }
    }
    return false;
  }
  checkSeller(user: User): Boolean {
    for (let i = 0; i < user.roles.length; i++) {
      if (user.roles[i].value === ROLES.SELLER) {
        return true;
      }
    }
    return false;
  }
}
