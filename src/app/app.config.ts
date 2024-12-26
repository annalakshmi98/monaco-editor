import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxMonacoEditorConfig, provideMonacoEditor } from 'ngx-monaco-editor-v2';

import { routes } from './app.routes';
import { customTheme } from '../theme';

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => {
      // @ts-ignore
      window.monaco.editor.defineTheme('customTheme', customTheme);
  }
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideMonacoEditor()
  ]
};

