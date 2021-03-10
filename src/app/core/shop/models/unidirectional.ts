export abstract class UnidirectionalTransform<Source, Target> {
  constructor(public source: Source) {}

  abstract transform(...args: any): Target;
}
