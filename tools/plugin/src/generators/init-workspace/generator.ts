import { formatFiles, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nx/devkit';
import { applicationGenerator, E2eTestRunner } from '@nx/angular/generators';

export async function initWorkspaceGenerator(tree: Tree) {
  for (let i = 1; i <= 20; i++) {
    const index = i.toString().padStart(2, '0');
    const projectName = `application-${index}`;
    await applicationGenerator(tree, {
      directory: `apps/${projectName}`,
      name: projectName,
      e2eTestRunner: E2eTestRunner.None,
    });
    const projectConfiguration = readProjectConfiguration(tree, projectName);
    projectConfiguration.targets = {
      deploy: {
        executor: '@parallel-tools/plugin:deploy',
      },
      publish: {
        executor: '@parallel-tools/plugin:publish',
      },
      package: {
        executor: '@parallel-tools/plugin:package',
      },
      build: {
        executor: '@parallel-tools/plugin:build',
      },
      lint: projectConfiguration.targets.lint,
      test: projectConfiguration.targets.test,
    };
    updateProjectConfiguration(tree, projectName, projectConfiguration);
  }
  await formatFiles(tree);
}

export default initWorkspaceGenerator;
