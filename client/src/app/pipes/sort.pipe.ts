import { Pipe, PipeTransform } from '@angular/core';
import { ICar } from '../car.entity';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(cars: ICar[], sortBy: 'price' | 'year'): ICar[] {
    return cars.sort((a, b) => (
      a[sortBy] === b[sortBy] ?
        0 :
        a[sortBy] > b[sortBy] ?
          1 :
          -1
    ))
  }

}
