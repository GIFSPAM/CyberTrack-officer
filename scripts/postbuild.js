import fs from 'fs';
import path from 'path';

const dirs = [
  path.join('.output', 'public'),
  path.join('.vercel', 'output', 'static')
];

let targetDir = null;

for (const dir of dirs) {
  if (fs.existsSync(dir) && fs.existsSync(path.join(dir, '_shell.html'))) {
    targetDir = dir;
    break;
  }
}

if (!targetDir) {
  console.warn('[Postbuild] No build output directory containing _shell.html was found.');
  process.exit(0);
}

const shellPath = path.join(targetDir, '_shell.html');
const indexPath = path.join(targetDir, 'index.html');
const errorPath = path.join(targetDir, '404.html');

try {
  fs.copyFileSync(shellPath, indexPath);
  console.log(`[Postbuild] Successfully copied _shell.html to index.html in ${targetDir}`);
  fs.copyFileSync(shellPath, errorPath);
  console.log(`[Postbuild] Successfully copied _shell.html to 404.html in ${targetDir}`);
} catch (err) {
  console.error('[Postbuild] Failed to copy shell files:', err);
  process.exit(1);
}
