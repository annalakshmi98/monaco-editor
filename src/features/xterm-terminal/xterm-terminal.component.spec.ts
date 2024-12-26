import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XtermTerminalComponent } from './xterm-terminal.component';

describe('XtermTerminalComponent', () => {
  let component: XtermTerminalComponent;
  let fixture: ComponentFixture<XtermTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XtermTerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XtermTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
