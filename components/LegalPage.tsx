import { Breadcrumbs } from "@/components/Breadcrumbs";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  crumbLabel,
  crumbPath,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  crumbLabel: string;
  crumbPath: string;
}) {
  return (
    <section className="container-px pt-[114px] pb-[50px]">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: crumbLabel, path: crumbPath },
        ]}
      />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="heading-gradient">{title}</span>
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
        <p className="mt-6 text-base leading-relaxed text-muted">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl font-bold">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
