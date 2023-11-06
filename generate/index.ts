import { generateSettingsPage } from './generateSettingsPage';
import { generateCdnPage } from './generateCdnPage';

export function generatePages() {
  console.log('[generate] generatePages called');
  generateSettingsPage();
  generateCdnPage();
}
