import { useContext } from 'react';
import { create, useStore } from 'zustand';
import { MapManager } from '../lib/mapManager';
import { MapStoreContext } from '@components/MapStoreContextProvider';

export const setMapStore = (initConfig = {}) => {
  const theMapStore = (set, get) => ({
    showLayer: true,
    mapManager: null,
    layersLoaded: false,
    coreLayerExtent: null,
    summaryData: null,
    shapeData: null,
    selectedItems: [],
    viewClickHandler: null,
    pointerMoveHandler: null,
    mapConfiguration: initConfig,

    onViewClick: (event) => {
      if (get().viewClickHandler) {
        get().viewClickHandler(event);
      }
    },

    onPointerMove: (event) => {
      if (get().pointerMoveHandler) {
        get().pointerMoveHandler(event);
      }
    },

    setContainer: async (config, container, shouldReset = false) => {
      if (container) {
        // Create map manager if it doesn't exist
        if (!get().mapManager || shouldReset) {
          // Create map manager and initialize
          const manager = new MapManager(config);
          // console.log('Map manager created', manager);
          set({ layersLoaded: false });
          manager.loadWidgets();
          manager.loadLayers(() => {
            set({ layersLoaded: true })
            const { shapeData } = get();
            if (shapeData) {
              manager.loadGraphicsLayer(shapeData);
            }
          }, null);

          // Set callbacks - essentially hooks into map events
          manager.onViewClick(get().onViewClick);
          manager.onViewUpdated(get().onMapViewUpdated);
          manager.onPointerMove(get().onPointerMove);

          // Update state
          set({ mapManager: manager });
          set({ mapConfiguration: config })
        }

        // Initialize map manager - creates the map view and mounts to DOM
        get().mapManager?.initialize(container);
      }
    },
    setViewClickHandler: (handler) => {
      set({ viewClickHandler: handler });
    },

    onMapViewUpdated: (coreLayerView) => {
      set({ coreLayerExtent: coreLayerView?.extent });
    },
    // layer actions
    toggleLayer: () => {
      const visibile = !get().showLayer;
      console.log(`Button pressed with value ${visibile}`);
      set({ showLayer: visibile });
      get().mapManager.toggleCoreLayer(get().showLayer);
    },

    reloadReferenceLayers: (config) => {
      get().mapManager.reloadReferenceLayers(config);
    },
    turnOffReferenceLayers: () => {
      get().mapManager.turnOffReferenceLayers();
    },

    removeHighlight: (item) => {
      get().mapManager.removeHighlight(item.id, item.layerId);
    },

    getShapeData: () => {
      return get().shapeData;
    },

    getMapConfiguration: () => {
      const config = get().mapConfiguration;
      console.log('Getting map configuration', config);
      return config;
    },

    getSelectedPolygons: () => {
      return get().mapManager?.highlightedPolygons || [];
    },

    setMapConfiguration: (config) => {
      console.log('Setting map configuration', config);
      set({ mapConfiguration: config });
    },

    updateGraphics: (graphics) => {
      get().mapManager.updateGraphicsLayer(graphics);
    },

    updateSummaryData: async (data) => {
      const { mapManager } = get();
      const summData = await mapManager?.sumAcresAndCounts(data);
      set({ summaryData: summData });
    },

    updateShapeData: (data) => {
      set({ shapeData: data });
      if (!data) {
        // clear summary data since no shape data
        set({ summaryData: {} })
      }
    },

    getMapManager: () => {
      return get().mapManager;
    }
  });

 return theMapStore;
};

export const useGlobalMapStore = create(setMapStore());

const useIsolatedMapStore = (selector) => {
  const store = useContext(MapStoreContext);
  // console.log('useIsolatedMapStore store', store);
  if (!store) {
    // throw new Error(' must be used within a MapStoreProvider');
    console.warn(' must be used within a MapStoreProvider');
  }

  return useStore(store, selector);
  // createStore(setMapStore());
}

export default useIsolatedMapStore;
