import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(enumerator: object, justValues = false, ): string[] {
    const keys = Object.keys(enumerator);

    if (justValues) {
      return keys.slice(keys.length / 2);
    }

    return keys.slice(0, keys.length / 2);
  }

}
