import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'',redirectTo:'books',pathMatch:'full'},
    {path:'books',component:BookListComponent},
    {path:'add-book',component:BookFormComponent},
    {path:'edit-book/:id',component:BookFormComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}