export type MembershipStatusType = 'create'|'delete'|'update';
export type LeaderJournalType = Record<MembershipStatusType, number[]>
