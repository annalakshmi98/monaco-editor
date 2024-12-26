import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Terminal } from '@xterm/xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

@Component({
  selector: 'app-xterm-terminal',
  imports: [

  ],
  templateUrl: './xterm-terminal.component.html',
  styleUrl: './xterm-terminal.component.scss'
})
export class XtermTerminalComponent implements OnInit {
  @ViewChild('myTerminal') terminalDiv!: ElementRef;

  terminal!: Terminal;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initializeTerminal('');
  }

  initializeTerminal(result: any) {
    if (this.terminal) {
      try {
        this.terminal.dispose();
      } catch (error) {
        console.log(error);
      }
    }
    this.terminal = new Terminal();
    let encode = new TextEncoder();

    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);
    const socket = new WebSocket(`ws://localhost:3001/websocket/6fe3c11589b5`);
    socket.onopen = () => {
      socket.send("trap 'echo got SIGINT' SIGINT\n");
      socket.send('set +m\n');
      socket.send("trap 'echo got SIGQUIT' SIGQUIT\n");
      socket.send(`python; exit > /dev/null 2>&1`);
      setTimeout(() => {
        const attachAddon = new AttachAddon(socket, { bidirectional: true });
        this.terminal.loadAddon(attachAddon);
        socket.send('\n');
        fitAddon.fit();
      }, 1000);
    }
    this.terminal.open(this.terminalDiv.nativeElement);
    // Attach the socket to term
    this.terminal.loadAddon(new WebLinksAddon());
    fitAddon.fit();

    // // Create a new terminal instance
    // this.terminal = new Terminal({
    //   cursorBlink: true, // Enable blinking cursor
    //   cols: 80,          // Number of columns in the terminal
    //   rows: 24,          // Number of rows in the terminal
    //   theme: {
    //     background: '#1e1e1e', // Dark background theme
    //     foreground: '#ffffff'  // White foreground text
    //   }
    // });

    // const fitAddon = new FitAddon();
    // this.terminal.loadAddon(fitAddon);

    // // Attach the terminal to the DOM (div element)
    // this.terminal.open(document.getElementById('terminal-container')!);

    // // Fit terminal to the container size
    // fitAddon.fit();

    // // Example: writing to the terminal
    // this.terminal.writeln('Welcome to xterm.js in Angular!');
    // this.terminal.writeln('Type something below:');

    // // Handle user input (example)
    // this.terminal.onData((data) => {
    //   console.log('Input: ', data);  // Log the input to the console
    // });
  }
}


