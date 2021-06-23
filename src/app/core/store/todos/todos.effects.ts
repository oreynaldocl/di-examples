import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import {
  switchMap,
  tap,
  catchError,
  map,
} from 'rxjs/operators';

import { I18nFacadeService } from 'my-lib';

import {
  deleteItem,
  displaySuccess,
  loadItems,
  loadItemsFailed,
  loadItemsSuccess,
} from './todos.actions';
import { TodosService } from '../../services';

@Injectable()
export class TodosEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadItems),
    switchMap(() => this.todoService.getTodos().pipe(
      switchMap(todos => [
        loadItemsSuccess({ todos }),
        displaySuccess({ message: 'Todos loaded successfully' })
      ]),
      catchError((error: Error) =>
        of(loadItemsFailed({ error })),
      ),
    )),
  ));

  edit$ = createEffect(() => this.actions$.pipe(
    ofType(deleteItem),
    map(() => displaySuccess({ message : 'Item deleted successfully' })),
  ));

  loadItemsFailed$ = createEffect(() => this.actions$.pipe(
    ofType(loadItemsFailed),
    tap(({ error }) => {
      this.toastr.error(this.i18n.instant('Error getting test connection result.'), error.message);
    }),
  ), { dispatch: false });

  displaySuccess$ = createEffect(() => this.actions$.pipe(
    ofType(displaySuccess),
    tap(({ message }) => {
      this.toastr.success(this.i18n.instant(message));
    }),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private toastr: ToastrService,
    private i18n: I18nFacadeService,
    private todoService: TodosService,
  ) { }
}
