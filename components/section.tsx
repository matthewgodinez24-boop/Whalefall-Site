export function Section({
  title,
  children,
  id
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="bevel-box">
      <h2 className="section-title">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
