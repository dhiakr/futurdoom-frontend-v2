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
        className="overflow-hidden rounded-[30px] border border-white/12 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-[24px]"
        style={{
          backgroundColor: "var(--color-surface-community-card)",
          backgroundImage:
            "linear-gradient(180deg, rgb(255 255 255 / 0.05), transparent 42%)",
        }}
      >
        <div
          className="h-[148px] w-full bg-cover bg-center"
          style={{
            backgroundImage: profile.coverImage
              ? `linear-gradient(180deg, rgb(0 0 0 / 0.08), rgb(0 0 0 / 0.42)), url(${profile.coverImage})`
              : "var(--gradient-profile-banner)",
          }}
        />

        <div className="px-[22px] pb-[22px]">
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
              <h2 className="m-0 text-[26px] font-semibold tracking-[-0.05em] text-white">
                {profile.name}
              </h2>
              {profile.verified ? (
                <BadgeCheck className="h-[18px] w-[18px] text-[var(--color-brand-accent)]" />
              ) : null}
            </div>

            <div className="mt-[12px] flex items-center gap-[8px] text-[14px] text-white/68">
              <MapPin className="h-[15px] w-[15px] text-[var(--color-brand-accent-soft)]" />
              {profile.location}
            </div>

            <p className="m-0 mt-[8px] text-[15px] font-medium text-[var(--color-brand-accent-soft)]">
              {profile.profession}
            </p>
          </div>

          <div className="mt-[18px]">
            <p
              className="m-0 text-[14px] leading-[1.8] text-white/76"
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

          <div className="mt-[18px] flex flex-wrap items-center gap-[10px] border-t border-[color:var(--color-border-muted)] pt-[18px]">
            {profile.socials.map((social) => {
              const Icon = socialIconMap[social.platform];

              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/12 bg-[rgb(255_255_255/0.05)] text-white/74 transition duration-200 hover:-translate-y-[1px] hover:border-[color:var(--color-border-brand-soft)] hover:bg-[var(--color-fill-brand-soft)] hover:text-white"
                >
                  {Icon ? <Icon className="h-[15px] w-[15px]" /> : null}
                </a>
              );
            })}
          </div>

          <div className="mt-[18px] flex items-end justify-between gap-[14px]">
            <div>
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.18em] text-white/46">
                Followers
              </p>
              <p className="m-0 mt-[8px] text-[26px] font-semibold tracking-[-0.05em] text-white">
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
