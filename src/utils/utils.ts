export const setJsonItem = (name: string, value: Record<string, any>) => {
  const str = JSON.stringify(value);
  localStorage.setItem(name, str);
};

export const getJsonItem = (name: string) => {
  const str = localStorage.getItem(name);
  if (str) {
    try {
      const value = JSON.parse(str);
      return value;
    } catch (err) {}
  }

  return null;
};
