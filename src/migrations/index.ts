import * as migration_20261026_151210_auth_foundation from './20261026_151210_auth_foundation';

export const migrations = [
  {
    up: migration_20261026_151210_auth_foundation.up,
    down: migration_20261026_151210_auth_foundation.down,
    name: '20261026_151210_auth_foundation'
  },
];
