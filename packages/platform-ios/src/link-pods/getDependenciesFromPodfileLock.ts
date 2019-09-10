import fs from 'fs';
import {logger} from '@react-native-community/cli-tools';
import {safeLoad} from 'js-yaml';

export default function getDependenciesFromPodfileLock(
  podfileLockPath: string,
) {
  logger.debug(`Reading ${podfileLockPath}`);
  let fileContent;
  try {
    fileContent = fs.readFileSync(podfileLockPath, 'utf8');
  } catch (err) {
    logger.error(
      `Could not find ${podfileLockPath}, did you run pod \`install\``,
    );
    return [];
  }
  return Object.keys(safeLoad(fileContent)['SPEC CHECKSUMS'] || {});
}