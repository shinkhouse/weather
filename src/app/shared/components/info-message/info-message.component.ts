import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-info-message',
    templateUrl: './info-message.component.html',
    styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {

    constructor() { }

    @Input() message: string;
    @Input() icon: string;
    @Input() isSvg: boolean;

    ngOnInit() {
    }

}
