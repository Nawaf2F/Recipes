import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
collapsed = true;
isAuthenticated = false;
private userSub: Subscription;

constructor(private dataStorage: DataStorageService, 
    private authServ: AuthService,
    private router: Router){}

ngOnInit(){
this.userSub = this.authServ.user.subscribe(user => {
this.isAuthenticated = !!user
})
}

onSave(){
this.dataStorage.storingRecipe();
}

onFetch(){
    this.dataStorage.fetchRecipe().subscribe(response => console.log(response));
}

onLogout(){
this.authServ.logout();

}

ngOnDestroy(){
this.userSub.unsubscribe();
}

}