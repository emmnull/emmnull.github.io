# Animating icons with pure svg

## SVG animation timing

Imagine we have an icon component, say `<UploadIcon />`, where all the inner animations are coordinated using synchbase values, then the definitive control to trigger everything can be exposed via a [`begin` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/begin). With this simple API, consumers can then customize when the animation should run, including but not limited to event based timing.

```svelte
<button id="submit-button">
  Submit
  <UploadIcon begin="submit-button.mouseenter" />
</button>
```
