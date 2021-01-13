#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const inquirer = require('inquirer')
const process = require('process');


const templates = [
    {name: 'WEB开发模板-SPA', value: {url: 'https://github.com/SCV1025/rscv/#web-spa', branch: 'web-spa'}},
    {name: '小程序开发模板-REMAX ONE', value: {url: 'https://github.com/SCV1025/rscv/#remax-one', branch: 'remax-one'}},
    {name: 'WEB服务端界面开发模板-SPA', value: {url: 'https://github.com/SCV1025/rscv/#admin-spa', branch: 'admin-spa'}},
    {name: 'ReactNative的开发模板', value: {url: 'https://github.com/SCV1025/rscv/#react-native', branch: 'react-native'}}
]


program
    .version('0.0.1', '-v, --version')
    .command('new')
    .action(async (dir, cmd) => {
        const res = await inquirer.prompt([{
            type: 'list',
            name: 'template',
            message: '请选择开发模板',
            choices: () => {
                return templates
            },
            default: templates[0],
        }])
        const {url, branch} = res.template;
        //console.log(url);
        const name = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: '请输入初始化项目名',
            default: 'example',
        }]).then( answers =>{
            return answers.name;
        } )
        //console.log(name);
        if (!fs.existsSync(name)) {
            const spinner = ora('正在下载模板...').start();
            download(url, name, {clone: true},
                err => {
                    if (err) {
                        spinner.fail();
                        console.log(symbols.error,chalk.red('错误|',err));
                    } else {
                        spinner.succeed();
                        console.log(symbols.success, chalk.green('开发模板初始化完成😄'));
                    }
                }
            );
        } else {
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('该文件夹名称已经存在'));
        }
    });
program.parse(process.argv);
