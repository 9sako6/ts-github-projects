import { TsGitHubProjects } from '../../src/';

describe('testing', () => {
  describe('list', () => {
    it('list valid repository\'s projects', async () => {
      expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
      const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
      const data = await gh.listRepositoryProjects('9sako6', 'ts-github-projects');
      expect(data).toBeDefined();
    });

    it('list open valid repository\'s projects', async () => {
      expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
      const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
      const data = await gh.listRepositoryProjects('9sako6', 'ts-github-projects', 'open');
      expect(data).toBeDefined();
    });

    it('list all valid repository\'s projects', async () => {
      expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
      const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
      const data = await gh.listRepositoryProjects('9sako6', 'ts-github-projects', 'all');
      expect(data).toBeDefined();
    });

    it('list closed valid repository\'s projects', async () => {
      expect(process.env.PERSONAL_ACCESS_TOKEN).toBeTruthy();
      const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });
      const data = await gh.listRepositoryProjects('9sako6', 'ts-github-projects', 'closed');
      expect(data).toBeDefined();
    });

    it('list valid organization\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listOrganizationProjects('9sako6-playground');
      expect(data).toBeDefined();
    });

    it('list all valid organization\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listOrganizationProjects('9sako6-playground', 'all');
      expect(data).toBeDefined();
    });

    it('list open valid organization\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listOrganizationProjects('9sako6-playground', 'open');
      expect(data).toBeDefined();
    });

    it('list closed valid organization\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listOrganizationProjects('9sako6-playground', 'closed');
      expect(data).toBeDefined();
    });

    it('list valid user\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listUserProjects('9sako6');
      expect(data).toBeDefined();
    });

    it('list all valid user\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listUserProjects('9sako6', 'all');
      expect(data).toBeDefined();
    });

    it('list open valid user\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listUserProjects('9sako6', 'open');
      expect(data).toBeDefined();
    });

    it('list closed valid user\'s projects', async () => {
      const gh = new TsGitHubProjects();
      const data = await gh.listUserProjects('9sako6', 'closed');
      expect(data).toBeDefined();
    });
  });

  it('rate limit', async () => {
    const gh = new TsGitHubProjects();
    const data = await gh.rateLimit();
    console.log(data);
    expect(data).toBeDefined();
  });
});
