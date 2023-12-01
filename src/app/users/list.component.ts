
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({
    templateUrl: 'list.component.html',
    standalone: true,
    imports: [RouterLink, NgFor, NgIf]
})
export class ListComponent implements OnInit {
    user: any;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.user = this.accountService.userValue;
    }

    deleteUser(id: string) {
        const user = this.user;
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.user);
    }
}