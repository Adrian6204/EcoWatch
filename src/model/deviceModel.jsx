import { userManagementState } from "../zustand/userManagementState";

export const DeviceModel = {
    device_name: '',
    added_by: userManagementState.getState().user.userId,
    quantity: '',
    power: ''
}