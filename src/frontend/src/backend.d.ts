import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AnalyticsStats {
    weeklyActiveUsers: bigint;
    returningLearners: bigint;
    currentActiveLearners: bigint;
    dailyActiveUsers: bigint;
    pageViewsToday: bigint;
    lessonCompletions: bigint;
    totalPageViews: bigint;
    streakCount: bigint;
}
export interface QuizAnswer {
    isCorrect: boolean;
    questionId: string;
    selectedAnswer: string;
}
export type Time = bigint;
export interface CompleteLessonArgs {
    lessonId: string;
    xpReward: bigint;
    worldId: string;
}
export interface QuizResult {
    feedback: string;
    score: bigint;
    totalQuestions: bigint;
    isFirstPass: boolean;
    passed: boolean;
}
export interface WinnerClaim {
    month: bigint;
    displayName: string;
    usdcAddress: string;
    userId: string;
    year: bigint;
    submittedAt: Time;
    isPaid: boolean;
}
export interface UpdateProfileArgs {
    displayName: string;
    avatar: string;
}
export interface BearCredits {
    balance: bigint;
    totalEarned: bigint;
}
export interface CompleteQuestArgs {
    questDescription: string;
    xpReward: bigint;
    creditsReward: bigint;
    questId: string;
}
export interface SubmitQuizArgs {
    lessonId: string;
    answers: Array<QuizAnswer>;
}
export interface BPLeaderboardEntry {
    displayName: string;
    userId: string;
    rank: bigint;
    allTimeBP: bigint;
}
export interface LessonProgress {
    lessonId: string;
    attempted: boolean;
    completionTime: Time;
    completed: boolean;
    unlocked: boolean;
}
export interface UserProfile {
    xp: bigint;
    lessonsCompletedToday: bigint;
    streak: bigint;
    displayName: string;
    lastActivityTime: Time;
    level: bigint;
    lastStreakUpdate: Time;
    avatar: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    attemptQuiz(lessonId: string): Promise<void>;
    changeDisplayName(newName: string): Promise<string>;
    completeLesson(args: CompleteLessonArgs): Promise<{
        bpAwarded: bigint;
        dailyBonusApplied: boolean;
        streakBonusApplied: boolean;
        isFirstCompletion: boolean;
    }>;
    completeOnboarding(displayName: string, avatar: string): Promise<void>;
    completeQuest(args: CompleteQuestArgs): Promise<void>;
    getAllWorld0Lessons(): Promise<Array<[string, string]>>;
    getAnalyticsStats(): Promise<AnalyticsStats>;
    getBearCredits(): Promise<BearCredits | null>;
    getBestQuizScore(lessonId: string): Promise<bigint | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentWorldLessonProgress(worldId: string): Promise<Array<LessonProgress>>;
    getGlobalLeaderboard(): Promise<Array<BPLeaderboardEntry>>;
    getMonthlyLeaderboard(month: bigint, year: bigint): Promise<Array<BPLeaderboardEntry>>;
    getMyDailyStats(): Promise<{
        lessonsToday: bigint;
        streak: bigint;
        firstLessonBonusAvailable: boolean;
    }>;
    getNameChangeCount(): Promise<bigint>;
    getOnboardingStatus(): Promise<[boolean, string, string]>;
    getPersistentUserState(): Promise<[boolean, string, string]>;
    getPublicMetrics(): Promise<{
        activeLearnersToday: bigint;
        mostCompletedLessonWeekly?: string;
        averageProgress: bigint;
    }>;
    getReturnedValue(): Promise<bigint>;
    getUserBearCredits(user: Principal): Promise<BearCredits | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserWorldProgress(user: Principal, worldId: string): Promise<Array<LessonProgress>>;
    getWinnerClaims(): Promise<Array<WinnerClaim>>;
    getWinnerHistory(): Promise<Array<WinnerClaim>>;
    /**
     * / Returns true if the caller has already seen the given share milestone modal.
     */
    hasSeenShareMilestone(milestone: string): Promise<boolean>;
    isAdminUser(): Promise<boolean>;
    /**
     * / Returns true if the caller has ever submitted the boss quiz for the given world.
     * / Boss quizzes are stored in lessonAttempts under the key "boss-<worldId>".
     */
    isBossAttempted(worldId: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isLessonUnlocked(lessonId: string): Promise<boolean>;
    /**
     * / Returns true if the caller has unlocked the given special world.
     */
    isSpecialWorldUnlocked(worldId: string): Promise<boolean>;
    markClaimPaid(month: bigint, year: bigint): Promise<void>;
    markLessonAttempted(lessonId: string): Promise<void>;
    /**
     * / Mark the given share milestone as seen for the caller. Idempotent.
     */
    markShareMilestoneSeen(milestone: string): Promise<void>;
    /**
     * / Mark a special world as unlocked for the caller. Idempotent.
     */
    markSpecialWorldUnlocked(worldId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePersistentUserState(displayName: string, avatar: string, profileComplete: boolean): Promise<void>;
    submitBearPoints(allTimeBP: bigint, monthlyBP: bigint, month: bigint, year: bigint): Promise<void>;
    submitQuiz(args: SubmitQuizArgs): Promise<QuizResult>;
    submitWinnerClaim(month: bigint, year: bigint, usdcAddress: string): Promise<string>;
    trackPageView(): Promise<void>;
    trackProgressEvent(_progress: bigint): Promise<void>;
    /**
     * / Persists caller's current rank snapshot and returns delta vs previous snapshot.
     * / Returns null if no prior snapshot exists (first call).
     * / delta > 0 means rank improved (moved up), delta < 0 means rank dropped.
     */
    updateMyRankSnapshot(currentRank: bigint): Promise<bigint | null>;
    updatePersistentUserState(displayName: string, avatar: string, profileComplete: boolean): Promise<void>;
    updateProfile(args: UpdateProfileArgs): Promise<void>;
}
