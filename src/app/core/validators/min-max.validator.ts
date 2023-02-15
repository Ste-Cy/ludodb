import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minMaxValidator(
  min: string,
  max: string
): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(min) || !ctrl.get(max)) {
      return {
        minMax: 'Invalid control names',
      };
    }
    const minValue = ctrl.get(min)!.value;
    const maxValue = ctrl.get(max)!.value;
    return minValue <= maxValue
      ? null
      : {
        minMax: {
          min: minValue,
          max: maxValue,
        },
      };
  };
}