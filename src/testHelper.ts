import { TsGitHubProjects } from './';
import { Project } from './types';

export async function setupAndCreateOrgProject(): Promise<[TsGitHubProjects, Project]> {
  const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
  // create a project
  const project = await gh.createOrganizationProject(
    '9sako6-playground',
    {
      name: `create_organization_project_integration_test_at_${Date.now()}`,
      body: `test projcet ${Date.now()}`
    }
  );
  return [gh, project];
}
