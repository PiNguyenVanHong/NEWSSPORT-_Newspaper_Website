import { Copy, Server } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to the clipboard.");
    }

    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between gap-8">
                <code className="relative rounded bg-muted px-[.3rem] py-[.2rem] font-mono text-sm font-semibold select-all line-clamp-1 flex-grow sm:text-xs">
                    {description}
                </code>
                <Button className="flex-grow-0" variant={"outline"} size={"icon"} onClick={onCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}