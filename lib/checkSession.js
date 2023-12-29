// Is Logged-is or not
import fs from 'fs';
import path from 'path';

const credsFilePath = path.join('../session/creds.json');

export default function checkSession() {
  return fs.existsSync(credsFilePath);
}
