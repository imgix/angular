/** Coerces a data-bound value (typically a string) to a boolean. */
export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export function coerceNumericProperty(value: any): number | undefined {
  if (typeof value === 'string') {
    const valueParsed = Number.parseFloat(value);
    if (!Number.isNaN(valueParsed)) {
      return valueParsed;
    }
  } else if (typeof value === 'number' && !Number.isNaN(value)) {
    return value;
  }

  return undefined;
}
