"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HpBannerAttributes } from "@/payload-types";
interface HomeHeroProps {
    data: HpBannerAttributes;
}

const isVideo = (mime?: string | null, url?: string | null): boolean => {
    if (mime) return mime.startsWith('video/')
    if (url) return /\.(mp4|webm|ogg|mov)$/i.test(url)
    return false
}

export default function HomeHero({ data }: HomeHeroProps) {
    const [visible, setVisible] = useState(false);
    const bg =
        data.background_image && typeof data.background_image === 'object'
            ? data.background_image
            : null

    const mediaIsVideo = isVideo(bg?.mimeType, bg?.url)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-end" aria-label="Hero">

            {/* z-0 — background media: parent must be relative/absolute for fill to work */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 z-0">
                    {mediaIsVideo ? (
                        <video
                            className="h-full w-full object-cover"
                            src={bg?.url ?? ""}
                            autoPlay
                            muted
                            loop
                            playsInline
                            aria-hidden="true"
                        />
                    ) : bg?.url ? (
                        // Parent div is absolute (non-static) so fill is valid here
                        <Image
                            src={bg?.url}
                            alt={bg?.alt ?? data.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    ) : null}
                </div>

            </div>

            {/* z-10 — dark overlay */}
            {/* <div className="absolute inset-0 z-10 bg-black/20" aria-hidden="true" /> */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.40)_17.79%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(32,58,114,0.28)_0%,rgba(32,58,114,0.28)_100%),linear-gradient(0deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0)_100%)]" aria-hidden="true" />

            <div className="relative z-10 py-9 md:py-15 lg:py-25 px-4 max-w-7xl mx-auto w-full">
                <div className="max-w-[730px] w-full">
                    <h1
                        className={[
                            "text-white font-medium tracking-[-1.92px] pb-8",
                            "text-4xl sm:text-5xl lg:text-7xl",
                            "transition-all duration-700 ease-out",
                            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                        ].join(" ")}
                    >
                        {data.title}
                    </h1>

                    {data.description && (
                        <p
                            className={[
                                "text-white text-sm md:text-base",
                                "transition-all duration-700 ease-out delay-150",
                                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                            ].join(" ")}
                        >
                            {data.description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}