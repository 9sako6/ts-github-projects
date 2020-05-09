import TsGitHubProjects from '../src/TsGitHubProjects';

describe('List API', () => {
  test("list user's projects", async () => {
    const gh = new TsGitHubProjects();
    const data = await gh.listUserProjects('9sako6');
    expect(data!.length).toBe(1);
  })
})
