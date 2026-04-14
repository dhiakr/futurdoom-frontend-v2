import { ArrowUpRight, BadgeCheck, MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ShareActionButton from "./ShareActionButton";
import ShareAvatar from "./ShareAvatar";
import shareSocialIconMap from "./shareSocialIconMap";

export default function ProfilePreviewDialog({ profile, open, onClose }) {
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

  if (!open || !profile) {
    return null;
  }

  const dialogTitleId = "share-profile-dialog-title";
  const dialogDescriptionId = "share-profile-dialog-description";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[16px] py-[24px]">
      <button
        type="button"
        className="share-dialog-backdrop absolute inset-0 bg-[rgba(17,6,13,0.52)]"
        aria-label="Close profile dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        className="share-dialog-panel relative z-10 max-h-[calc(100vh-48px)] w-full max-w-[620px] overflow-y-auto overflow-x-hidden rounded-[34px] border border-[color:var(--border)] bg-[var(--bg-base)] shadow-[0_34px_90px_rgba(40,8,26,0.18)]"
      >
        <ShareActionButton
          icon={X}
          variant="ghost"
          size="sm"
          className="absolute right-[20px] top-[20px] border border-[color:var(--border)] bg-white text-foreground shadow-[0_14px_30px_rgba(0,0,0,0.08)] hover:bg-[var(--contrast-button)]"
          aria-label="Close profile dialog"
          onClick={onClose}
        />

        <div
          className="h-[182px] w-full bg-cover bg-center"
          style={{
            backgroundImage: profile.coverImage
              ? `linear-gradient(180deg, rgb(17 6 13 / 0.04), rgb(17 6 13 / 0.22)), url(${profile.coverImage})`
              : "var(--gradient-profile-banner)",
          }}
        />

        <div className="px-[24px] pb-[28px]">
          <div className="share-load-in-soft -mt-[54px]" style={{ "--share-delay": "120ms" }}>
            <ShareAvatar
              name={profile.name}
              initials={profile.initials}
              gradient={profile.gradient}
              imageSrc={profile.avatarImage}
              size="xl"
              shape="circle"
              className="border-[4px] border-white"
            />
          </div>

          <div
            className="share-load-in-soft mt-[18px] flex flex-wrap items-start justify-between gap-[16px]"
            style={{ "--share-delay": "160ms" }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-[8px]">
                <h2
                  id={dialogTitleId}
                  className="m-0 text-[30px] font-semibold tracking-[-0.05em] text-foreground"
                >
                  {profile.name}
                </h2>
                {profile.verified ? (
                  <BadgeCheck className="h-[20px] w-[20px] text-[var(--primary)]" />
                ) : null}
              </div>

              <p className="m-0 mt-[6px] text-[14px] text-muted-foreground">
                {profile.handle}
              </p>

              <div className="mt-[12px] inline-flex items-center gap-[8px] rounded-full bg-[var(--fill-brand-faint)] px-[12px] py-[8px] text-[13px] text-[var(--primary-fg-strong)]">
                <MapPin className="h-[14px] w-[14px]" />
                <span>{profile.location}</span>
              </div>
            </div>

            <Button asChild className="shrink-0 text-[13px] no-underline">
              <a href={profile.profileHref} target="_blank" rel="noreferrer">
                Open profile
                <ArrowUpRight className="h-[15px] w-[15px]" />
              </a>
            </Button>
          </div>

          <p
            className="share-load-in-soft m-0 mt-[16px] text-[15px] font-medium text-[var(--tertiary)]"
            style={{ "--share-delay": "200ms" }}
          >
            {profile.profession}
          </p>

          <p
            id={dialogDescriptionId}
            className="share-load-in-soft m-0 mt-[14px] text-[15px] leading-[1.8] text-muted-foreground"
            style={{ "--share-delay": "220ms" }}
          >
            {profile.bio}
          </p>

          <div
            className="share-load-in-soft mt-[24px] grid gap-[12px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            style={{ "--share-delay": "260ms" }}
          >
            <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--fill-brand-faint)] px-[18px] py-[16px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Followers
              </div>
              <div className="mt-[8px] text-[28px] font-semibold tracking-[-0.05em] text-foreground">
                {profile.followers}
              </div>
            </div>

            <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--contrast-button)] px-[18px] py-[16px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Why Follow
              </div>
              <p className="m-0 mt-[8px] text-[14px] leading-[1.7] text-muted-foreground">
                {profile.profileNote}
              </p>
            </div>
          </div>

          <div
            className="share-load-in-soft mt-[22px] flex flex-wrap gap-[10px]"
            style={{ "--share-delay": "300ms" }}
          >
            {profile.socials?.map((social) => {
              const Icon = shareSocialIconMap[social.platform];

              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-[44px] items-center gap-[10px] rounded-full border border-[color:var(--border)] bg-[var(--bg-base)] px-[16px] text-[13px] font-medium text-muted-foreground no-underline shadow-[0_12px_26px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-[1px] hover:border-[color:var(--border-brand-soft)] hover:text-foreground"
                >
                  {Icon ? <Icon className="h-[15px] w-[15px]" /> : null}
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
