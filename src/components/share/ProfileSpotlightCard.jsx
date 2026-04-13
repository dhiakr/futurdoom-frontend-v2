import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  Globe,
  Link2,
  MapPin,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ProfilePreviewDialog from "./ProfilePreviewDialog";
import ShareActionButton from "./ShareActionButton";
import ShareAvatar from "./ShareAvatar";

const socialIconMap = {
  github: AtSign,
  instagram: Send,
  linkedin: Link2,
  website: Globe,
};

export default function ProfileSpotlightCard({ profile }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const bioPreview = useMemo(() => {
    if (profile.bio.length <= 152) {
      return profile.bio;
    }

    return `${profile.bio.slice(0, 149).trim()}...`;
  }, [profile.bio]);

  return (
    <>
      <section
        className="overflow-hidden rounded-[20px] bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-[24px]"
      >
        <div
          className="h-[148px] w-full bg-cover bg-center"
          style={{
            backgroundImage: profile.coverImage
              ? `linear-gradient(180deg, rgb(0 0 0 / 0.08), rgb(0 0 0 / 0.42)), url(${profile.coverImage})`
              : "var(--gradient-profile-banner)",
          }}
        />

        <div className="px-[28px] pb-[28px]">
          <div className="-mt-[46px]">
            <ShareAvatar
              name={profile.name}
              initials={profile.initials}
              gradient={profile.gradient}
              imageSrc={profile.avatarImage}
              size="lg"
              shape="circle"
              showStatus
            />
          </div>

          <div className="mt-[16px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              <h2 className="m-0 text-[26px] font-semibold tracking-[-0.05em] text-foreground">
                {profile.name}
              </h2>
              {profile.verified ? (
                <BadgeCheck className="h-[18px] w-[18px] text-[var(--color-brand-accent)]" />
              ) : null}
            </div>

            <div className="mt-[12px] flex items-center gap-[8px] text-[14px] text-muted-foreground">
              <MapPin className="h-[15px] w-[15px] text-[var(--color-brand-accent-soft)]" />
              {profile.location}
            </div>

            <p className="m-0 mt-[8px] text-[15px] font-medium text-[var(--color-brand-accent-soft)]">
              {profile.profession}
            </p>
          </div>

          <div className="mt-[18px]">
            <p
              className="m-0 text-[14px] leading-[1.8] text-muted-foreground"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {bioPreview}
            </p>

            <ShareActionButton
              variant="secondary"
              size="sm"
              icon={ArrowUpRight}
              className="mt-[10px] text-[13px]"
              onClick={() => setIsDialogOpen(true)}
            >
              See more
            </ShareActionButton>
          </div>

          <div className="mt-[24px] flex flex-wrap items-center gap-[10px] border-t border-black/5 pt-[22px]">
            {profile.socials.map((social) => {
              const Icon = socialIconMap[social.platform];

              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-border bg-[var(--color-surface-glass-muted)] text-muted-foreground transition duration-200 hover:-translate-y-[1px] hover:border-[color:var(--color-border-brand-soft)] hover:bg-[var(--color-fill-brand-soft)] hover:text-foreground"
                >
                  {Icon ? <Icon className="h-[15px] w-[15px]" /> : null}
                </a>
              );
            })}
          </div>

          <div className="mt-[24px] flex items-end justify-between gap-[14px]">
            <div>
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Followers
              </p>
              <p className="m-0 mt-[8px] text-[26px] font-semibold tracking-[-0.05em] text-foreground">
                {profile.followers}
              </p>
            </div>

            <Button asChild className="text-[13px] no-underline">
              <a href={profile.profileHref} target="_blank" rel="noreferrer">
                Open profile
                <ArrowUpRight className="h-[14px] w-[14px]" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ProfilePreviewDialog
        profile={profile}
        socialIconMap={socialIconMap}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
