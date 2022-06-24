import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

export const listStagger = trigger('listStagger', [
    transition('* <=> *', [
        query(
            ':enter',
            [
                style({ opacity: 0, transform: 'translateY(-15px)' }),
                stagger('100ms', animate('550ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))),
            ],
            { optional: true }
        ),
        query(':leave', animate('20ms', style({ opacity: 0 })), {
            optional: true,
        }),
    ]),
]);

export const list = trigger('list', [transition(':enter', [query('@items', stagger(1000, animateChild()))])]);
export const items = trigger('items', [
    transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 })), // final
    ]),
]);
