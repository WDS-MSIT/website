import * as migration_20261026_151210_auth_foundation from './20261026_151210_auth_foundation';
import * as migration_20261026_155135_departments from './20261026_155135_departments';

export const migrations = [
  {
    up: migration_20261026_151210_auth_foundation.up,
    down: migration_20261026_151210_auth_foundation.down,
    name: '20261026_151210_auth_foundation',
  },
  {
    up: migration_20261026_155135_departments.up,
    down: migration_20261026_155135_departments.down,
    name: '20261026_155135_departments'
  },
];
