const activityCoefficients = new Map([
  ['min', 1.2],
  ['low', 1.375],
  ['medium', 1.55],
  ['high', 1.725],
  ['max', 1.9]
]);

const genderConstants = new Map([
  ['female', -161],
  ['male', 5]
]);

const percentageConstants = new Map([
  ['gain', 1.15],
  ['loss', 0.85]
]);

export { activityCoefficients, genderConstants, percentageConstants};
