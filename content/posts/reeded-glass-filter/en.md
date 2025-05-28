# Making a reeded glass distortion effect

## fe? fe

I often feel like SVG filter effects are unjustly overlooked in web design. Yes, I get it, SVG isn't always optimal in terms of performance or DX, but in some cases I believe it can prove to the core aspect of truly elegant solutions to making things look nice.

## Reeded glass, a trendy look available even at IKEA

## To do

```html
<svg xmlns="http://www.w3.org/2000/svg" class="absolute">
  <defs>
    <linearGradient
      id="gradient"
      spreadMethod="repeat"
      x2="50"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stop-color="black" />
      <stop offset="75%" stop-color="white" />
    </linearGradient>
    <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
      <line stroke="#a6a6a6" stroke-width="7.5px" y1="10" />
    </pattern>
  </defs>
  <rect x="0%" y="50%" width="100%" height="50%" fill="url(#gradient)" />
  <rect x="0%" y="0%" width="100%" height="50%" fill="url(#pattern)" />
  <filter id="reeded" x="-25%" y="-25%" width="150%" height="150%">
    <feDisplacementMap
      in="SourceGraphic"
      in2="url(#gradient)"
      scale="20"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
```
