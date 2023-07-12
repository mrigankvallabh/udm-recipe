import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: "auth", component: AuthComponent, },
        ]),
        AuthComponent,
    ]
})
export class AuthModule { }