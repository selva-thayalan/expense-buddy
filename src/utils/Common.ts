import { Member } from "../models/Member";

const getMemeberNameById = (members: Member[], id: string): string => {
    var member = members.find(mem => mem.id === id);
    return member ? getMemberName(member) : "";
}

const getMemberName = (member: Member): string => {
    return `${member.firstName} ${member.lastName}`;
}

export { getMemeberNameById, getMemberName };