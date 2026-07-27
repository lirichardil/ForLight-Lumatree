import clsx from "clsx";

type GlowBlobProps = {
  size?: string;
  className?: string;
  soft?: boolean;
};

/** Decorative blurred glow blob — mdx.so-style ambient background layer. */
export default function GlowBlob({ size = "40rem", className, soft }: GlowBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute",
        soft ? "glow-blob-soft" : "glow-blob",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
