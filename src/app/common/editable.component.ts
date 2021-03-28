/* This is a common component for in place edit mode */
/* This component is used to switch between edit and view mode in double click operation */

/* Import statements */
import { Component, ContentChild,  ElementRef, EventEmitter, Output } from '@angular/core';
import { ViewModeDirective } from '../directive/view-mode.directive';
import { EditModeDirective } from '../directive/edit.mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, switchMapTo } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

/* Selector, view and style configuration for this component */
@Component({
  selector: 'editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styleUrls: ['./editable.component.css']
})

/*Export Component class */
export class EditableComponent {
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';


  constructor(private host: ElementRef) {
  }

  ngOnInit() {
    // on intialiazing this component calling view and edit mode handlers
    this.viewModeHandler();
    this.editModeHandler();
  }

  // Switching to view mode
  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  //handle element in view mode
  private viewModeHandler() {
    fromEvent(this.element, 'dblclick').pipe(
      untilDestroyed(this)
    ).subscribe(() => { 
      this.mode = 'edit';
      this.editMode.next(true);
    });
  }

  // handle element in edit mode
  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    )

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      untilDestroyed(this)
    ).subscribe(event => this.toViewMode());
  }

  // getting current view of element
  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnDestroy() {
  }

}