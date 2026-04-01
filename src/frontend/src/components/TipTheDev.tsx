import { Button } from "@/components/ui/button";
import { Check, ChevronUp, Copy, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";

interface TipTheDevProps {
  compact?: boolean;
}

const SUPPORT_ITEMS = [
  {
    key: "icp",
    label: "ICP / ckBTC / ckUSDC",
    value: "pkt5m-vzera-uztne-or4se-vgejr-xajuz-ulw55-zdxon-3euz7-gvakp-5qe",
    isPayPal: false,
  },
  {
    key: "eth",
    label: "ETH / USDC",
    value: "0xdE563904A73fD96Ca3c2dcC2EeA290659E448cD2",
    isPayPal: false,
  },
  {
    key: "btc",
    label: "BTC",
    value: "bc1qp0dgwesnug7yuwx93hrgyjj2gxtx7cww5x7z2e",
    isPayPal: false,
  },
  {
    key: "paypal",
    label: "PayPal",
    value: "paypal.me/justinjackbear",
    isPayPal: true,
    href: "https://paypal.me/justinjackbear",
  },
];

export default function TipTheDev({ compact = false }: TipTheDevProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const pad = compact ? "p-3" : "p-4";

  return (
    <div
      className={`rounded-lg border border-border/50 bg-card/60 ${pad} transition-all duration-200`}
      data-ocid="tip-dev.card"
    >
      {!expanded ? (
        /* Collapsed */
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className={`font-medium ${compact ? "text-sm" : "text-sm"} text-foreground leading-tight`}
            >
              Tip the Dev 🐻
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
              Help keep JackBear.ai free, expand new worlds, and fund new
              features.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 text-xs h-7 px-3"
            onClick={() => setExpanded(true)}
            data-ocid="tip-dev.open_modal_button"
          >
            <Heart className="w-3 h-3 mr-1.5 text-primary" />
            Support
          </Button>
        </div>
      ) : (
        /* Expanded */
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-foreground">
                Tip the Dev 🐻
              </p>
              <p className="text-xs text-muted-foreground">
                JackBear.ai is community-supported.
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 shrink-0"
              onClick={() => setExpanded(false)}
              data-ocid="tip-dev.close_button"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>

          {/* Address rows */}
          <div className="space-y-2">
            {SUPPORT_ITEMS.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs font-mono text-foreground truncate">
                    {item.value}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      handleCopy(
                        item.key,
                        item.isPayPal ? item.href! : item.value,
                      )
                    }
                    data-ocid={`tip-dev.${item.key}.button`}
                    title="Copy"
                  >
                    {copied === item.key ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                  {item.isPayPal && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        window.open(item.href, "_blank", "noopener,noreferrer")
                      }
                      data-ocid="tip-dev.paypal.link"
                      title="Open PayPal"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* II Placeholder */}
          <div className="border-t border-border/40 pt-3">
            <p className="text-sm font-medium text-foreground mb-1">
              Tip with Internet Identity ⚡
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              On-chain tipping via Internet Identity is coming soon. Use the
              addresses above to tip directly on-chain.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
