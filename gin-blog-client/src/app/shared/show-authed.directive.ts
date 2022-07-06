import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '../core/services/users/user.service';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticed) => {
      if (
        (isAuthenticed && this.condition) ||
        (!isAuthenticed && !this.condition)
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input()
  set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
