import { spawn } from 'child_process';

const [, , command, ...args] = process.argv;

// 获取区域和环境参数
const regionArg = args.find((arg) => arg.startsWith('region='));
const envArg = args.find((arg) => arg.startsWith('env='));
// 默认区域为china, 默认环境为dev
const region = regionArg ? regionArg.split('=')[1] : null;
const environment = envArg ? envArg.split('=')[1] : null;

if (!region || !environment) {
  console.error('Invalid command: region and env are required');
  process.exit(1);
}

const mode = `${region}-${environment}`;

// 构建command

let cmd = '';
let cmdArgs = [];

const viteProcess = spawn('vite', [command, '--mode', mode], {
  stdio: 'inherit',
  shell: true,
});

if (command === 'dev') {
  viteProcess.on('exit', (exitCode) => {
    process.exit(exitCode);
  });
} else if (command === 'build') {
  const tscProcess = spawn('tsc', ['-b'], { stdio: 'inherit', shell: true });
  tscProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`TypeScript build failed with code ${code}`);
      process.exit(code);
    }

    viteProcess.on('exit', (exitCode) => {
      process.exit(exitCode);
    });
  });
} else {
  console.error(`Invalid command: ${command}`);
  process.exit(1);
}
