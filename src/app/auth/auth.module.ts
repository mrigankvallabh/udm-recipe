import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "auth", component: AuthComponent, },
    ]),
  ]
})
export class AuthModule { }