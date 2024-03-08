import { cn } from "@/lib/utils";
import { PinContainer } from "./3d-pin";
import { Meteors } from "./meteors";

export default function ExperienceCard({
    company,
    role,
    url,
    className,
}: {
    company: string;
    role: string;
    url: string;
    className?: string;
}) {
    return (
        <div className={cn(className)}>
            <div className="flex items-center justify-center -translate-y-48">
                <PinContainer title={url} href={url}>
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 md:w-[15rem] w-[7rem]">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-[#ddd]">
                            {company}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">{role}</span>
                        </div>
                    </div>
                    <Meteors number={20} />
                </PinContainer>
            </div>
        </div>
    );
}
