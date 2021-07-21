/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks'; // eslint-disable-line import/no-extraneous-dependencies
import * as path from 'path';

export default function (options: { shouldPass: boolean }): Rule {
  return (_: Tree, context: SchematicContext) => {
    context.addTask(
      new TslintFixTask(
        {
          rulesDirectory: path.join(__dirname, 'rules'),
          rules: {
            'custom-rule': [true, options.shouldPass],
          },
        },
        {
          includes: '*.ts',
          silent: false,
        },
      ),
    );
  };
}
