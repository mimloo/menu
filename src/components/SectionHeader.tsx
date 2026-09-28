interface Props {
  title: string;
  tagline: string;
  /** Left edge and cap top of the title. */
  x: number;
  y: number;
  size?: number;
  /** Title baseline -> rule, rule -> tagline cap. */
  ruleGap?: number;
  taglineGap?: number;
  taglineSize?: number;
  titleLineHeight?: number;
  /** Extra left offset of the rule / tagline relative to the title (matches the PDF). */
  ruleX?: number;
  taglineX?: number;
  children?: React.ReactNode;
}

/** Big title + short blue rule + tagline. */
export function SectionHeader({
  title,
  tagline,
  x,
  y,
  size = 63.7,
  ruleGap = 27.5,
  taglineGap = 16.5,
  taglineSize = 21.6,
  titleLineHeight,
  ruleX = 1,
  taglineX = 0,
  children,
}: Props) {
  return (
    <div className="abs" style={{ left: x, top: y }}>
      <h1 className="t" style={{ fontSize: size, fontWeight: 500, lineHeight: titleLineHeight ? `${titleLineHeight}px` : undefined }}>
        {title}
      </h1>
      <div className="rule" style={{ marginTop: ruleGap, marginLeft: ruleX }} />
      <p className="t" style={{ fontSize: taglineSize, lineHeight: `${taglineSize * 1.2}px`, marginTop: taglineGap, marginLeft: taglineX }}>
        {tagline}
      </p>
      {children}
    </div>
  );
}
