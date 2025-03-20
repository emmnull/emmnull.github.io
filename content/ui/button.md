---
name: Button
description: Basic buton
properties:
  button-face:
    description: The background color of the button, applied either to a pseudo-element
      or the button element itselft depending on the variant.
    syntax:
      - color
  button-border:
    description: Border color
    syntax:
      - color
variants:
  button:
    name: Default
  button-ghost:
    name: Ghost
    description: A more subtle skeleton button.
  button-bordered:
    name: Bordered
  button-dashed:
    name: Dash-bordered
    description: Similar to the bordered variant, but dashed.
  button-cta:
    name: Call-to-action
    description: Bolder button for cases where you need to grab the user's attention.
  button-link:
    name: Link
    description: Typically used for anchor tags pointing to outside the app or integrated
      within prose.
  button-nav:
    name: Navigation
    description: Typically used for core navigation links pointing within the app.
---

# Button

## Example usage

```html
<button class="button">Button</button>
```
