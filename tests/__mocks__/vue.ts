export const defineComponent = (options: Record<string, unknown>) => options;
export const ref = (value: unknown) => ({ value });
export const watchEffect = (fn: () => void) => fn();
export const h = () => null;
export default {};
