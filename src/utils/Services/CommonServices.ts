// import type { _T_validate } from '@/utils/types/FormType';

export const ErrorMsg = (validations: any) => {
  let PATTERN;
  let ERMSG;
  for (let i = 0; i < validations.length; i += 1) {
    const validation: any = validations[i];

    // Check if the validation object has a regexp property
    if (Object.prototype.hasOwnProperty.call(validation, 'regexp')) {
      const regexpObj = validation.regexp;

      // Check if the regexp object has a pattern property
      if (Object.prototype.hasOwnProperty.call(regexpObj, 'pattern')) {
        const { pattern } = regexpObj;
        const { erMsg } = regexpObj;
        PATTERN = pattern;
        ERMSG = erMsg;

        // Using RegExp.test() to check if the pattern matches
        // if (pattern.test(main)) {
        //   console.log('Pattern matched!');
        // } else {
        //   console.log(erMsg);
        // }
      }
    }
  }
  return { PATTERN, ERMSG };
};
