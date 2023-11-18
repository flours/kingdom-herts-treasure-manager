import "./StatusHeader.tsx"

export function StatusHeader(props: {area: string,map: string}) {
  return (
      <div className="status-header">
        map: {props.map}   area: {props.area}
      </div>
  );
}

