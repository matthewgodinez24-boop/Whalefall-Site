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
    <section id={id} className="mb-8">
      <h2 className="mb-3 text-xl font-normal">{title}</h2>
      {children}
    </section>
  );
}
