import { Pipe, PipeTransform } from '@angular/core';
import { ICar } from 'src/app/car.entity';
type X = keyof ICar

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // TODO BEFORE PR: change filters arg type
  transform(cars: ICar[], filters: { [key: string]: string}): ICar[] {
    return cars.filter(car => {
      for (const key in filters) {
        if (car[key as keyof ICar] !== filters[key]) { return false }
      }
      return true
    })
  }

}
