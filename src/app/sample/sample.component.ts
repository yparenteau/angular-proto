import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromCountry from '../reducers/country';
import { RootState } from '../reducers/index';
import { Country } from '../models/country';

@Component({
  selector: 'rsm-sample',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sample.html',
  styleUrls: ['./sample.scss']
})
export class SampleComponent {
  public title = 'Angular rs';
  public countries$: Observable<Country[]>;

  constructor(private store: Store<RootState>) {
    this.countries$ = store.select(fromCountry.list);
  }
}
