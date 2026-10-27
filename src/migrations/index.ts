import * as migration_20261026_151210_auth_foundation from './20261026_151210_auth_foundation';
import * as migration_20261026_155135_departments from './20261026_155135_departments';
import * as migration_20261026_181357_faculty from './20261026_181357_faculty';
import * as migration_20261026_183724_committees from './20261026_183724_committees';
import * as migration_20261026_191949_facilities from './20261026_191949_facilities';
import * as migration_20261027_180742_updates_documents from './20261027_180742_updates_documents';
import * as migration_20261027_195931_homepage_site_settings from './20261027_195931_homepage_site_settings';

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
    name: '20261026_181357_faculty',
  },
  {
    up: migration_20261026_183724_committees.up,
    down: migration_20261026_183724_committees.down,
    name: '20261026_183724_committees',
  },
  {
    up: migration_20261026_191949_facilities.up,
    down: migration_20261026_191949_facilities.down,
    name: '20261026_191949_facilities',
  },
  {
    up: migration_20261027_180742_updates_documents.up,
    down: migration_20261027_180742_updates_documents.down,
    name: '20261027_180742_updates_documents',
  },
  {
    up: migration_20261027_195931_homepage_site_settings.up,
    down: migration_20261027_195931_homepage_site_settings.down,
    name: '20261027_195931_homepage_site_settings'
  },
];
