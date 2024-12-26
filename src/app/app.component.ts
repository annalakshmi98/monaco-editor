import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { MyEditorComponent } from '../features/my-editor/my-editor.component';
import { XtermTerminalComponent } from '../features/xterm-terminal/xterm-terminal.component';
@Component({
  selector: 'app-root',
  imports: [
    // MyEditorComponent,
    XtermTerminalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'monaco-app';
}
