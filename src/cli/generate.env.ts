import fileSystem from 'node-fs-extra';

const envFilePath = '.env';
const envFileTemplatePath = '.env.template';

if (!fileSystem.existsSync(envFilePath)) {
  fileSystem.createReadStream(envFileTemplatePath).pipe(fileSystem.createWriteStream(envFilePath));
}
