import TsGitHubProjects from 'src/TsGitHubProjects';
import { UpdateProjectRequest } from 'src/types';

describe('testing a organization project', () => {
  it('create and get and delete a project', async () => {
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
    // create a column
    const createColumnData = { name: `new_column_for_test_at_${Date.now()}` };
    let column = await gh.createColumn(projectId, createColumnData);
    expect(column).toBeDefined();
    expect(column?.name).toEqual(createColumnData.name);
    // get a column
    const columnId = column!.id!;
    column = await gh.getColumn(columnId);
    expect(column).toBeDefined();
    // list columns
    const columnsList = await gh.listColumns(projectId);
    expect(columnsList).toBeDefined();
    expect(columnsList![0]).toEqual(column);
    // update a column
    const updateColumnData = { name: `new_column_for_test_at_${Date.now()}` };
    column = await gh.updateColumn(column!.id, updateColumnData);
    expect(column).toBeDefined();
    expect(column!.name).toEqual(updateColumnData.name);
    // delete a project
    const res = await gh.deleteProject(projectId);
    expect(res.status).toEqual(204);
  });
});
