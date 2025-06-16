import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    // Регистрируем команду для отправки запроса
    const disposable = vscode.commands.registerCommand('test99.sendGitPostRequest', async (fileUri?: vscode.Uri) => {
        try {
            // 1. Получаем данные из Git
            const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
            if (!gitExtension) {
                vscode.window.showErrorMessage('Git extension not found!');
                return;
            }

            const git = gitExtension.getAPI(1);
            if (git.repositories.length === 0) {
                vscode.window.showInformationMessage('No Git repositories found.');
                return;
            }

            const repo = git.repositories[0];
            const remoteUrl = repo.state.remotes.find((r: any) => r.name === 'origin')?.fetchUrl || 'undefined';
            const currentBranch = repo.state.HEAD?.name || 'undefined';

            vscode.window.showInformationMessage(`remoteUrl: ${remoteUrl}`);
            vscode.window.showInformationMessage(`currentBranch: ${currentBranch}`);
            vscode.window.showInformationMessage(`fileUri: ${JSON.stringify(fileUri)}`);
            // 2. Отправляем POST-запрос
            // const response = await axios.post(
            //     'https://your-api-endpoint.com', // Замени на свой URL
            //     {
            //         remoteRepositoryUrl: remoteUrl,
            //         currentBranch: currentBranch
            //     },
            //     {
            //         headers: {
            //             'Authorization': 'Bearer YOUR_BEARER_TOKEN' // Замени на свой токен
            //         }
            //     }
            // );

            // vscode.window.showInformationMessage(`Request sent! Response: ${JSON.stringify(response.data)}`);
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}