import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('0.5s ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({ opacity: 0 }))
  ])
]);

export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'rotate(-180deg)' }), // Definimos la transformación inicial
    animate('.3s ease-out', style({ opacity: 1, transform: 'rotate(0deg)' })) // Definimos la transformación final
  ])
]);
