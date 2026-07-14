import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import { ecpCountries, type Region } from "../../data/impact";

interface Props {
  activeRegions: Region[];
  hoverHint: string;
}

const W = 900;
const H = 480;

const REGION_COLOR: Record<Region, string> = {
  americas: "#f5a200",
  europe: "#6e8fd8",
  africa: "#4caf7d",
  asia: "#ff8a70",
  oceania: "#ffc654",
};

export default function WorldMap({ activeRegions, hoverHint }: Props) {
  const [hover, setHover] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const { features, path } = useMemo(() => {
    const topo = worldData as unknown as Parameters<typeof feature>[0];
    const countries = (
      topo as unknown as {
        objects: { countries: Parameters<typeof feature>[1] };
      }
    ).objects.countries;
    const fc = feature(topo, countries) as unknown as FeatureCollection<
      Geometry,
      { name: string }
    >;
    const projection = geoNaturalEarth1().fitSize([W, H], fc);
    return { features: fc.features, path: geoPath(projection) };
  }, []);

  const ecpById = useMemo(() => {
    const m = new Map<number, { name: string; region: Region }>();
    for (const c of ecpCountries) m.set(c.id, c);
    return m;
  }, []);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="World map of ECP reach">
        {features.map((f, i) => {
          const id = Number(f.id);
          const ecp = ecpById.get(id);
          const active = !!ecp && activeRegions.includes(ecp.region);
          return (
            <path
              key={f.id ?? i}
              d={path(f) ?? undefined}
              fill={active ? REGION_COLOR[ecp.region] : "rgba(253,253,253,0.07)"}
              stroke="rgba(4,15,46,0.9)"
              strokeWidth="0.5"
              style={{
                transition: `fill 0.9s ease ${active ? (i % 12) * 60 : 0}ms`,
                cursor: active ? "pointer" : "default",
              }}
              onPointerMove={
                active
                  ? (e) => {
                      const rect = (
                        e.currentTarget.ownerSVGElement as SVGSVGElement
                      ).getBoundingClientRect();
                      setHover({
                        name: ecp.name,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }
                  : undefined
              }
              onPointerLeave={() => setHover(null)}
            />
          );
        })}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-gold-500/40 bg-navy-900 px-3 py-1.5 text-sm font-bold text-paper shadow-xl"
          style={{ left: hover.x, top: hover.y - 10 }}
        >
          {hover.name}
        </div>
      )}

      <p className="mt-2 text-center text-xs text-paper/40 italic">
        {hoverHint}
      </p>
    </div>
  );
}
