import { ArrowUpRight, BadgeCheck, MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ShareActionButton from "./ShareActionButton";
import ShareAvatar from "./ShareAvatar";

export default function ProfilePreviewDialog({
  profile,
  socialIconMap,
  open,
  onClose,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[16px] py-[24px]">
      <button
        type="button"
        className="absolute inset-0 bg-black/72 backdrop-blur-[12px]"
        aria-label="Close profile dialog"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,0.34)]"
        style={{
          backgroundColor: "var(--color-surface-community-card-strong)",
          backgroundImage:
            "linear-gradient(180deg, rgb(255 255 255 / 0.05), transparent 38%)",
        }}
      >
        <ShareActionButton
          icon={X}
          variant="secondary"
          size="sm"
          className="absolute right-[18px] top-[18px]"
          aria-label="Close profile dialog"
          onClick={onClose}
        />

        <div
          className="h-[190px] w-full bg-cover bg-center"
          style={{
            backgroundImage: profile.coverImage
              ? `linear-gradient(180deg, rgb(0 0 0 / 0.06), rgb(0 0 0 / 0.4)), url(${profile.coverImage})`
              : "var(--gradient-profile-banner)",
          }}
        />

        <div className="px-[24px] pb-[24px]">
          <div className="-mt-[56px]">
            <ShareAvatar
              name={profile.name}
              initials={profile.initials}
              gradient={profile.gradient}
              imageSrc={profile.avatarImage}
              size="xl"
              shape="circle"
            />
          </div>

          <div className="mt-[18px] flex items-start justify-between gap-[14px]">
            <div>
              <div className="flex flex-wrap items-center gap-[8px]">
                <h2 className="m-0 text-[30px] font-semibold tracking-[-0.05em] text-white">
                  {profile.name}
                </h2>
                {profile.verified ? (
                  <BadgeCheck className="h-[20px] w-[20px] text-[var(--color-brand-accent)]" />
                ) : null}
              </div>

              <p className="m-0 mt-[6px] text-[14px] text-white/58">
                {profile.handle}
              </p>
            </div>

            <Button asChild className="shrink-0 text-[13px] no-underline">
              <a href={profile.profileHref} target="_blank" rel="noreferrer">
                Open profile
                <ArrowUpRight className="h-[15px] w-[15px]" />
              </a>
            </Button>
          </div>

          <div className="mt-[16px] space-y-[8px] text-[15px] text-white/68">
            <div className="inline-flex items-center gap-[8px]">
              <MapPin className="h-[15px] w-[15px] text-[var(--color-brand-accent-soft)]" />
              {profile.location}
            </div>
            <p className="m-0 text-[var(--color-brand-accent-soft)]">
              {profile.profession}
            </p>
          </div>

          <p className="m-0 mt-[18px] text-[15px] leading-[1.8] text-white/78">
            {profile.bio}
          </p>

          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            {profile.socials.map((social) => {
              const Icon = socialIconMap[social.platform];

              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-[42px] min-w-[42px] items-center justify-center gap-[8px] rounded-full border border-white/12 bg-[rgb(255_255_255/0.06)] px-[14px] text-[13px] font-medium text-white/82 no-underline transition duration-200 hover:-translate-y-[1px] hover:border-[color:var(--color-border-brand-soft)] hover:bg-[var(--color-fill-brand-soft)] hover:text-white"
                >
                  {Icon ? <Icon className="h-[15px] w-[15px]" /> : null}
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-[24px] flex items-end justify-between gap-[16px] rounded-[26px] border border-white/10 bg-[rgb(255_255_255/0.05)] px-[18px] py-[16px]">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/46">
                Followers
              </div>
              <div className="mt-[8px] text-[28px] font-semibold tracking-[-0.05em] text-white">
                {profile.followers}
              </div>
            </div>

            <p className="m-0 max-w-[220px] text-right text-[13px] leading-[1.7] text-white/58">
              {profile.profileNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
