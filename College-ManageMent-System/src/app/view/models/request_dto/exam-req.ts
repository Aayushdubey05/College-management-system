export interface ExamReq {
    examType: string;
    session: string;
    examDate: string; // ISO date
    roomNumber: string;
    maxMarks: number;
    passingMarks: number;
    startTime: string;
    endTime: string;
    status: string;
    subjectId: number;
}
