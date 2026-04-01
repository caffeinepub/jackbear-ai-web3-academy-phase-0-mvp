/**
 * Hidden Vault Page
 *
 * Unlinked, additive route that triggers the Hidden Vault egg
 * reward once on first visit when enabled.
 *
 * CONSTRAINTS:
 * - Not linked from navigation
 * - Strictly additive route
 * - Minimal English text only
 *
 * DELTA: New file - hidden vault page
 * SCOPE: No impact on existing routes
 */

import { triggerEasterEgg } from "@/additions/EasterEggRegistry";
import { EASTER_EGG_IDS } from "@/additions/easterEggIds";
import { areEasterEggsEnabled } from "@/additions/featureFlags";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";

export default function VaultPage() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!areEasterEggsEnabled()) {
      return;
    }

    if (!triggered) {
      const success = triggerEasterEgg(EASTER_EGG_IDS.HIDDEN_VAULT);
      if (success) {
        setTriggered(true);
      }
    }
  }, [triggered]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="surface-elevated">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              {triggered ? (
                <Unlock className="h-12 w-12 text-accent" />
              ) : (
                <Lock className="h-12 w-12 text-muted-foreground" />
              )}
              <div>
                <CardTitle className="text-3xl font-display">
                  The Vault
                </CardTitle>
                <CardDescription>
                  You found what wasn't on the map.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You typed a door that wasn't listed anywhere.
              </p>

              {triggered && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-semibold text-accent">
                    Discovery recorded.
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                This route doesn't appear in the navigation. You found it
                anyway.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
