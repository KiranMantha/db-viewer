declare module globalThis {
  const vscodeApi: {
    postMessage: (data: { command: string } & Record<string, any>) => void;
  };
}
