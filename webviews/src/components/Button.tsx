import { h, JSX } from 'preact';

export default function Button(props: JSX.ButtonHTMLAttributes) {
  return <button {...props} />;
}
