import * as migration_20261026_151210_auth_foundation from './20261026_151210_auth_foundation';
import * as migration_20261026_155135_departments from './20261026_155135_departments';
import * as migration_20261026_181357_faculty from './20261026_181357_faculty';

export const migrations = [
  {
    up: migration_20261026_151210_auth_foundation.up,
    down: migration_20261026_151210_auth_foundation.down,
    name: '20261026_151210_auth_foundation',
  },
  {
    up: migration_20261026_155135_departments.up,
    down: migration_20261026_155135_departments.down,
    name: '20261026_155135_departments',
  },
  {
    up: migration_20261026_181357_faculty.up,
    down: migration_20261026_181357_faculty.down,
    name: '20261026_181357_faculty'
  },
];
