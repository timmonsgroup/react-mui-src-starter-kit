import '@arcgis/core/assets/esri/themes/light/main.css';
import { type FC, type ReactNode, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useMapStore from "../stores/mapStore";
import { mapConfig } from "../constants";

interface TheMapProps {
  children?: ReactNode;
  configOverrides: Record<string, any>;
}

/**
 * Primary map component.  This component is responsible for creating the map
 * and leverages the mapStore to store the map instance.  ArcGIS JS
 * requires a native DOM element to create the map, so this component
 * uses a ref to store the DOM element and then passes it to the mapStore.
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
 * @component
 */
const TheMap: FC<TheMapProps> = ({ children, configOverrides }) => {
  // console.log("TheMap", configOverrides);
  const setContainer = useMapStore((state) => state.setContainer);
  const mapRef = useRef(null);
  const minMapHeight = configOverrides?.minHeight || "500px";

  useEffect(() => {
    // console.log("Map useEffect");
    if (!configOverrides || !configOverrides?.defaultBounds) {
      return;
    }

    // override the default map config with any provided overrides
    const computedMapConfig = { ...mapConfig, ...configOverrides };

    //TODO - Should reset is hard coded but should come from details page since a map search page wouldn't require this most likely.
    if (computedMapConfig && mapRef.current) {
      setContainer(computedMapConfig, mapRef.current, true);
    }
  }, [setContainer, configOverrides]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: `${minMapHeight}`,
      }}
      ref={mapRef}
    >
      {children}
    </div>
  );
};

TheMap.propTypes = {
  children: PropTypes.node,
};

export default TheMap;
