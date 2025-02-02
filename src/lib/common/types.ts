/**
 * Infer the type predicate of any guard function.
 */
export type Predicate<T> = T extends (x: unknown) => x is infer U ? U : never;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MergeTypes<TypesArray extends unknown[], Result = {}> = TypesArray extends [
  infer Current,
  ...infer Rest,
]
  ? MergeTypes<Rest, Result & Current>
  : Result;

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

/**
 * Create an exclusive union where only one of passed types is allowed.
 *
 * Credit: https://github.com/typed-rocks/typescript/blob/main/one_of.ts.
 */
export type OneOf<
  TypesArray extends unknown[],
  Result = never,
  All = MergeTypes<TypesArray>,
> = TypesArray extends [infer Current, ...infer Rest]
  ? OneOf<Rest, Result | OnlyFirst<Current, All>, All>
  : Result;

export type AllOrNone<T extends Record<string | number | symbol, unknown>> =
  | { [K in keyof T]: T[K] }
  | { [K in keyof T]?: never };
