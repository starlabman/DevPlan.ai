import { supabase } from '../lib/supabase';

export interface IdeaVersion {
  id: string;
  idea_id: string;
  user_id: string;
  version_number: number;
  description: string;
  tech_stack: any[];
  roadmap: any[];
  structure: string[];
  deployment: string[];
  pitch_deck: any[];
  changes_summary: string | null;
  created_at: string;
}

export interface VersionDiff {
  field: string;
  oldValue: string;
  newValue: string;
  type: 'added' | 'removed' | 'modified';
}

class VersionService {
  async createVersion(
    ideaId: string,
    versionNumber: number,
    data: {
      description: string;
      tech_stack: any[];
      roadmap: any[];
      structure: string[];
      deployment: string[];
      pitch_deck: any[];
    },
    changesSummary?: string
  ): Promise<IdeaVersion> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data: version, error } = await supabase
      .from('idea_versions')
      .insert({
        idea_id: ideaId,
        user_id: user.id,
        version_number: versionNumber,
        description: data.description,
        tech_stack: data.tech_stack,
        roadmap: data.roadmap,
        structure: data.structure,
        deployment: data.deployment,
        pitch_deck: data.pitch_deck,
        changes_summary: changesSummary,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('user_ideas')
      .update({
        current_version: versionNumber,
        total_versions: versionNumber,
      })
      .eq('id', ideaId);

    return version;
  }

  async getVersions(ideaId: string): Promise<IdeaVersion[]> {
    const { data, error } = await supabase
      .from('idea_versions')
      .select('*')
      .eq('idea_id', ideaId)
      .order('version_number', { ascending: false });

    if (error) throw error;

    return data || [];
  }

  async getVersion(ideaId: string, versionNumber: number): Promise<IdeaVersion | null> {
    const { data, error } = await supabase
      .from('idea_versions')
      .select('*')
      .eq('idea_id', ideaId)
      .eq('version_number', versionNumber)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async deleteVersion(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('idea_versions')
      .delete()
      .eq('id', versionId);

    if (error) throw error;
  }

  compareVersions(oldVersion: IdeaVersion, newVersion: IdeaVersion): VersionDiff[] {
    const diffs: VersionDiff[] = [];

    if (oldVersion.description !== newVersion.description) {
      diffs.push({
        field: 'Description',
        oldValue: oldVersion.description,
        newValue: newVersion.description,
        type: 'modified',
      });
    }

    const oldTechNames = oldVersion.tech_stack.map((t: any) => t.name);
    const newTechNames = newVersion.tech_stack.map((t: any) => t.name);

    newTechNames.forEach((name: string) => {
      if (!oldTechNames.includes(name)) {
        diffs.push({
          field: 'Tech Stack',
          oldValue: '',
          newValue: name,
          type: 'added',
        });
      }
    });

    oldTechNames.forEach((name: string) => {
      if (!newTechNames.includes(name)) {
        diffs.push({
          field: 'Tech Stack',
          oldValue: name,
          newValue: '',
          type: 'removed',
        });
      }
    });

    const oldPhases = oldVersion.roadmap.map((r: any) => r.phase);
    const newPhases = newVersion.roadmap.map((r: any) => r.phase);

    newPhases.forEach((phase: string) => {
      if (!oldPhases.includes(phase)) {
        diffs.push({
          field: 'Roadmap Phase',
          oldValue: '',
          newValue: phase,
          type: 'added',
        });
      }
    });

    oldPhases.forEach((phase: string) => {
      if (!newPhases.includes(phase)) {
        diffs.push({
          field: 'Roadmap Phase',
          oldValue: phase,
          newValue: '',
          type: 'removed',
        });
      }
    });

    return diffs;
  }

  generateChangesSummary(diffs: VersionDiff[]): string {
    if (diffs.length === 0) {
      return 'No changes detected';
    }

    const summary: string[] = [];

    const added = diffs.filter(d => d.type === 'added');
    const removed = diffs.filter(d => d.type === 'removed');
    const modified = diffs.filter(d => d.type === 'modified');

    if (added.length > 0) {
      summary.push(`Added: ${added.map(d => `${d.field} (${d.newValue})`).join(', ')}`);
    }

    if (removed.length > 0) {
      summary.push(`Removed: ${removed.map(d => `${d.field} (${d.oldValue})`).join(', ')}`);
    }

    if (modified.length > 0) {
      summary.push(`Modified: ${modified.map(d => d.field).join(', ')}`);
    }

    return summary.join('; ');
  }
}

export const versionService = new VersionService();
