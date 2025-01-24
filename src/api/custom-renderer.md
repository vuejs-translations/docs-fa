# API رندر کننده سفارشی {#custom-renderer-api}

## createRenderer() {#createrenderer}

یک رندرکننده سفارشی ایجاد می‌کند. با ارائه APIهای مختص پلتفرم برای ایجاد و دستکاری node، می‌توانید از هسته ران‌تایم Vue برای هدف قرار دادن محیط‌های غیر DOM استفاده کنید.

- **تایپ (Type)**

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      namespace?: ElementNamespace,
      parentComponent?: ComponentInternalInstance | null,
    ): void
    insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
    remove(el: HostNode): void
    createElement(
      type: string,
      namespace?: ElementNamespace,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null,
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      namespace: ElementNamespace,
      start?: HostNode | null,
      end?: HostNode | null,
    ): [HostNode, HostNode]
  }
  ```

- **مثال**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` is the low-level API
  // `createApp` returns an app instance
  export { render, createApp }

  // re-export Vue core APIs
  export * from '@vue/runtime-core'
  ```

`‎@vue/runtime-dom` خود Vue با استفاده از [همان API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts) پیاده‌سازی می‌شود. برای پیاده‌سازی ساده‌تر، [`‎@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts)  را بررسی کنید که یک پکیج خصوصی برای تست واحد (unit testing) خود Vue است.
