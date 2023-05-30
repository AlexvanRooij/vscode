const vscode = require('vscode');




function activate(context) {
    let soortDecoratie;
    let disposable = vscode.commands.registerCommand('highlight', () => {
        const vseditor = vscode.window.activeTextEditor;
        if (vseditor) {
            const doc = vseditor.document;
            if (soortDecoratie) {
                vseditor.setDecorations(soortDecoratie, []);
            }
			// lege array
            const decoraties = [];
			// de regex voor  whitespaces en white tabs
            const extraSpacesTabsRegex = /[ \t]+$/gm;
			// haal alle text op
            const text = doc.getText();

			// selecteer alle regex die hij uit de text gehaalt heeft
            let match;
            while ((match = extraSpacesTabsRegex.exec(text))) {
                const startPos = doc.positionAt(match.index);
                const endPos = doc.positionAt(match.index + match[0].length);
                const range = new vscode.Range(startPos, endPos);
                decoraties.push({ range });
            }
			// Hier kies ik de kleur van de highlight uit en zet ik een variable naar die kleur
            soortDecoratie = vscode.window.createTextEditorDecorationType({
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
            });

			// hier pak ik alle geselecteerde text en zorg ik dat ze de juiste decoratie krijgen
            vseditor.setDecorations(soortDecoratie, decoraties);
        }
    });
	// command word gedefinieerd in de extensie en correct afgehandeld en ook nog geactiveerd
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
