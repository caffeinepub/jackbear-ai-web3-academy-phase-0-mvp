import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Debug "mo:core/Debug";
import Bool "mo:core/Bool";

import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type XPEvent = {
    amount : Nat;
    reason : Text;
    timestamp : Time.Time;
  };

  public type UserId = Principal;
  public type UserProfile = {
    displayName : Text;
    avatar : Text;
    xp : Nat;
    level : Nat;
    streak : Nat;
    lastActivityTime : Time.Time;
    lastStreakUpdate : Time.Time;
    lessonsCompletedToday : Nat;
  };

  public type WorldProgress = {
    worldId : Text;
    completed : Bool;
    missionsCompleted : Nat;
    totalMissions : Nat;
  };

  public type LessonProgress = {
    lessonId : Text;
    completed : Bool;
    completionTime : Time.Time;
    attempted : Bool;
    unlocked : Bool;
  };

  public type UpdateProfileArgs = {
    displayName : Text;
    avatar : Text;
  };

  public type CompleteLessonArgs = {
    lessonId : Text;
    worldId : Text;
    xpReward : Nat;
  };

  public type CoursesByWorld = {
    world : Text;
    courses : [Course];
  };

  public type CompleteQuestArgs = {
    questId : Text;
    questDescription : Text;
    xpReward : Nat;
    creditsReward : Nat;
  };

  public type DailyQuest = {
    questId : Text;
    description : Text;
    completed : Bool;
    rewardXP : Nat;
    rewardCredits : Nat;
  };

  public type BearCredits = {
    balance : Nat;
    totalEarned : Nat;
  };

  public type Course = {
    id : Text;
    title : Text;
    world : Text;
    status : Text;
  };

  public type LeaderboardEntry = {
    userId : UserId;
    displayName : Text;
    xp : Nat;
    level : Nat;
  };

  public type GeneratedCourseArgs = {
    id : Text;
    title : Text;
    world : Text;
    description : Text;
    status : Text;
    language : Text;
    difficultyLevel : Text;
    prerequisites : [Text];
    resources : [Text];
    lastUpdated : Time.Time;
  };

  public type IcpediaTopic = {
    topicId : Text;
    title : Text;
    summary : Text;
    keyTerms : [Text];
    whyItMatters : Text;
    references : [Text];
    relatedTopics : [Text];
    creationTimestamp : Time.Time;
    category : Text;
    tags : [Text];
  };

  public type Episode = {
    id : Text;
    title : Text;
    description : Text;
    youtubeId : Text;
    embedUrl : Text;
    thumbnailUrl : Text;
    duration : Nat;
    releaseDate : Time.Time;
    viewCount : Nat;
  };

  public type InternalCourseData = {
    lastCourseGeneration : Time.Time;
    courses : Map.Map<Text, Course>;
  };

  public type QuizAttempt = {
    lessonId : Text;
    attemptNumber : Nat;
    score : Nat;
    totalQuestions : Nat;
    answers : [QuizAnswer];
    completedAt : Time.Time;
  };

  public type QuizAnswer = {
    questionId : Text;
    selectedAnswer : Text;
    isCorrect : Bool;
  };

  public type SubmitQuizArgs = {
    lessonId : Text;
    answers : [QuizAnswer];
  };

  public type QuizResult = {
    score : Nat;
    totalQuestions : Nat;
    passed : Bool;
    feedback : Text;
    isFirstPass : Bool;
  };

  public type Lpdata = {
    id : Text;
    task : Text;
    category : Text;
    status : Text;
    tag : Text;
    lastUpdated : Time.Time;
  };

  public type PersistentUserState = {
    displayName : Text;
    avatar : Text;
    profileComplete : Bool;
  };

  public type Reward = {
    id : Text;
    type_ : Text;
    description : Text;
    value : Nat;
    rewardCriteria : Text;
    unlockCondition : Text;
    icon : Text;
    timestamp : Time.Time;
    code : Text;
    activated : Bool;
    active : Bool;
    forSale : Bool;
    forRent : Bool;
    recipient : Text;
    borrower : Text;
    requestMessage : Text;
    acceptanceMessage : Text;
  };

  public type LessonHistoryEntry = {
    lessonId : Text;
    completedAt : Time.Time;
    worldId : Text;
  };

  let defaultPersistentUserState : PersistentUserState = {
    displayName = "";
    avatar = "";
    profileComplete = false;
  };

  let defaultReward : Reward = {
    id = "";
    type_ = "default";
    description = "Default reward";
    value = 0;
    rewardCriteria = "none";
    unlockCondition = "never";
    icon = "default_icon";
    timestamp = 0;
    code = "default_code";
    activated = false;
    active = false;
    forSale = false;
    forRent = false;
    recipient = "none";
    borrower = "none";
    requestMessage = "none";
    acceptanceMessage = "none";
  };

  public type AnalyticsStats = {
    totalPageViews : Nat;
    pageViewsToday : Nat;
    dailyActiveUsers : Nat;
    weeklyActiveUsers : Nat;
    currentActiveLearners : Nat;
    returningLearners : Nat;
    lessonCompletions : Nat;
    streakCount : Nat;
  };

  let lessonCounts = Map.empty<Text, Nat>();
  let textMapToNatMap = Map.empty<Text, Nat>();
  stable var quizAttempts = Map.empty<UserId, List.List<QuizAttempt>>();
  stable var bestQuizScores = Map.empty<UserId, Map.Map<Text, Nat>>();
  stable var allRewards = Map.empty<Principal, List.List<Reward>>();

  stable var profiles = Map.empty<UserId, UserProfile>();
  stable var worldProgress = Map.empty<UserId, List.List<WorldProgress>>();
  stable var lessonAttempts = Map.empty<UserId, Map.Map<Text, Nat>>();
  // Tracks per-user first-completion per lesson — written only by completeLesson, never by markLessonAttempted.
  // Kept separate so that markLessonAttempted (called on modal open for unlock purposes)
  // cannot poison the first-completion reward guard.
  stable var lessonFirstCompletions = Map.empty<UserId, Map.Map<Text, Bool>>();
  stable var specialWorldUnlocks = Map.empty<UserId, Map.Map<Text, Bool>>();
  let xpEvents = Map.empty<UserId, List.List<XPEvent>>();
  let dailyQuests = Map.empty<UserId, List.List<DailyQuest>>();
  stable var bearCredits = Map.empty<UserId, BearCredits>();
  var leaderboardEntries = List.empty<LeaderboardEntry>();
  let icpediaTopics = Map.empty<Text, IcpediaTopic>();
  let episodes = Map.empty<Text, Episode>();
  let scholarships = Map.empty<Text, List.List<Lpdata>>();
  let partnerships = Map.empty<Text, List.List<Lpdata>>();
  let glossaryTerms = Map.empty<Text, GlossaryTerm>();
  let persistentUserState = Map.empty<Principal, PersistentUserState>();

  public type AnalyticsStatsData = {
    totalPageViews : Nat;
    pageViewsToday : Nat;
    activeLearnersToday : Nat;
    averageProgress : Nat;
    mostCompletedLessonWeekly : ?Text;
  };

  let lessonCompletionHistory = Map.empty<UserId, List.List<LessonHistoryEntry>>();
  let weeklyLessonCompletions = Map.empty<Text, Nat>();
  let worldLessonCompletionCounts = Map.empty<Text, Nat>();
  var achievementCreatedTime : Time.Time = 0;

  public shared ({ caller }) func savePersistentUserState(displayName : Text, avatar : Text, profileComplete : Bool) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save persistent state");
    };

    _ensureUserRole(caller);

    let newState : PersistentUserState = {
      displayName;
      avatar;
      profileComplete;
    };

    persistentUserState.add(caller, newState);
  };

  public query ({ caller }) func getPersistentUserState() : async (Bool, Text, Text) {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view persistent state");
    };

    let state = persistentUserState.get(caller);
    switch (state) {
      case (?state) { (state.profileComplete, state.displayName, state.avatar) };
      case (null) { (false, "", "") };
    };
  };

  public shared ({ caller }) func updatePersistentUserState(displayName : Text, avatar : Text, profileComplete : Bool) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update persistent state");
    };

    _ensureUserRole(caller);

    await savePersistentUserState(displayName, avatar, profileComplete);
  };

  public shared ({ caller }) func completeOnboarding(displayName : Text, avatar : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can complete onboarding");
    };

    _ensureUserRole(caller);

    await savePersistentUserState(displayName, avatar, true);
  };

  public query ({ caller }) func getOnboardingStatus() : async (Bool, Text, Text) {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view onboarding status");
    };

    let state = persistentUserState.get(caller);
    switch (state) {
      case (?state) { (state.profileComplete, state.displayName, state.avatar) };
      case (null) { (false, "", "") };
    };
  };

  public type LessonReference = {
    id : Text;
    title : Text;
    world : Text;
    description : Text;
  };

  public type GlossaryTerm = {
    term : Text;
    definition : Text;
    category : Text;
    tags : [Text];
    relatedTopics : [Text];
    relatedLessons : [Text];
    externalReferences : [Text];
    language : Text;
    fullDescription : ?Text;
  };

  module LeaderboardEntry {
    public func compare(entry1 : LeaderboardEntry, entry2 : LeaderboardEntry) : Order.Order {
      Nat.compare(entry2.xp, entry1.xp);
    };
  };

  module UserProfile {
    public func compare(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Nat.compare(profile2.xp, profile1.xp);
    };

    public func compareByDisplayName(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Text.compare(profile1.displayName, profile2.displayName);
    };
  };

  module IcpediaTopic {
    public func compare(topic1 : IcpediaTopic, topic2 : IcpediaTopic) : Order.Order {
      Text.compare(topic1.title, topic2.title);
    };

    public func compareByTitle(topic1 : IcpediaTopic, topic2 : IcpediaTopic) : Order.Order {
      Text.compare(topic1.title, topic2.title);
    };
  };

  func _ensureUserRole(caller : Principal) {
    if (caller.isAnonymous()) {
      return;
    };

    let currentRole = AccessControl.getUserRole(accessControlState, caller);

    switch (currentRole) {
      case (#guest) {
        AccessControl.assignRole(accessControlState, caller, caller, #user);
      };
      case (_) {};
    };
  };

  func _validateDisplayName(displayName : Text) : Bool {
    let trimmed = displayName.trim(#text " ");
    trimmed.size() > 0 and trimmed.size() <= 50;
  };

  func _validateAvatar(avatar : Text) : Bool {
    let trimmed = avatar.trim(#text " ");
    trimmed.size() > 0 and trimmed.size() <= 200;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile unless you are an admin");
    };
    profiles.get(user);
  };

  public query ({ caller }) func getBearCredits() : async ?BearCredits {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view Bear Credits");
    };
    bearCredits.get(caller);
  };

  public query ({ caller }) func getUserBearCredits(user : Principal) : async ?BearCredits {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own Bear Credits unless you are an admin");
    };
    bearCredits.get(user);
  };

  func hasStreakBeenUpdatedToday(profile : UserProfile) : Bool {
    let currentTime = Time.now();
    let nanoPerDay = 86400000000000;
    let currentDay = currentTime / nanoPerDay;
    let lastStreakDay = profile.lastStreakUpdate / nanoPerDay;

    currentDay == lastStreakDay;
  };

  func updateStreakCountIfNeeded(profile : UserProfile) : UserProfile {
    let nanoPerDay = 86400000000000;
    let currentTime = Time.now();
    let currentDay = currentTime / nanoPerDay;
    let lastStreakDay = profile.lastStreakUpdate / nanoPerDay;

    if (currentDay > lastStreakDay) {
      // New UTC day — update streak and reset daily count to 1
      let daysDifference = (currentDay - lastStreakDay) : Int;
      let newStreak : Nat = if (daysDifference == 1) { profile.streak + 1 } else { 1 };
      {
        profile with
        streak = newStreak;
        lastActivityTime = currentTime;
        lastStreakUpdate = currentTime;
        lessonsCompletedToday = 1;
      };
    } else {
      // Same UTC day — keep streak, increment daily count
      {
        profile with
        lastActivityTime = currentTime;
        lessonsCompletedToday = profile.lessonsCompletedToday + 1;
      };
    };
  };

  // Returns finalBP for a lesson completion using anti-speedrun economy.
  // dailyCount: UPDATED lessonsCompletedToday (1 = first of day)
  // Returns (finalBP, isFirstOfDay, isStreakBonus)
  func _computeLessonBP(dailyCount : Nat, streak : Nat) : (Nat, Bool, Bool) {
    let baseBP : Nat = 10;

    // Daily volume multiplier (pct out of 100)
    let volPct : Nat = if (dailyCount <= 5) { 100 }
      else if (dailyCount <= 10) { 50 }
      else { 20 };

    // First-lesson-of-day bonus (pct out of 100)
    let isFirstOfDay : Bool = dailyCount == 1;
    let firstPct : Nat = if (isFirstOfDay) { 125 } else { 100 };

    // Streak multiplier (pct out of 100)
    let streakPct : Nat = if (streak >= 15) { 150 }
      else if (streak >= 8) { 125 }
      else if (streak >= 4) { 110 }
      else { 100 };

    let isStreakBonus : Bool = streakPct > 100;

    // finalBP = floor(baseBP * volPct * streakPct * firstPct / 1_000_000)
    let scaled : Nat = baseBP * volPct * streakPct * firstPct;
    let finalBP : Nat = scaled / 1000000;

    (finalBP, isFirstOfDay, isStreakBonus);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    if (not _validateDisplayName(profile.displayName)) {
      Runtime.trap("Invalid display name: must be 1-50 characters");
    };

    if (not _validateAvatar(profile.avatar)) {
      Runtime.trap("Invalid avatar: must be 1-200 characters");
    };

    _ensureUserRole(caller);

    let existingProfile = profiles.get(caller);
    let updatedProfile = switch (existingProfile) {
      case (?existing) {
        {
          profile with
          xp = existing.xp;
          level = existing.level;
          streak = existing.streak;
          lastActivityTime = Time.now();
          lastStreakUpdate = existing.lastStreakUpdate;
          lessonsCompletedToday = existing.lessonsCompletedToday;
        };
      };
      case (null) {
        {
          profile with
          xp = 0;
          level = 1;
          streak = 0;
          lastActivityTime = Time.now();
          lastStreakUpdate = Time.now();
          lessonsCompletedToday = 0;
        };
      };
    };

    profiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func completeLesson(args : CompleteLessonArgs) : async { isFirstCompletion : Bool; bpAwarded : Nat; dailyBonusApplied : Bool; streakBonusApplied : Bool } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can complete lessons");
    };

    if (args.lessonId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid lesson ID");
    };

    if (args.worldId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid world ID");
    };

    // Canonicalize the incoming lesson ID — prevents legacy World 0 IDs from
    // bypassing the first-completion guard after the canonical ID migration.
    let canonLessonId : Text = migrateWorld0Id(args.lessonId);

    Debug.print("[BP-AUDIT] completeLesson: ENTRY | caller=" # caller.toText() # " | lessonId=" # canonLessonId # " | worldId=" # args.worldId);

    // [BP-AUDIT] completeLesson: check first-completion against lessonFirstCompletions (NOT lessonAttempts).
    // Check BOTH the canonical ID and any legacy alias so existing progress
    // stored under the old ID prevents a duplicate award after migration.
    let isFirstCompletion : Bool = switch (lessonFirstCompletions.get(caller)) {
      case (null) { true };
      case (?completions) {
        // Check canonical ID first
        switch (completions.get(canonLessonId)) {
          case (?_) { false };
          case (null) {
            // Also check legacy alias (data written before migration)
            switch (legacyWorld0Id(canonLessonId)) {
              case (?legacyId) {
                switch (completions.get(legacyId)) {
                  case (?_) { false };
                  case (null) { true };
                };
              };
              case (null) { true };
            };
          };
        };
      };
    };

    updateLessonAttempt(caller, canonLessonId);

    _recalculateAndPersistStreakAfterCompletion(caller);

    let lessonEntry : LessonHistoryEntry = {
      lessonId = canonLessonId;
      completedAt = Time.now();
      worldId = args.worldId;
    };

    let userHistory = lessonCompletionHistory.get(caller);
    let updatedHistory = switch (userHistory) {
      case (?_) {
        List.fromArray<LessonHistoryEntry>([lessonEntry]);
      };
      case (null) {
        List.fromArray<LessonHistoryEntry>([lessonEntry]);
      };
    };

    lessonCompletionHistory.add(caller, updatedHistory);

    let currentCompletions = weeklyLessonCompletions.get(canonLessonId);
    let newCount = switch (currentCompletions) {
      case (?count) { count + 1 };
      case (null) { 1 };
    };
    weeklyLessonCompletions.add(canonLessonId, newCount);

    let worldCompletions = worldLessonCompletionCounts.get(args.worldId);
    let newWorldCount = switch (worldCompletions) {
      case (?count) { count + 1 };
      case (null) { 1 };
    };
    worldLessonCompletionCounts.add(args.worldId, newWorldCount);

    // Always record this completion attempt — idempotent write (canonical ID only)
    let userCompletions = lessonFirstCompletions.get(caller);
    let updatedCompletions = switch (userCompletions) {
      case (?comps) {
        comps.add(canonLessonId, true);
        comps;
      };
      case (null) {
        let newMap = Map.empty<Text, Bool>();
        newMap.add(canonLessonId, true);
        newMap;
      };
    };
    lessonFirstCompletions.add(caller, updatedCompletions);

    // Read the updated profile (already updated by _recalculateAndPersistStreakAfterCompletion)
    let updatedProfile2 = profiles.get(caller);
    let (dailyCount, streak) = switch (updatedProfile2) {
      case (?p) { (p.lessonsCompletedToday, p.streak) };
      case (null) { (1, 1) };
    };

    let (finalBP, isFirstOfDay, isStreakBonus) = _computeLessonBP(dailyCount, streak);

    if (isFirstCompletion) {
      // [BP-AUDIT] completeLesson: FIRST COMPLETION — awarding XP + economy BP
      await _awardXP(caller, args.xpReward, "Lesson completed: " # canonLessonId);
      await _awardCredits(caller, finalBP);
      Debug.print("[BP-ECONOMY] completeLesson: dailyCount=" # dailyCount.toText() # " streak=" # streak.toText() # " finalBP=" # finalBP.toText() # " firstOfDay=" # isFirstOfDay.toText() # " streakBonus=" # isStreakBonus.toText());
    };

    {
      isFirstCompletion = isFirstCompletion;
      bpAwarded = if (isFirstCompletion) { finalBP } else { 0 };
      dailyBonusApplied = isFirstCompletion and isFirstOfDay;
      streakBonusApplied = isFirstCompletion and isStreakBonus;
    };
  };

  public query ({ caller }) func getMyDailyStats() : async {
    streak : Nat;
    lessonsToday : Nat;
    firstLessonBonusAvailable : Bool;
  } {
    switch (profiles.get(caller)) {
      case (?p) {
        let nanoPerDay = 86400000000000;
        let currentDay = Time.now() / nanoPerDay;
        let lastDay = p.lastStreakUpdate / nanoPerDay;
        let isNewDay = currentDay > lastDay;
        {
          streak = p.streak;
          lessonsToday = if (isNewDay) { 0 } else { p.lessonsCompletedToday };
          firstLessonBonusAvailable = isNewDay or p.lessonsCompletedToday == 0;
        };
      };
      case (null) {
        { streak = 0; lessonsToday = 0; firstLessonBonusAvailable = true };
      };
    };
  };

  public shared ({ caller }) func markLessonAttempted(lessonId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can mark lessons as attempted");
    };

    let canonId : Text = migrateWorld0Id(lessonId);

    if (canonId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid lesson ID");
    };

    updateLessonAttempt(caller, canonId);
  };

  public shared ({ caller }) func completeQuest(args : CompleteQuestArgs) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can complete quests");
    };

    if (args.questId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid quest ID");
    };

    _recalculateAndPersistStreakAfterCompletion(caller);

    await _awardXP(caller, args.xpReward, "Quest completed: " # args.questDescription);
    await _awardCredits(caller, args.creditsReward);
  };

  public shared ({ caller }) func submitQuiz(args : SubmitQuizArgs) : async QuizResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit quizzes");
    };

    if (args.lessonId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid lesson ID");
    };

    // Canonicalize the incoming lesson ID — same migration as completeLesson.
    let canonQuizId : Text = migrateWorld0Id(args.lessonId);

    Debug.print("[BP-AUDIT] submitQuiz: ENTRY | caller=" # caller.toText() # " | lessonId=" # canonQuizId # " | answers=" # args.answers.size().toText());

    updateLessonAttempt(caller, canonQuizId);

    let totalQuestions = args.answers.size();
    let correctAnswers = args.answers.filter(func(a) { a.isCorrect }).size();
    let score = correctAnswers;
    let passed = score >= (totalQuestions * 70 / 100);

    let attempt : QuizAttempt = {
      lessonId = canonQuizId;
      attemptNumber = 1;
      score = score;
      totalQuestions = totalQuestions;
      answers = args.answers;
      completedAt = Time.now();
    };

    let userAttempts = quizAttempts.get(caller);
    let updatedAttempts = switch (userAttempts) {
      case (?_) { List.fromArray<QuizAttempt>([attempt]) };
      case (null) { List.fromArray<QuizAttempt>([attempt]) };
    };
    quizAttempts.add(caller, updatedAttempts);

    // [BP-AUDIT] submitQuiz: check first-pass BEFORE updating bestQuizScores.
    // Check BOTH canonical ID and legacy alias so existing passes are not re-awarded.
    let isFirstPass : Bool = switch (bestQuizScores.get(caller)) {
      case (null) { true };
      case (?scores) {
        switch (scores.get(canonQuizId)) {
          case (?_) { false };
          case (null) {
            switch (legacyWorld0Id(canonQuizId)) {
              case (?legacyId) {
                switch (scores.get(legacyId)) {
                  case (?_) { false };
                  case (null) { true };
                };
              };
              case (null) { true };
            };
          };
        };
      };
    };

    let userScores = bestQuizScores.get(caller);
    let updatedScores = switch (userScores) {
      case (?scores) {
        let currentBest = scores.get(canonQuizId);
        let newBest = switch (currentBest) {
          // Only update the best score if the new score is strictly higher
          case (?bestScore) { if (score > bestScore) { score } else { bestScore } };
          case (null) { score };
        };
        scores.add(canonQuizId, newBest);
        scores;
      };
      case (null) {
        let newScoreMap = Map.empty<Text, Nat>();
        newScoreMap.add(canonQuizId, score);
        newScoreMap;
      };
    };
    bestQuizScores.add(caller, updatedScores);

    if (passed) {
      _recalculateAndPersistStreakAfterCompletion(caller);
      if (isFirstPass) {
        // [BP-AUDIT] submitQuiz: FIRST PASS — awarding XP + 20 BP
        await _awardXP(caller, 50, "Quiz passed: " # canonQuizId);
        await _awardCredits(caller, 20);
      };
      // [BP-AUDIT] submitQuiz: repeat pass — no XP or BP awarded
    };

    {
      score = score;
      totalQuestions = totalQuestions;
      passed = passed;
      feedback = if (passed) { "Great job!" } else { "Keep practicing!" };
      isFirstPass = isFirstPass;
    };
  };

  public shared ({ caller }) func attemptQuiz(lessonId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can attempt quizzes");
    };
    let canonAttemptId : Text = migrateWorld0Id(lessonId);

    if (lessonId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid lesson ID");
    };

    updateLessonAttempt(caller, canonAttemptId);
  };

  public query ({ caller }) func isLessonUnlocked(lessonId : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can check lesson unlock status");
    };

    let canonId : Text = migrateWorld0Id(lessonId);
    // Check canonical ID; also accept legacy alias for pre-migration attempts
    switch (lessonAttempts.get(caller)) {
      case (?attempts) {
        switch (attempts.get(canonId)) {
          case (?_) { true };
          case (null) {
            switch (attempts.get(lessonId)) {
              case (?_) { true };
              case (null) { false };
            };
          };
        };
      };
      case (null) { false };
    };
  };

  public query ({ caller }) func getBestQuizScore(lessonId : Text) : async ?Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view quiz scores");
    };
    let canonId : Text = migrateWorld0Id(lessonId);
    switch (bestQuizScores.get(caller)) {
      case (null) { null };
      case (?scores) {
        // Prefer canonical ID; fall back to legacy alias for pre-migration scores
        switch (scores.get(canonId)) {
          case (?s) { ?s };
          case (null) { scores.get(lessonId) };
        };
      };
    };
  };

  func _recalculateAndPersistStreakAfterCompletion(userId : UserId) {
    let profile = profiles.get(userId);
    switch (profile) {
      case (?existing) {
        let updatedProfile = updateStreakCountIfNeeded(existing);
        profiles.add(userId, updatedProfile);
      };
      case (null) {};
    };
  };

  public shared ({ caller }) func updateProfile(args : UpdateProfileArgs) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };

    if (not _validateDisplayName(args.displayName)) {
      Runtime.trap("Invalid display name: must be 1-50 characters");
    };

    if (not _validateAvatar(args.avatar)) {
      Runtime.trap("Invalid avatar: must be 1-200 characters");
    };

    _ensureUserRole(caller);

    let existingProfile = profiles.get(caller);
    switch (existingProfile) {
      case (?existing) {
        let updated = {
          existing with
          displayName = args.displayName;
          avatar = args.avatar;
          lastActivityTime = Time.now();
        };
        profiles.add(caller, updated);
      };
      case (null) {
        let newProfile : UserProfile = {
          displayName = args.displayName;
          avatar = args.avatar;
          xp = 0;
          level = 1;
          streak = 0;
          lastActivityTime = Time.now();
          lastStreakUpdate = Time.now();
          lessonsCompletedToday = 0;
        };
        profiles.add(caller, newProfile);
      };
    };
  };

  public query ({ caller }) func getCurrentWorldLessonProgress(worldId : Text) : async [LessonProgress] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view lesson progress");
    };

    if (worldId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid world ID");
    };

    switch (lessonAttempts.get(caller)) {
      case (?attempts) {
        let lessons = attempts.toArray().map(func(attempt) { toLessonProgressFromWorld(attempt, worldId, caller) });
        lessons;
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getUserWorldProgress(user : Principal, worldId : Text) : async [LessonProgress] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own progress unless you are an admin");
    };

    if (worldId.trim(#text " ").size() == 0) {
      Runtime.trap("Invalid world ID");
    };

    switch (lessonAttempts.get(user)) {
      case (?attempts) {
        let lessons = attempts.toArray().map(func(attempt) { toLessonProgressFromWorld(attempt, worldId, user) });
        lessons;
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func isAdminUser() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  func _awardXP(userId : UserId, amount : Nat, reason : Text) : async () {
    let event : XPEvent = {
      amount = amount;
      reason = reason;
      timestamp = Time.now();
    };

    let userEvents = xpEvents.get(userId);
    let updatedEvents = switch (userEvents) {
      case (?_) { List.fromArray<XPEvent>([event]) };
      case (null) { List.fromArray<XPEvent>([event]) };
    };
    xpEvents.add(userId, updatedEvents);

    let profile = profiles.get(userId);
    switch (profile) {
      case (?p) {
        let newXP = p.xp + amount;
        let newLevel = _calculateLevel(newXP);
        let updated = {
          p with
          xp = newXP;
          level = newLevel;
          lastActivityTime = Time.now();
        };
        profiles.add(userId, updated);
      };
      case (null) {
        let newProfile : UserProfile = {
          displayName = "";
          avatar = "";
          xp = amount;
          level = _calculateLevel(amount);
          streak = 0;
          lastActivityTime = Time.now();
          lastStreakUpdate = Time.now();
          lessonsCompletedToday = 0;
        };
        profiles.add(userId, newProfile);
      };
    };
  };

  func _awardCredits(userId : UserId, amount : Nat) : async () {
    // ── bearCredits ───────────────────────────────────────────────────────────
    let current = bearCredits.get(userId);
    let updated = switch (current) {
      case (?credits) {
        {
          balance = credits.balance + amount;
          totalEarned = credits.totalEarned + amount;
        };
      };
      case (null) {
        {
          balance = amount;
          totalEarned = amount;
        };
      };
    };
    bearCredits.add(userId, updated);
    Debug.print("[BP-AUDIT] _awardCredits: bearCredits WRITE | userId=" # userId.toText() # " | amount=" # amount.toText() # " | totalEarned=" # updated.totalEarned.toText());

    // ── allTimeBPStore ────────────────────────────────────────────────────────
    let prevAllTime : Nat = switch (allTimeBPStore.get(userId)) {
      case (?v) { v };
      case (null) { 0 };
    };
    let newAllTime : Nat = prevAllTime + amount;
    allTimeBPStore.add(userId, newAllTime);
    Debug.print("[BP-AUDIT] _awardCredits: allTimeBPStore WRITE | userId=" # userId.toText() # " | prev=" # prevAllTime.toText() # " | new=" # newAllTime.toText());

    // ── monthlyBPPerUser ──────────────────────────────────────────────────────
    // Civil calendar: derive month + year from Time.now() nanoseconds
    let nowNanos : Int = Time.now();
    let nowSeconds : Int = nowNanos / 1_000_000_000;
    let totalDays : Int = nowSeconds / 86400;
    let z : Int = totalDays + 719468;
    let era : Int = (if (z >= 0) { z } else { z - 146096 }) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let monthInt : Int = if (mp < 10) { mp + 3 } else { mp - 9 };
    let yearInt : Int = if (monthInt <= 2) { y + 1 } else { y };
    let monthNat : Nat = Int.abs(monthInt);
    let yearNat : Nat = Int.abs(yearInt);
    // Month key matches getMonthlyLeaderboard format: "M_YYYY" e.g. "3_2026"
    let monthKey : Text = monthNat.toText() # "_" # yearNat.toText();

    let innerMap = switch (monthlyBPPerUser.get(userId)) {
      case (?m) { m };
      case (null) { Map.empty<Text, Nat>() };
    };
    let prevMonthly : Nat = switch (innerMap.get(monthKey)) {
      case (?v) { v };
      case (null) { 0 };
    };
    let newMonthly : Nat = prevMonthly + amount;
    innerMap.add(monthKey, newMonthly);
    monthlyBPPerUser.add(userId, innerMap);
    Debug.print("[BP-AUDIT] _awardCredits: monthlyBPPerUser WRITE | userId=" # userId.toText() # " | monthKey=" # monthKey # " | prev=" # prevMonthly.toText() # " | new=" # newMonthly.toText());

    Debug.print("[BP-AUDIT] _awardCredits: SUCCESS | userId=" # userId.toText() # " | amount=" # amount.toText() # " | allTimeBP=" # newAllTime.toText() # " | monthKey=" # monthKey # " | monthlyBP=" # newMonthly.toText());
  };

  func _calculateLevel(xp : Nat) : Nat {
    (xp / 100) + 1;
  };

  func _getFullDescription(_term : Text, _language : Text, _category : Text) : ?Text {
    ?"This is a comprehensive description. For now, this function returns a default description.";
  };

  let alphabet : [Text] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  func addArrays(array1 : [Text], array2 : [Text]) : [Text] {
    array1.concat(array2);
  };

  func filterTags(tags : [Text], filter : Text) : [Text] {
    tags.filter(func(t) { t == filter });
  };

  func cloneArray(array : [Text], count : Nat) : [Text] {
    let size = array.size();
    if (count == 0 or size == 0) {
      [];
    } else if (count == 1) {
      array;
    } else {
      let totalSize = size * count;
      Array.tabulate(
        totalSize,
        func(i) {
          array[i % size];
        },
      );
    };
  };

  func cloneTagArray(tags : [Text], count : Nat) : [Text] {
    if (tags.size() == 0) { [] } else { tags };
  };

  var _internalCourseData : InternalCourseData = {
    lastCourseGeneration = 0;
    courses = Map.empty<Text, Course>();
  };

  let world0Position = 0;
  let courseDataList = List.fromArray<(Nat, Text)>([(world0Position, "Beginner Foundations")]);

  let lessonData = List.fromArray(
    [
      "What is Web3?",
      "What Is Blockchain?",
      "Keys & Signatures",
      "How to Use a Wallet",
      "Consensus Basics",
      "Fungible & Non-fungible Tokens",
      "Bitcoin vs. ICP",
      "Smart Contracts Explained",
      "Case Study: Bitcoin Mining",
      "First Steps in Web3",
    ],
  );

  func callBackendAndGetResult() : Nat {
    42;
  };

  public shared ({ caller }) func getReturnedValue() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can access this function");
    };
    callBackendAndGetResult();
  };

  // ── CANONICAL WORLD 0 IDS ────────────────────────────────────────────────────
  // IDs use zero-padded two-digit format to avoid float-coercion collisions.
  // Legacy IDs (0.1…0.10) are migrated transparently via migrateWorld0Id().
  func getWorld0Lessons() : [(Text, Text)] {
    [
      ("0.00", "What is Web3?"),
      ("0.10", "What Is Blockchain?"),
      ("0.20", "Keys & Signatures"),
      ("0.30", "How to Use a Wallet"),
      ("0.40", "Consensus Basics"),
      ("0.50", "Fungible & Non-fungible Tokens"),
      ("0.60", "Bitcoin vs. ICP"),
      ("0.70", "Smart Contracts Explained"),
      ("0.80", "Case Study: Bitcoin Mining"),
      ("0.90", "First Steps in Web3"),
    ];
  };

  // Translate a legacy World 0 lesson ID to the canonical string-safe form.
  // All other lesson IDs pass through unchanged.
  func migrateWorld0Id(lessonId : Text) : Text {
    switch (lessonId) {
      case ("0.0")  { "0.00" };
      case ("0.1")  { "0.00" };
      case ("0.2")  { "0.10" };
      case ("0.3")  { "0.20" };
      case ("0.4")  { "0.30" };
      case ("0.5")  { "0.40" };
      case ("0.6")  { "0.50" };
      case ("0.7")  { "0.60" };
      case ("0.8")  { "0.70" };
      case ("0.9")  { "0.80" };
      // NOTE: "0.10" is the canonical ID for World 0 lesson 2 — not a legacy alias.
      case (other)  { other  };
    };
  };

  // Return the legacy ID for a canonical World 0 ID, or null for non-World-0.
  // Used to check both old and new key in idempotency guards so existing
  // completions stored under legacy IDs are not re-awarded after migration.
  func legacyWorld0Id(canonicalId : Text) : ?Text {
    switch (canonicalId) {
      case ("0.00") { ?"0.1"  };
      case ("0.10") { ?"0.2"  };
      case ("0.20") { ?"0.3"  };
      case ("0.30") { ?"0.4"  };
      case ("0.40") { ?"0.5"  };
      case ("0.50") { ?"0.6"  };
      case ("0.60") { ?"0.7"  };
      case ("0.70") { ?"0.8"  };
      case ("0.80") { ?"0.9"  };
      // NOTE: "0.90" has no legacy alias — removing collision-causing "0.10" reverse map.
      case (_)      { null    };
    };
  };

  public query func getAllWorld0Lessons() : async [(Text, Text)] {
    getWorld0Lessons();
  };

  var analyticsStats : AnalyticsStats = {
    totalPageViews = 0;
    pageViewsToday = 0;
    dailyActiveUsers = 0;
    weeklyActiveUsers = 0;
    currentActiveLearners = 0;
    returningLearners = 0;
    lessonCompletions = 0;
    streakCount = 0;
  };

  func _updateDailyCountersIfNeeded() {
    let currentTime = Time.now();
    let nanoPerDay = 86400000000000;
    let currentDay = currentTime / nanoPerDay;

    let lastUpdatedDay =
      if (analyticsStats.totalPageViews == 0) {
        currentDay - 1;
      } else { currentDay };

    if (currentDay != lastUpdatedDay) {
      analyticsStats := {
        analyticsStats with
        pageViewsToday = 0;
        dailyActiveUsers = 0;
        currentActiveLearners = 0;
      };
    };
  };

  public shared func trackPageView() : async () {
    _updateDailyCountersIfNeeded();

    analyticsStats := {
      analyticsStats with
      totalPageViews = analyticsStats.totalPageViews + 1;
      pageViewsToday = analyticsStats.pageViewsToday + 1;
    };
  };

  public query ({ caller }) func getAnalyticsStats() : async AnalyticsStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view analytics stats");
    };

    _updateDailyCountersIfNeeded();
    analyticsStats;
  };

  public shared ({ caller }) func trackProgressEvent(_progress : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can track progress events");
    };

    _updateDailyCountersIfNeeded();

    analyticsStats := {
      analyticsStats with
      currentActiveLearners = analyticsStats.currentActiveLearners + 1;
      lessonCompletions = analyticsStats.lessonCompletions + 1;
    };
  };

  public query func getPublicMetrics() : async {
    activeLearnersToday : Nat;
    averageProgress : Nat;
    mostCompletedLessonWeekly : ?Text;
  } {
    _updateDailyCountersIfNeeded();

    let averageProgress = if (analyticsStats.currentActiveLearners > 0) {
      analyticsStats.lessonCompletions / analyticsStats.currentActiveLearners;
    } else { 0 };

    let mostCompletedLesson = _getMostCompletedLessonWeekly();

    {
      activeLearnersToday = analyticsStats.currentActiveLearners;
      averageProgress = averageProgress;
      mostCompletedLessonWeekly = mostCompletedLesson;
    };
  };

  func _getMostCompletedLessonWeekly() : ?Text {
    if (weeklyLessonCompletions.isEmpty()) {
      return null;
    };

    weeklyLessonCompletions.keys().next();
  };

  // Utility functions
  // Helper for mapping to LessonProgress with worldId
  func toLessonProgressFromWorld(lessonAttempt : (Text, Nat), worldId : Text, userId : UserId) : LessonProgress {
    // Canonicalize the stored lesson ID so legacy World 0 IDs are translated
    // to canonical form in all getLessonProgress responses.
    let canonId : Text = migrateWorld0Id(lessonAttempt.0);
    let isCompleted = switch (lessonFirstCompletions.get(userId)) {
      case (?comps) {
        // Check canonical ID; also accept legacy alias for pre-migration completions
        switch (comps.get(canonId)) {
          case (?_) { true };
          case (null) {
            switch (comps.get(lessonAttempt.0)) {
              case (?_) { true };
              case (null) { false };
            };
          };
        };
      };
      case (null) { false };
    };
    {
      lessonId = canonId;
      completed = isCompleted;
      completionTime = Time.now();
      attempted = true;
      unlocked = true;
    };
  };

  // Function to update lesson attempt count
  func updateLessonAttempt(userId : UserId, lessonId : Text) {
    let userAttempts = lessonAttempts.get(userId);
    let updatedAttempts = switch (userAttempts) {
      case (?attempts) {
        let currentCount = attempts.get(lessonId);
        let newCount = switch (currentCount) {
          case (?count) { count + 1 };
          case (null) { 1 };
        };
        attempts.add(lessonId, newCount);
        attempts;
      };
      case (null) {
        let newAttemptsMap = Map.empty<Text, Nat>();
        newAttemptsMap.add(lessonId, 1);
        newAttemptsMap;
      };
    };
    lessonAttempts.add(userId, updatedAttempts);
  };

  // ===== SHARED LEADERBOARD & MONTHLY PRIZE =====

  public type BPLeaderboardEntry = {
    userId : Text;
    displayName : Text;
    allTimeBP : Nat;
    rank : Nat;
  };

  public type WinnerClaim = {
    userId : Text;
    displayName : Text;
    month : Nat;
    year : Nat;
    usdcAddress : Text;
    submittedAt : Time.Time;
    isPaid : Bool;
  };

  // TODO persistence should work here, check integration test
  stable var adminPrincipalText = "pkt5m-vzera-uztne-or4se-vgejr-xajuz-ulw55-zdxon-3euz7-gvakp-5qe";
  stable var allTimeBPStore = Map.empty<UserId, Nat>();
  stable var monthlyBPPerUser = Map.empty<UserId, Map.Map<Text, Nat>>();
  stable var winnerClaimsStore = Map.empty<Text, WinnerClaim>();
  stable var nameChangeCountStore = Map.empty<UserId, Nat>();
  stable var rankSnapshots = Map.empty<UserId, Nat>();
  stable var shareMilestoneAcks = Map.empty<UserId, Map.Map<Text, Bool>>();

  public shared ({ caller }) func submitBearPoints(allTimeBP : Nat, monthlyBP : Nat, month : Nat, year : Nat) : async () {
    _ensureUserRole(caller);
    allTimeBPStore.add(caller, allTimeBP);
    let monthKey = month.toText() # "_" # year.toText();
    let innerMap = switch (monthlyBPPerUser.get(caller)) {
      case (?m) { m };
      case (null) { Map.empty<Text, Nat>() };
    };
    innerMap.add(monthKey, monthlyBP);
    monthlyBPPerUser.add(caller, innerMap);
  };

  public query func getGlobalLeaderboard() : async [BPLeaderboardEntry] {
    let allEntries = bearCredits.toArray();
    Debug.print("[BP-AUDIT] getGlobalLeaderboard: bearCredits size=" # allEntries.size().toText());
    for (pair in allEntries.vals()) {
      Debug.print("[BP-AUDIT] getGlobalLeaderboard: entry | userId=" # pair.0.toText() # " | bp=" # pair.1.totalEarned.toText());
    };
    let sorted = allEntries.sort(func(a : (UserId, BearCredits), b : (UserId, BearCredits)) : Order.Order {
      Nat.compare(b.1.totalEarned, a.1.totalEarned)
    });
    let size = if (sorted.size() > 100) { 100 } else { sorted.size() };
    Debug.print("[BP-AUDIT] getGlobalLeaderboard: sorted size=" # sorted.size().toText() # " | returning top " # size.toText());
    Array.tabulate(size, func(i : Nat) : BPLeaderboardEntry {
      let pair = sorted[i];
      let uid = pair.0;
      let bp = pair.1.totalEarned;
      let displayName = switch (profiles.get(uid)) {
        case (?p) { if (p.displayName.size() > 0) { p.displayName } else { "Bear" } };
        case (null) { "Bear" };
      };
      { userId = uid.toText(); displayName; allTimeBP = bp; rank = i + 1 }
    })
  };

  public query func getMonthlyLeaderboard(month : Nat, year : Nat) : async [BPLeaderboardEntry] {
    let monthKey = month.toText() # "_" # year.toText();
    let allUsers = monthlyBPPerUser.toArray();
    Debug.print("[BP-AUDIT] getMonthlyLeaderboard: monthKey=" # monthKey # " | monthlyBPPerUser size=" # allUsers.size().toText());
    for (pair in allUsers.vals()) {
      switch (pair.1.get(monthKey)) {
        case (?bp) { Debug.print("[BP-AUDIT] getMonthlyLeaderboard: entry | userId=" # pair.0.toText() # " | monthKey=" # monthKey # " | bp=" # bp.toText()); };
        case (null) {};
      };
    };
    let withBP = allUsers.filter(func(pair : (UserId, Map.Map<Text, Nat>)) : Bool {
      switch (pair.1.get(monthKey)) { case (?_) { true }; case (null) { false } }
    });
    Debug.print("[BP-AUDIT] getMonthlyLeaderboard: withBP count=" # withBP.size().toText() # " after filtering for monthKey=" # monthKey);
    let pairs = withBP.map(func(pair) {
      let bp = switch (pair.1.get(monthKey)) { case (?v) { v }; case (null) { 0 } };
      (pair.0, bp)
    });
    let sorted = pairs.sort(func(a : (UserId, Nat), b : (UserId, Nat)) : Order.Order {
      Nat.compare(b.1, a.1)
    });
    let size = if (sorted.size() > 100) { 100 } else { sorted.size() };
    Array.tabulate(size, func(i : Nat) : BPLeaderboardEntry {
      let pair = sorted[i];
      let uid = pair.0;
      let bp = pair.1;
      let displayName = switch (profiles.get(uid)) {
        case (?p) { if (p.displayName.size() > 0) { p.displayName } else { "Bear" } };
        case (null) { "Bear" };
      };
      { userId = uid.toText(); displayName; allTimeBP = bp; rank = i + 1 }
    })
  };

  public shared ({ caller }) func submitWinnerClaim(month : Nat, year : Nat, usdcAddress : Text) : async Text {
    _ensureUserRole(caller);
    let trimmedAddress = usdcAddress.trim(#text " ");
    if (trimmedAddress.size() == 0) {
      return "error:USDC address cannot be empty";
    };
    let monthKey = month.toText() # "_" # year.toText();
    switch (winnerClaimsStore.get(monthKey)) {
      case (?existing) {
        if (existing.isPaid) { return "error:Prize already paid for this month" };
        if (existing.userId != caller.toText()) {
          return "error:A claim already exists for this month";
        };
      };
      case (null) {};
    };
    let displayName = switch (profiles.get(caller)) {
      case (?p) { if (p.displayName.size() > 0) { p.displayName } else { "Bear" } };
      case (null) { "Bear" };
    };
    let claim : WinnerClaim = {
      userId = caller.toText();
      displayName;
      month;
      year;
      usdcAddress = trimmedAddress;
      submittedAt = Time.now();
      isPaid = false;
    };
    winnerClaimsStore.add(monthKey, claim);
    "success"
  };

  public query ({ caller }) func getWinnerClaims() : async [WinnerClaim] {
    if (caller.toText() != adminPrincipalText) {
      Runtime.trap("Unauthorized: Admin only");
    };
    winnerClaimsStore.toArray().map(func(pair : (Text, WinnerClaim)) : WinnerClaim { pair.1 })
  };

  public shared ({ caller }) func markClaimPaid(month : Nat, year : Nat) : async () {
    if (caller.toText() != adminPrincipalText) {
      Runtime.trap("Unauthorized: Admin only");
    };
    let monthKey = month.toText() # "_" # year.toText();
    switch (winnerClaimsStore.get(monthKey)) {
      case (?claim) {
        winnerClaimsStore.add(monthKey, { claim with isPaid = true });
      };
      case (null) { Runtime.trap("No claim found for this month") };
    };
  };

  public query func getWinnerHistory() : async [WinnerClaim] {
    winnerClaimsStore.toArray()
      .filter(func(pair : (Text, WinnerClaim)) : Bool { pair.1.isPaid })
      .map(func(pair : (Text, WinnerClaim)) : WinnerClaim { pair.1 })
  };


  /// Persists caller's current rank snapshot and returns delta vs previous snapshot.
  /// Returns null if no prior snapshot exists (first call).
  /// delta > 0 means rank improved (moved up), delta < 0 means rank dropped.
  public shared ({ caller }) func updateMyRankSnapshot(currentRank : Nat) : async ?Int {
    _ensureUserRole(caller);
    let delta : ?Int = switch (rankSnapshots.get(caller)) {
      case (?prev) {
        let prevInt : Int = prev;
        let currInt : Int = currentRank;
        ?(prevInt - currInt)
      };
      case (null) { null };
    };
    rankSnapshots.add(caller, currentRank);
    delta
  };

  // ─── Share milestone acknowledgements ────────────────────────────────────────

  /// Returns true if the caller has already seen the given share milestone modal.
  public query ({ caller }) func hasSeenShareMilestone(milestone : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return false;
    };
    switch (shareMilestoneAcks.get(caller)) {
      case (?acks) { acks.get(milestone) != null };
      case (null) { false };
    };
  };

  /// Mark the given share milestone as seen for the caller. Idempotent.
  public shared ({ caller }) func markShareMilestoneSeen(milestone : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let userAcks = switch (shareMilestoneAcks.get(caller)) {
      case (?acks) { acks };
      case (null) { Map.empty<Text, Bool>() };
    };
    userAcks.add(milestone, true);
    shareMilestoneAcks.add(caller, userAcks);
  };

  public shared ({ caller }) func changeDisplayName(newName : Text) : async Text {
    _ensureUserRole(caller);
    let trimmed = newName.trim(#text " ");
    if (trimmed.size() < 2 or trimmed.size() > 30) {
      return "error:Name must be 2-30 characters";
    };
    let currentCount = switch (nameChangeCountStore.get(caller)) {
      case (?n) { n };
      case (null) { 0 };
    };
    if (currentCount >= 3) {
      return "error:Maximum name changes reached (3 of 3 used)";
    };
    let newCount = currentCount + 1;
    nameChangeCountStore.add(caller, newCount);
    switch (persistentUserState.get(caller)) {
      case (?state) {
        persistentUserState.add(caller, { state with displayName = trimmed });
      };
      case (null) {};
    };
    switch (profiles.get(caller)) {
      case (?p) {
        profiles.add(caller, { p with displayName = trimmed });
      };
      case (null) {};
    };
    "success:" # (if (newCount <= 3) { (3 - newCount).toText() } else { "0" })
  };

  public query ({ caller }) func getNameChangeCount() : async Nat {
    if (caller.isAnonymous()) { return 3 };
    switch (nameChangeCountStore.get(caller)) {
      case (?n) { n };
      case (null) { 0 };
    };
  };

  // ─── Boss completion (derived from lessonAttempts) ───────────────────────────

  /// Returns true if the caller has ever submitted the boss quiz for the given world.
  /// Boss quizzes are stored in lessonAttempts under the key "boss-<worldId>".
  public query ({ caller }) func isBossAttempted(worldId : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return false;
    };
    let bossId : Text = "boss-" # worldId;
    switch (lessonAttempts.get(caller)) {
      case (?attempts) { attempts.get(bossId) != null };
      case (null) { false };
    };
  };

  // ─── Special world unlocks (bonus World 7, World 8 key-entry) ───────────────

  /// Mark a special world as unlocked for the caller. Idempotent.
  public shared ({ caller }) func markSpecialWorldUnlocked(worldId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can unlock special worlds");
    };
    let userUnlocks = switch (specialWorldUnlocks.get(caller)) {
      case (?unlocks) { unlocks };
      case (null) { Map.empty<Text, Bool>() };
    };
    userUnlocks.add(worldId, true);
    specialWorldUnlocks.add(caller, userUnlocks);
  };

  /// Returns true if the caller has unlocked the given special world.
  public query ({ caller }) func isSpecialWorldUnlocked(worldId : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return false;
    };
    switch (specialWorldUnlocks.get(caller)) {
      case (?unlocks) { unlocks.get(worldId) != null };
      case (null) { false };
    };
  };



  /// Returns the current backend version string. Used to verify a fresh backend deploy.
  public query func getBackendVersion() : async Text {
    "v469-backend-reprovision"
  };


  // ─── ADMIN ANALYTICS (v1) ──────────────────────────────────────────────────
  // Stable var preserved for upgrade compatibility — do not remove.
  stable var STATS_ADMIN_PRINCIPAL = "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe";

  // Allowlist — both dev and live principals are admin.
  let STATS_ADMIN_PRINCIPALS : [Text] = [
    "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe", // dev
    "mqrud-rxoxo-nbepq-sktaj-q76k5-r67zx-4wcgo-rhqmv-5mwys-3dl7s-zae",  // live
  ];

  func isStatsAdmin(p : Principal) : Bool {
    let t = p.toText();
    for (a in STATS_ADMIN_PRINCIPALS.vals()) {
      if (t == a) return true;
    };
    false
  };

  public type AdminAnalytics = {
    totalRegisteredUsers : Nat;
    dailyActiveUsers : Nat;
    monthlyActiveUsers : Nat;
    totalLessonCompletions : Nat;
    totalQuizPasses : Nat;
    totalBPAwarded : Nat;
    usersWithBP : Nat;
  };

  /// Admin-only analytics query. Only principals in STATS_ADMIN_PRINCIPALS may call this.
  /// Aggregates metrics from existing stable stores — no new event tracking added.
  public query ({ caller }) func getAdminAnalytics() : async AdminAnalytics {
    if (not isStatsAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };

    // Total registered users = principals with a UserProfile
    let totalRegisteredUsers = profiles.size();

    // Daily active users from existing analyticsStats counter
    let dailyActiveUsers = analyticsStats.dailyActiveUsers;

    // Monthly active users = principals with any entry in monthlyBPPerUser for current month
    let now = Time.now();
    let monthNum = Int.abs((now / (30 * 24 * 3_600_000_000_000)) % 12 + 1);
    let yearNum = Int.abs(now / (365 * 24 * 3_600_000_000_000) + 1970);
    let monthKey = monthNum.toText() # "_" # yearNum.toText();
    var monthlyActiveUsers = 0;
    for (pair in monthlyBPPerUser.toArray().vals()) {
      if (pair.1.get(monthKey) != null) {
        monthlyActiveUsers += 1;
      };
    };

    // Total lesson completions = sum all lessonFirstCompletions entries where value is true
    var totalLessonCompletions = 0;
    for (userPair in lessonFirstCompletions.toArray().vals()) {
      for (lessonPair in userPair.1.toArray().vals()) {
        if (lessonPair.1) {
          totalLessonCompletions += 1;
        };
      };
    };

    // Total quiz passes = count bestQuizScores entries with score > 0
    var totalQuizPasses = 0;
    for (userPair in bestQuizScores.toArray().vals()) {
      for (scorePair in userPair.1.toArray().vals()) {
        if (scorePair.1 > 0) {
          totalQuizPasses += 1;
        };
      };
    };

    // Total BP awarded = sum of bearCredits.totalEarned across all users
    var totalBPAwarded = 0;
    for (pair in bearCredits.toArray().vals()) {
      totalBPAwarded += pair.1.totalEarned;
    };

    // Users with any BP on record
    let usersWithBP = bearCredits.size();

    {
      totalRegisteredUsers;
      dailyActiveUsers;
      monthlyActiveUsers;
      totalLessonCompletions;
      totalQuizPasses;
      totalBPAwarded;
      usersWithBP;
    }
  };
  // ─── END ADMIN ANALYTICS ───────────────────────────────────────────────────

};
