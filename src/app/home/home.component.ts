import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'home.component.html',
    standalone: true
})
export class HomeComponent implements OnInit {
    user: User | null;

    constructor(private accountService: AccountService) {
        this.user = null; // or initialize with a default value
    }
    

    ngOnInit() {
        this.accountService.user.pipe(take(1)).subscribe(user => {
            this.user = user;
            console.log(this.user);
            console.log(this.user?.Token);
            console.log(this.user?.Nazwa);
            console.log(this.user?.Haslo);
        });
    }
}
