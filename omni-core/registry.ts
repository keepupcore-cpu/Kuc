import { SkillSchema } from './adapters/prompt-builder';

// Static initialization of sovereign files to avoid Next.js cold FS latency issues,
// ensuring the registries can always be loaded synchronously and reliably.
import codeCrafterData from './skills/code-crafter.json';
import cyberDefenseData from './skills/cyber-defense.json';
import eternaiPreserverData from './skills/eternai-preserver.json';

const STATIC_SKILLS: Record<string, SkillSchema> = {
  'code-crafter': codeCrafterData,
  'cyber-defense': cyberDefenseData,
  'eternai-preserver': eternaiPreserverData,
};

/**
 * Omni-Core Skills & Agent Registry
 * Static, fast, and zero-dependency registry that lists and compiles available tactical modules.
 */
export class OmniCoreRegistry {
  /**
   * Retrieves all registered skills
   */
  public static getAllSkills(): SkillSchema[] {
    return Object.values(STATIC_SKILLS);
  }

  /**
   * Finds a registered skill by its key
   * @param key Unique identification key
   */
  public static getSkill(key: string): SkillSchema | null {
    return STATIC_SKILLS[key] || null;
  }

  /**
   * Registers a skill in-memory
   */
  public static registerSkill(skill: SkillSchema): void {
    STATIC_SKILLS[skill.key] = skill;
  }
}
