import { Product, Profile, Review, User } from '@app/database';
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
  | InferSubjects<typeof User | typeof Profile | typeof Product | typeof Review>
  | 'all';
export type AppAbility = Ability<[ACTIONS, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[ACTIONS, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (this.checkAdmin(user)) {
      can(ACTIONS.CREATE, User);
      can(ACTIONS.UPDATE, User);
      can(ACTIONS.DELETE, User);
      can(ACTIONS.READ, User);
      can(ACTIONS.CREATE, Profile);
      can(ACTIONS.UPDATE, Profile);
      can(ACTIONS.DELETE, Profile);
      can(ACTIONS.READ, Profile);
      can(ACTIONS.CREATE, Product);
      can(ACTIONS.UPDATE, Product);
      can(ACTIONS.DELETE, Product);
      can(ACTIONS.READ, Product);
      can(ACTIONS.CREATE, Review);
      can(ACTIONS.UPDATE, Review);
      can(ACTIONS.DELETE, Review);
      can(ACTIONS.READ, Review);
    } else if (this.checkSeller(user)) {
      can(ACTIONS.CREATE, Product, { fk_productuser: user.id });
      can(ACTIONS.UPDATE, Product, { fk_productuser: user.id });
      can(ACTIONS.DELETE, Product, { fk_productuser: user.id });
    } else {
      can(ACTIONS.READ, Profile);
      can(ACTIONS.READ, Product);
      can(ACTIONS.READ, Review);
    }
    can(ACTIONS.READ, User, { id: user.id });
    can(ACTIONS.UPDATE, User, { id: user.id });
    can(ACTIONS.UPDATE, Profile, { fk_profileid: user.id });
    can(ACTIONS.UPDATE, Review, { fk_reviewuser: user.id });
    can(ACTIONS.DELETE, Review, { fk_reviewuser: user.id });
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
