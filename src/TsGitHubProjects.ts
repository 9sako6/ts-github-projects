import { Auth } from './types';
import GitHubProjects from './GitHubProjects';

export default class TsGitHubProjects extends GitHubProjects {
  constructor(auth?: Auth) {
    super(auth);
  }
}
