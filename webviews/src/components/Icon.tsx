import { h } from 'preact';

export const Icon = ({ name, color = '#fff', size = 18 }: { name: string; color?: string; size?: number }) => {
  if (name === 'table') {
    return (
      <svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        width={`${size}px`}
        height={`${size}px`}
        style="enable-background:new 0 0 32 32;"
        xml:space="preserve"
      >
        <path
          stroke={color}
          d="M27,4H5C3.3,4,2,5.3,2,7v18c0,1.7,1.3,3,3,3h22c1.7,0,3-1.3,3-3V7C30,5.3,28.7,4,27,4z M13,20v-4h7v4H13z M20,22v4h-7v-4H20
	z M20,10v4h-7v-4H20z M28,10v4h-6v-4H28z M11,14H4v-4h7V14z M4,16h7v4H4V16z M22,16h6v4h-6V16z M4,25v-3h7v4H5C4.4,26,4,25.6,4,25z
	 M27,26h-5v-4h6v3C28,25.6,27.6,26,27,26z"
        ></path>
      </svg>
    );
  }
  if (name === 'save') {
    return (
      <svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        width={`${size}px`}
        height={`${size}px`}
        style="enable-background:new 0 0 32 32;"
        xml:space="preserve"
      >
        <ellipse class="st0" stroke={color} cx="14" cy="8" rx="10" ry="5"></ellipse>
        <line class="st0" stroke={color} x1="24" y1="16" x2="24" y2="8"></line>
        <path class="st0" stroke={color} d="M4,8v8c0,2.8,4.5,5,10,5c1.2,0,2.3-0.1,3.4-0.3"></path>
        <path class="st0" stroke={color} d="M4,16v8c0,2.8,4.5,5,10,5c2,0,3.8-0.3,5.3-0.8"></path>
        <circle class="st0" stroke={color} cx="24" cy="23" r="7"></circle>
        <line class="st0" stroke={color} x1="24" y1="16" x2="24" y2="26"></line>
        <polyline class="st0" stroke={color} points="21,23 24,26 27,23 "></polyline>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${size}px`}
      height={`${size}px`}
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <use xlink:href={`#${name}`}></use>
    </svg>
  );
};
