import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoStore } from '../store/todo.state';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'full-stack-dev-todo',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
    TodoListComponent
  ],
  providers: [
    TodoStore
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  orgId = "b64d3148-b2b2-4d7d-8c3e-cde4673f9665"
  ownerId = "7c672043-24e4-45a9-909c-693ba5044785"

    readonly todoStore = inject(TodoStore);
    readonly router = inject(Router)


}
