import TsGitHubProjects from '../src/TsGitHubProjects';

describe('testing', () => {
  describe('list', () => {
    it("list valid repository's projects", async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listRepositoryProjects('9sako6', 'ts-github-projects');
      expect(data).toBeDefined();
    })

    it("list valid organization's projects", async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listOrganizationProjects('9sako6-playground');
      expect(data).toBeDefined();
    })

    it("list valid user's projects", async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listUserProjects('9sako6');
      expect(data).toBeDefined();
    })
  })
})
