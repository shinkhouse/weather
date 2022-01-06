import { Component, OnInit, Input } from '@angular/core';
import { IconService } from 'src/app/core/services/icon.service';

@Component({
    selector: 'app-info-message',
    templateUrl: './info-message.component.html',
    styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {

    constructor(public icons: IconService) { }

    @Input() message: string;
    @Input() icon: string;
    @Input() isSvg: boolean;
    @Input() rotate: boolean;

    ngOnInit() {
    }

}
