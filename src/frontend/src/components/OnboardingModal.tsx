import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Crown,
  Flame,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLanguage } from "../hooks/useLanguage";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

const AVATAR_OPTIONS = [
  { icon: User, name: "User", color: "text-blue-400" },
  { icon: Zap, name: "Zap", color: "text-yellow-400" },
  { icon: Rocket, name: "Rocket", color: "text-purple-400" },
  { icon: Star, name: "Star", color: "text-cyan-400" },
  { icon: Crown, name: "Crown", color: "text-amber-400" },
  { icon: Shield, name: "Shield", color: "text-green-400" },
  { icon: Flame, name: "Flame", color: "text-orange-400" },
  { icon: Trophy, name: "Trophy", color: "text-pink-400" },
  { icon: Target, name: "Target", color: "text-red-400" },
  { icon: Sparkles, name: "Sparkles", color: "text-indigo-400" },
];

const ONBOARDING_STORAGE_KEY = "jackbear_onboarding_complete";
const PROFILE_CACHE_KEY = "jackbear_profile_cache";

interface ProfileCache {
  displayName: string;
  avatar: string;
  profileComplete: boolean;
  principal: string;
  timestamp: number;
}

export default function OnboardingModal() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const [displayName, setDisplayName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].name);
  const [retryCount, setRetryCount] = useState(0);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createProfile = useSaveCallerUserProfile();

  // Load cached profile state from localStorage on mount
  useEffect(() => {
    if (!identity) return;

    const principal = identity.getPrincipal().toString();
    const cachedProfile = localStorage.getItem(PROFILE_CACHE_KEY);

    if (cachedProfile) {
      try {
        const parsed: ProfileCache = JSON.parse(cachedProfile);

        // Verify cache is for current principal
        if (parsed.principal === principal && parsed.profileComplete) {
          if (import.meta.env.DEV) {
            console.log(
              "✅ Onboarding already complete (localStorage cache):",
              parsed,
            );
          }
          setIsModalOpen(false);
          return;
        }
      } catch (error) {
        console.error("Failed to parse profile cache:", error);
        localStorage.removeItem(PROFILE_CACHE_KEY);
      }
    }

    // Check if onboarding was completed in this session
    const onboardingComplete = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (onboardingComplete === "true") {
      if (import.meta.env.DEV) {
        console.log("✅ Onboarding already complete (session storage)");
      }
      setIsModalOpen(false);
      return;
    }
  }, [identity]);

  // Determine if modal should be shown
  useEffect(() => {
    if (!identity) {
      setIsModalOpen(false);
      return;
    }

    if (profileLoading) {
      setIsModalOpen(false);
      return;
    }

    if (isFetched && userProfile) {
      // Profile exists in backend - cache it and hide modal
      const principal = identity.getPrincipal().toString();
      const profileCache: ProfileCache = {
        displayName: userProfile.displayName,
        avatar: userProfile.avatar,
        profileComplete: true,
        principal,
        timestamp: Date.now(),
      };

      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profileCache));
      sessionStorage.setItem(ONBOARDING_STORAGE_KEY, "true");

      if (import.meta.env.DEV) {
        console.log(
          "✅ Profile exists, caching and hiding modal:",
          profileCache,
        );
      }

      setIsModalOpen(false);
      return;
    }

    if (isFetched && !userProfile) {
      // No profile exists - show modal
      const cachedProfile = localStorage.getItem(PROFILE_CACHE_KEY);
      const principal = identity.getPrincipal().toString();

      if (cachedProfile) {
        try {
          const parsed: ProfileCache = JSON.parse(cachedProfile);
          if (parsed.principal === principal && parsed.profileComplete) {
            // Cache exists but backend doesn't have profile - clear cache and show modal
            localStorage.removeItem(PROFILE_CACHE_KEY);
          }
        } catch (_error) {
          localStorage.removeItem(PROFILE_CACHE_KEY);
        }
      }

      setIsModalOpen(true);
    }
  }, [identity, userProfile, profileLoading, isFetched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error(t.pleaseEnterDisplayName || "Please enter a display name");
      return;
    }

    if (!identity) {
      toast.error("Please log in first");
      return;
    }

    try {
      if (import.meta.env.DEV) {
        console.log("🚀 Profile creation with principal binding:", {
          displayName: displayName.trim(),
          avatar: selectedAvatar,
          principal: identity.getPrincipal().toString(),
        });
      }

      await createProfile.mutateAsync({
        displayName: displayName.trim(),
        avatar: selectedAvatar,
        xp: BigInt(0),
        level: BigInt(1),
        streak: BigInt(0),
        lastActivityTime: BigInt(Date.now() * 1000000),
        lastStreakUpdate: BigInt(Date.now() * 1000000),
        lessonsCompletedToday: BigInt(0),
      });

      // Save to localStorage immediately after successful backend save
      const principal = identity.getPrincipal().toString();
      const profileCache: ProfileCache = {
        displayName: displayName.trim(),
        avatar: selectedAvatar,
        profileComplete: true,
        principal,
        timestamp: Date.now(),
      };

      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profileCache));
      sessionStorage.setItem(ONBOARDING_STORAGE_KEY, "true");

      toast.success(t.welcomeToast || "Welcome!", {
        description:
          t.welcomeToastDescription ||
          "Your profile has been created successfully.",
      });

      setShowRetryPrompt(false);
      setRetryCount(0);

      // Hide modal immediately
      setIsModalOpen(false);

      if (import.meta.env.DEV) {
        console.log(
          "✅ Profile saved successfully with principal binding and localStorage cache",
        );
      }
    } catch (error: any) {
      console.error("❌ Profile creation error:", error);

      if (
        error?.message?.includes("Unauthorized") ||
        error?.message?.includes("try again")
      ) {
        setRetryCount((prev) => prev + 1);
        setShowRetryPrompt(true);

        if (retryCount < 2) {
          toast.info("Setting up your account...", {
            description: "Please try again in a moment.",
          });
        } else {
          toast.error("Having trouble creating your profile", {
            description: "Please refresh the page and try again.",
          });
        }
      } else {
        toast.error(t.failedToCreateProfile || "Failed to create profile");
      }
    }
  };

  const handleRetry = () => {
    setShowRetryPrompt(false);
    handleSubmit(new Event("submit") as any);
  };

  // Don't render modal if it shouldn't be shown
  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        // Prevent closing modal by clicking outside or pressing escape
        if (!open) return;
      }}
    >
      <DialogContent
        className="w-full sm:max-w-md bg-card border-2 border-primary/30 rounded-lg shadow-glow-lg p-6 max-h-[90dvh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-display hero-headline">
            <Sparkles className="h-6 w-6 text-primary neon-glow" />
            {t.welcomeTitle || "Welcome!"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t.welcomeDescription || "Create your profile to get started"}
          </DialogDescription>
        </DialogHeader>

        {showRetryPrompt && (
          <Alert className="border-primary/40 bg-primary/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              We're setting up your account. Please click "Retry" to complete
              your profile.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              {t.displayName || "Display Name"}
            </Label>
            <Input
              id="displayName"
              placeholder={t.enterYourName || "Enter your name"}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              className="border-primary/30 focus:border-primary focus:shadow-glow-sm bg-background"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {t.chooseAvatar || "Choose Avatar"}
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map((avatar) => {
                const Icon = avatar.icon;
                return (
                  <button
                    type="button"
                    key={avatar.name}
                    onClick={() => setSelectedAvatar(avatar.name)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedAvatar === avatar.name
                        ? "border-primary bg-primary/20 shadow-glow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                    aria-label={`Select ${avatar.name} avatar`}
                  >
                    <Icon className={`h-6 w-6 ${avatar.color}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 shadow-glow-sm hover:shadow-glow-md transition-shadow font-medium"
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  {t.creatingProfile || "Creating..."}
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  {t.startLearning || "Start Learning"}
                </>
              )}
            </Button>

            {showRetryPrompt && (
              <Button
                type="button"
                onClick={handleRetry}
                variant="outline"
                className="shadow-glow-sm hover:shadow-glow-md transition-shadow"
                disabled={createProfile.isPending}
              >
                Retry
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
