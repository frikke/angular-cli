import { getGlobalVariable } from '../../../utils/env';
import { expectFileToExist, writeMultipleFiles } from '../../../utils/fs';
import { ng } from '../../../utils/process';
import { expectToFail } from '../../../utils/utils';

export default async function () {
  const testRegistry = getGlobalVariable('package-registry');

  // Setup an invalid registry
  await writeMultipleFiles({
    '.npmrc': 'registry=http://127.0.0.1:9999',
  });

  // The environment variable has priority over the .npmrc
  delete process.env['NPM_CONFIG_REGISTRY'];

  await expectToFail(() => ng('add', '@angular/pwa', '--skip-confirmation'));

  await ng('add', `--registry=${testRegistry}`, '@angular/pwa', '--skip-confirmation');
  await expectFileToExist('src/manifest.webmanifest');
}
