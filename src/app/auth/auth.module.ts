import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

@NgModule({
    imports: [
    RouterModule.forChild([
        { path: "auth", component: AuthComponent, },
    ]),
    AuthComponent,
]
})
export class AuthModule { }