import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { HeartIcon, SparkleIcon } from "@/components/Icons";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact GIF Studio",
  description:
    "Get in touch with the GIF Studio team. Questions, feedback or partnership ideas — we'd love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="container-px pt-[114px] pb-[50px]">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-eyebrow">Contact</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              <span className="heading-gradient">Let's talk</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Have a question, a feature request, or just want to say hi? Send us a
              message and we'll get back to you.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${SITE.email}`}
                className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:border-accent/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <SparkleIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email us</p>
                  <p className="text-sm text-muted">{SITE.email}</p>
                </div>
              </a>
              <div className="glass flex items-center gap-3 rounded-2xl p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <HeartIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Made by {SITE.creator}</p>
                  <p className="text-sm text-muted">Built with care at {SITE.brand}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
