import TsGitHubProjects from 'src/TsGitHubProjects';

describe('testing column', () => {
  it('create project, operate column', async () => {
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
    const projectId = createdProject!.id!;
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
    // move a column
    const newColumn = await gh.createColumn(projectId, { name: 'column2' });
    let res = await gh.moveColumn(columnId, { position: `after:${newColumn?.id}` });
    expect(res.status).toEqual(201);
    // delete a column
    const resDeleteColumn = await gh.deleteColumn(columnId);
    expect(resDeleteColumn.status).toEqual(204);
    // delete a project
    res = await gh.deleteProject(projectId);
    expect(res.status).toEqual(204);
  });
});
