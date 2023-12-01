import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapComponent } from '@app/map/map.component';

@Component({
    templateUrl: 'home.component.html',
    standalone: true,
    imports:[MapComponent]
})
export class HomeComponent {
    user: any;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        console.log(this.user)
        console.log(this.user?.username)
    }
}
