import * as vscode from 'vscode';

// 定义标题装饰器类型
type HeadingDecorator = {
    decorationType: vscode.TextEditorDecorationType;
    regex: RegExp;
    configKey: string;
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Markdown Cool Editor is now active');

    // 创建所有六级标题的装饰器
    const headingDecorators: HeadingDecorator[] = [
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h1Color'), 
            regex: /^#\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h1Color' 
        },
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h2Color'), 
            regex: /^##\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h2Color' 
        },
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h3Color'), 
            regex: /^###\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h3Color' 
        },
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h4Color'), 
            regex: /^####\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h4Color' 
        },
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h5Color'), 
            regex: /^#####\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h5Color' 
        },
        { 
            decorationType: createDecorator('markdownHeadingHighlighter.h6Color'), 
            regex: /^######\s+.*$/gm, 
            configKey: 'markdownHeadingHighlighter.h6Color' 
        }
    ];

    // 当配置改变时，重新创建装饰器
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            // 重新加载配置
            for (const decorator of headingDecorators) {
                if (event.affectsConfiguration(decorator.configKey)) {
                    decorator.decorationType.dispose();
                    decorator.decorationType = createDecorator(decorator.configKey);
                }
            }
            
            // 重新应用高亮
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'markdown') {
                updateDecorations(editor, headingDecorators);
            }
        })
    );

    // 当活动编辑器改变时应用高亮
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor && editor.document.languageId === 'markdown') {
                updateDecorations(editor, headingDecorators);
            }
        })
    );

    // 当文档内容改变时应用高亮
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document && editor.document.languageId === 'markdown') {
                updateDecorations(editor, headingDecorators);
            }
        })
    );

    // 初始化高亮
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === 'markdown') {
        updateDecorations(editor, headingDecorators);
    }
}

// 创建装饰器
function createDecorator(configKey: string): vscode.TextEditorDecorationType {
    const config = vscode.workspace.getConfiguration();
    const color = config.get<string>(configKey);
    
    return vscode.window.createTextEditorDecorationType({
        color: color,
        fontWeight: 'bold',
        backgroundColor: new vscode.ThemeColor('editor.background'),
        borderRadius: '3px',
        overviewRulerColor: color,
        overviewRulerLane: vscode.OverviewRulerLane.Right,
    });
}

// 更新装饰
function updateDecorations(editor: vscode.TextEditor, headingDecorators: HeadingDecorator[]) {
    const text = editor.document.getText();
    
    for (const { decorationType, regex } of headingDecorators) {
        const decorations: vscode.DecorationOptions[] = [];
        let match;
        
        // 重置regex
        regex.lastIndex = 0;
        
        while ((match = regex.exec(text))) {
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            
            const decoration = { 
                range: new vscode.Range(startPos, endPos)
            };
            
            decorations.push(decoration);
        }
        
        editor.setDecorations(decorationType, decorations);
    }
}

export function deactivate() {
    console.log('Markdown Cool Editor is now deactivated');
} 