import { TsGitHubProjects } from '../../dist/src';

it('run test', async () => {
  const gh = new TsGitHubProjects();
  expect(gh).toBeDefined();
})
