export interface ExamRes {
    id: number;
    examType: string;
    session: string;
    examDate: string; // ISO date
    roomNumber: string;
    maxMarks: number;
    passingMarks: number;
    startTime: string;
    endTime: string;
    status: string;
    subjectName: string;
    subjectCode: string;
}
