export interface InfrastructureReq {
    roomOrLabName: string;
    floor: number;
    block: string;
    capacity: number;
    hasProjector: boolean;
    noOfComputers: number;
    type: string;
    status: string;
    lastMaintenanceDate: string;
    departmentId: number;
}
