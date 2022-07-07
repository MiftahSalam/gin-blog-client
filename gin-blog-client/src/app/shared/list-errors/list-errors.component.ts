import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Errors } from '../../core/models/errors';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit {
  formattedErrors: Array<string> = [];

  constructor() {}

  ngOnInit() {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(
      (key) => `${key} ${errorList.errors[key]}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get errorList() {
    return this.formattedErrors;
  }

  trackByFn(index, item) {
    console.log('tes');

    return index;
  }
}
