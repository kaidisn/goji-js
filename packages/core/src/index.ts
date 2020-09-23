import { ReactNode } from 'react';
import './patchGlobalObject';
import { createAdaptor, AdaptorType, ExportComponentMeta } from './adaptor';
import { GOJI_TARGET } from './constants';
import { batchedUpdates } from './reconciler';
import { RootTag, BlockingRoot, ConcurrentRoot } from './render';

interface RenderOptions {
  type: AdaptorType;
  disablePageSharing: boolean;
  exportMeta: ExportComponentMeta;
}

const DEFAULT_RENDER_OPTIONS: RenderOptions = {
  type: 'page',
  disablePageSharing: false,
  exportMeta: {},
};

export const render = (element: ReactNode, options: Partial<RenderOptions> = {}, tag?: RootTag) => {
  const { type, exportMeta, disablePageSharing }: RenderOptions = {
    ...DEFAULT_RENDER_OPTIONS,
    ...options,
  };
  const adaptor = createAdaptor(type, GOJI_TARGET, exportMeta, disablePageSharing);
  return adaptor.run(element, tag);
};

// function naming refer to react
// https://reactjs.org/docs/concurrent-mode-adoption.html#migration-step-blocking-mode
export const createBlockingRoot: typeof render = (element, options = {}) => render(element, options, BlockingRoot)
export const createRoot: typeof render = (element, options = {}) => render(element, options, ConcurrentRoot);

export * from './components/factoryComponents';
export { Subtree } from './components/subtree';
export { createPortal } from './portal';
export * from './lifecycles';
export * from './portal';
export {
  // eslint-disable-next-line camelcase
  SIMPLIFY_COMPONENTS as unstable_SIMPLIFY_COMPONENTS,
  // eslint-disable-next-line camelcase
  SimplifyComponent as unstable_SimplifyComponent,
  GojiTarget,
} from './constants';
export { gojiEvents } from './events';
export { Partial } from './partial';
// eslint-disable-next-line camelcase
export { batchedUpdates as unstable_batchedUpdates };
export { PublicInstance as GojiPublicInstance } from './reconciler/publicInstance';
export { setGojiBlockingMode } from './container';