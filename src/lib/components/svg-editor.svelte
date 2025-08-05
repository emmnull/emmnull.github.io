<script lang="ts" module>
  function isSvg<E extends keyof SVGElementTagNameMap>(
    node: Node,
    ...element: E[]
  ): node is Element & {
    tagName: E;
    properties: SVGAttributes<SVGElementTagNameMap[E]> &
      HTMLAttributes<SVGElementTagNameMap[E]>;
  } {
    return (
      node.type === 'element' &&
      'tagName' in node &&
      (!element.length || element.includes(node.tagName as E))
    );
  }

  function randomId(
    length = 6,
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
  ) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (x) => alphabet[x % alphabet.length]).join('');
  }

  declare module 'svg-parser' {
    export function parse(source: string): Root & {
      children: [
        Element & {
          tagName: 'svg';
          properties: HTMLAttributes<SVGSVGElement> &
            SVGAttributes<SVGSVGElement>;
        },
      ];
    };
  }
</script>

<script lang="ts">
  import type { Element, Node, Root } from 'hast';
  import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
  import { parse } from 'svg-parser';
  import { find } from 'unist-util-find';
  import { visit } from 'unist-util-visit';

  let {
    src = $bindable('<svg></svg>'),
    ...attributes
  }: {
    src: string;
  } & SVGAttributes<SVGSVGElement> = $props();

  let ast = $derived.by(() => {
    const tree = parse(src);
    visit(tree, function (node, _index, _parent) {
      if (isSvg(node)) {
        node.properties.id ??= `x${randomId()}`;
      }
    });
    return tree;
  });

  const selection = $state(new Set<Node>());
</script>

{#snippet shape(node: Node)}
  {#if isSvg(node)}
    <svelte:element this={node.tagName} {...node.properties}>
      {#if node.children.length}
        {#each node.children as child (child)}
          {@render shape(child)}
        {/each}
      {/if}
    </svelte:element>
  {/if}
{/snippet}

{#snippet controls(node: Node)}
  {#if isSvg(node, 'path', 'rect', 'circle')}
    <svelte:element
      this={node.tagName}
      data-control-stroke
      {...node.properties}
      fill="none"
      stroke="currentcolor"
      stroke-width="1px"
    />
    {#if node.children.length}
      {#each node.children as child (child)}
        {@render controls(child)}
      {/each}
    {/if}
  {/if}
{/snippet}

<svg
  {...ast.children[0].properties}
  {...attributes}
  onclick={(e) => {
    const target = e.target;
    if (target === e.currentTarget) {
      selection.clear();
    }
    if (!(target instanceof SVGElement) || !target.id) {
      return;
    }
    const found = find(ast, function (node) {
      return isSvg(node) && node.properties.id === target.id;
    });
    if (!found) {
      return;
    }
    selection.add(found);
  }}
>
  {#each ast.children[0].children as node (node)}
    {@render shape(node)}
  {/each}
  <g data-controls>
    {#each ast.children[0].children as node (node)}
      {@render controls(node)}
    {/each}
  </g>
</svg>
