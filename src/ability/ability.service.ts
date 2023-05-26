import { AbilityFactory, ACTIONS } from "@app/common";
import { User } from "@app/database";
import { ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AbilityService {
  constructor(private abilityFactory: AbilityFactory) {}
  checkAbility(user: User, model: any, action: ACTIONS): Boolean {
    const ability = this.abilityFactory.createForUser(user);
    const isAllowed = ability.can(action, model);
    if (!isAllowed) {
      throw new ForbiddenException('Нет доступа');
    }
    return true;
  }
}
