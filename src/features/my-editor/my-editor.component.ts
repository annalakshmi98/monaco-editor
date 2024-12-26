import { Component } from '@angular/core';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-editor',
  imports: [EditorComponent, FormsModule ],
  templateUrl: './my-editor.component.html',
  styleUrl: './my-editor.component.scss'
})
export class MyEditorComponent {
  editorOptions = {
    language: 'python',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineHeight: 20,
    fontSize: 14,
    wordWrap: 'on',
    wrappingIndent: 'indent',
};
code = `
import os
`;
}
