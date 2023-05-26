import { Profile, User } from '@app/database';
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

export type Subjects = InferSubjects<typeof User | typeof Profile> | 'all';
export type AppAbility = Ability<[ACTIONS, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[ACTIONS, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    if (this.checkAdmin(user)) {
      can(ACTIONS.MANAGE, 'all');
    } else {
      can(ACTIONS.READ, Profile);
    }
    can(ACTIONS.READ, User, {id: user.id});
    can(ACTIONS.UPDATE, User, {id: user.id});
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
}
