// import TsGitHubProjects from 'ts-github-projects';
import TsGitHubProjects from '../src/TsGitHubProjects';
require('dotenv').config();
const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });

async function demo() {
  // rate limit
  const info = await gh.rateLimit();
  console.log(info);
  console.log(await gh.listRepositoryProjects('9sako6', 'ts-github-projects', 'closed'))
}

demo();
