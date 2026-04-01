import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { changeDisplayName, getNameChangeCount } from "@/lib/sharedLeaderboard";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface UsernameEditorProps {
  actor: any;
  currentName: string;
  onNameChanged?: (newName: string) => void;
}

const MAX_CHANGES = 3;

export function UsernameEditor({
  actor,
  currentName,
  onNameChanged,
}: UsernameEditorProps) {
  const [changeCount, setChangeCount] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!actor) return;
    getNameChangeCount(actor)
      .then((count) => setChangeCount(Number(count)))
      .catch(() => setChangeCount(0));
  }, [actor]);

  const remaining = changeCount === null ? null : MAX_CHANGES - changeCount;
  const isLocked = remaining !== null && remaining <= 0;

  const handleSave = async () => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed.length < 2) {
      setErrorMsg("Name must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 32) {
      setErrorMsg("Name must be 32 characters or fewer.");
      return;
    }
    setSaving(true);
    setErrorMsg("");
    try {
      const result = await changeDisplayName(actor, trimmed);
      if (result.success) {
        setChangeCount(MAX_CHANGES - result.changesRemaining);
        setSuccessMsg(
          `Name updated! ${result.changesRemaining} change${result.changesRemaining === 1 ? "" : "s"} remaining.`,
        );
        setEditing(false);
        setNewName("");
        onNameChanged?.(trimmed);
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(result.error ?? "Failed to update name.");
      }
    } catch {
      setErrorMsg("Could not save name. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card
      className="border-border/50 bg-card/60"
      data-ocid="username_editor.card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Pencil
            className="h-4 w-4"
            style={{ color: "oklch(0.65 0.16 290)" }}
          />
          Display Name
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current name display */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div
              className="text-base font-semibold"
              style={{ color: "oklch(0.85 0.1 290)" }}
            >
              {currentName || "—"}
            </div>
            {remaining !== null && !isLocked && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {remaining} of {MAX_CHANGES} name change
                {remaining === 1 ? "" : "s"} remaining
              </div>
            )}
            {isLocked && (
              <div
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0.14 25)" }}
              >
                Name locked — maximum changes used
              </div>
            )}
          </div>
          {!isLocked && !editing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditing(true);
                setNewName(currentName || "");
                setErrorMsg("");
              }}
              data-ocid="username_editor.edit_button"
              className="shrink-0"
            >
              <Pencil className="h-3 w-3 mr-1" />
              Edit
            </Button>
          )}
        </div>

        {/* Edit form */}
        {editing && !isLocked && (
          <div className="space-y-2">
            <Input
              placeholder="Enter new display name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={32}
              onKeyDown={(e) => e.key === "Enter" && !saving && handleSave()}
              data-ocid="username_editor.input"
              style={{
                background: "oklch(0.12 0.04 290)",
                border: "1px solid oklch(0.35 0.12 290)",
                color: "oklch(0.85 0.08 290)",
              }}
            />
            {errorMsg && (
              <p
                className="text-xs"
                data-ocid="username_editor.error_state"
                style={{ color: "oklch(0.65 0.2 25)" }}
              >
                <i className="fas fa-triangle-exclamation mr-1" />
                {errorMsg}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving || !newName.trim()}
                data-ocid="username_editor.save_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.2 290), oklch(0.44 0.22 310))",
                  color: "white",
                  border: "none",
                }}
              >
                {saving ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <i className="fas fa-check mr-1" />
                )}
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditing(false);
                  setErrorMsg("");
                }}
                data-ocid="username_editor.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Success message */}
        {successMsg && (
          <p
            className="text-xs"
            data-ocid="username_editor.success_state"
            style={{ color: "oklch(0.68 0.18 160)" }}
          >
            <i className="fas fa-circle-check mr-1" />
            {successMsg}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
