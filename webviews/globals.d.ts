declare module globalThis {
  const vscodeApi: {
    postMessage: (data: { command: string } & Record<string, any>) => void;
  };
}

declare module '*.scss' {
  const content: any;
  export default content;
}
