export const groupByDate: <T>(
  entries: T[],
  dateGetter: (entry: T) => Date,
  options?: Intl.DateTimeFormatOptions,
) => { [p: string]: T[] } = <T>(entries: T[], dateGetter: (entry: T) => Date, options?: Intl.DateTimeFormatOptions) => {
  entries.sort((c, d) => {
    const next = dateGetter(d).getTime();
    const previous = dateGetter(c).getTime();
    return next - previous;
  });
  const forDate = item => dateGetter(item).toLocaleDateString(undefined, options);
  return groupBy(entries, forDate);
};

const groupBy = <T>(array: T[], keyGetter: (item: T) => string): { [key: string]: T[] } => {
  return array.reduce((store, item) => {
    const key = keyGetter(item);
    const value = store[key] || [];
    store[key] = value.concat([item]);
    return store;
  }, {});
};
