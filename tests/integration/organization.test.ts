import TsGitHubProjects from '../../src/TsGitHubProjects';
import { UpdateProjectRequest } from '../../src/types';

describe('testing a organization project', () => {
  it('create and get and update and delete a project', async () => {
    // authorization
    expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
    const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
    // create a project
    const createdProject = await gh.createOrganizationProject(
      '9sako6-playground',
      {
        name: `create_organization_project_integration_test_at_${Date.now()}`,
        body: `test projcet ${Date.now()}`
      }
    );
    expect(createdProject).toBeDefined();
    // get a project
    const projectId = createdProject!.id!;
    let project = await gh.getProject(projectId);
    expect(project).toBeDefined();
    // update a project
    const updateProjectData: UpdateProjectRequest = {
      name: `updated_organization_project_integration_test_at_${Date.now()}`,
      body: `test updated project ${Date.now()}`,
      organization_permission: 'admin',
      state: 'open',
      private: false,
    };
    project = await gh.updateProject(projectId, updateProjectData);
    expect(project).toBeDefined();
    expect(project?.name).toEqual(updateProjectData.name);
    expect(project?.body).toEqual(updateProjectData.body);
    expect(project?.state).toEqual(updateProjectData.state);
    // delete a project
    const res = await gh.deleteProject(projectId);
    expect(res.status).toEqual(204);
  });

  it('closed project', async () => {
    // authorization
    expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
    const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
    // create a project
    const project = await gh.createOrganizationProject(
      '9sako6-playground',
      {
        name: `create_organization_project_integration_test_at_${Date.now()}`,
        body: `test projcet ${Date.now()}`
      }
    );
    expect(project).toBeDefined();
    const beforeNum = (await gh.listOrganizationProjects('9sako6-playground', 'closed')).length;
    // update to close
    await gh.updateProject(project.id, { state: 'closed' });
    const afterNum = (await gh.listOrganizationProjects('9sako6-playground', 'closed')).length;
    expect(afterNum - beforeNum).toEqual(1);
    // delete the project
    await gh.deleteProject(project.id);
  });
});
