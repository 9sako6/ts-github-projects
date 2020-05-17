import TsGitHubProjects from '../src/index';
require('dotenv').config();
const gh = new TsGitHubProjects({ token: process.env.PERSONAL_ACCESS_TOKEN! });

async function demo() {
  // rate limit
  const info = await gh.rateLimit();
  console.log(info);
}

demo();
