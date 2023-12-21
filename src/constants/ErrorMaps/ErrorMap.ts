export const ErrorMap: IErrorMap = {
  email: () => "Email is not valid",
  required: (name: string) => `The ${name} Field is required`,
  minlength: (name: string, error: { requiredLength: number }) =>
    `The ${name} must be at least ${error?.requiredLength} characters`,
  pattern: (name: string, error: unknown, rules?: string[]) => {
    return [`The ${name} is not valid`].concat(rules || []);
  },
};

interface IErrorMap {
  [key: string]: (
    name: string,
    error?: any,
    rules?: string[]
  ) => string | string[];
}
